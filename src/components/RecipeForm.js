import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { addRecipe, updateRecipe } from '../redux/actions/recipe'
import { getRecipeById } from '../redux/selectors'
import axios from 'axios';
import API_URL from '../config';
import ReactQuill from 'react-quill';

const renderQuill = ({ input }) => {
  return (
    <ReactQuill
      {...input}
      onChange={(newValue, delta, source) => {
        if (source === 'user') {
          input.onChange(newValue);
        }
      }}
      onBlur={(range, source, quill) => {
        input.onBlur(quill.getHTML());
      }}
    />
  );  
}

// Usage:
{/* <Field name="description" component={renderQuill} />; */}

const RenderField = (field) => {
    //creates custom input for Field component
    return(
        <>
            <input {...field.input} className={field.className} type={field.type} placeholder={field.placeholder}/>
            {field.meta.touched && field.meta.error &&
            <span className="error">{field.meta.error}</span>}
        </>
    )
}

const RenderTextArea = (field) => {
    //creates custom textarea for Field component
    return(
        <>
            <textarea {...field.input} className={field.className}>
                {field.input.value}
            </textarea>
            {field.meta.touched && field.meta.error &&
            <span className="error">{field.meta.error}</span>}
        </>
    )
}

const IngredientItem = (ingredient, index, fields) => {
// IngredientItem is callback function passed to array .map function in IngredientFieldArray
// determine what button to display
    let add, remove
    if (fields.length > 1) remove = (<button type='button' onClick={() => fields.remove(index)}> - </button>); //if Ingredients array is more than 1, and current element is not last, show remove button
    if (fields.length === 0 || index === fields.length-1) add = (<button type='button' onClick={() => fields.push()}> + </button>); //if Ingredient array is empty, or current element is last, show add button

    return (
        <li key={index}>
            <div className='ingredientFields'>
                <Field className='quant-field' name={`${ingredient}.val`} component={RenderField} type='number' placeholder='0'/>
                <Field className='scale-field' name={`${ingredient}.scale`} component={RenderField} type='text' placeholder='Measure'/>
                <Field className='name-field' name={`${ingredient}.name`} component={RenderField} type='text' placeholder='Ingredient'/>
                {remove}
                {add}
            </div>
        </li>
    )
}

const IngredientFieldArray = props => {
// IngredientFieldArray uses IngredientItem callback to render the list elements
// This component is wrapped with the FieldArray component in RecipeFormClass for redux-forms functionality

    const {fields} = props
    if(fields.length === 0) fields.push();

    return (
        <ul className='ingredients'>
            {fields.map(IngredientItem)}
        </ul>
        

    )
}


class RecipeFormClass extends React.Component {
// RecipeForm is a class component because the submit handler requires props.id to determine which axios method to run.
constructor(props){
    super()
    console.log(props)
    this.state = {
        postSuccessful: false,
        postId:'',
        patchSuccessful: false,
    }
}
    
    submit = (values) => {
        const {id, addRecipe, updateRecipe} = this.props
        //data object is there because backend expects data.Recipe. I could change it into just an unamed pojo, seems like a lot of effort to reduce a line from the code tho.
        const data = { Recipe: {...values}}
        if(id === 'new' ){
            return axios.post(API_URL + '/recipes', data)
            .then(res => {
                addRecipe(res)
                this.setState({postSuccessful: true, postId: res.data.id})
            })
            .catch(error =>{
                console.log(error)
            })
        } else {
            return axios.patch(API_URL + '/recipes/' + id, data)
            .then(res => {
                updateRecipe(res)
                this.setState({patchSuccessful:true })
            })
            .catch(error =>{
                console.log(error)
            })
        }
    }

    render(){
        const { handleSubmit, id } = this.props
        console.log('in render',this.props.initialValues)
        const { postSuccessful, patchSuccessful, postId } = this.state
        if(postSuccessful) return <Redirect to={`/recipes/${postId}`} />;
        if(patchSuccessful) return <Redirect to={`/recipes/${id}`} />;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Field className='title-field' name='name' component={RenderField} type='text' placeholder='Recipe Name' />
                <h2>Ingredients</h2>
                <FieldArray name='Ingredients' component={IngredientFieldArray}/>
                <h2>Instructions</h2>
                <Field className='detail-text-area' name='details' component={renderQuill} />
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        )
    }
}

// mapStateToProps function is only so that RecipeForm can be reused for editing recipes.
// the { id } in function sig is because connect passes the state and the component's own props as arguments. In essence the func sig is shorthand for doing const id = component's props.id  
function mapStateToProps(state, { id }){
    return id ==='new' ? {initialValues: {}} : {initialValues: getRecipeById(state, id)}
}

//adding reduxForm functionality to RecipeFormClass
let RecipeForm = reduxForm({
    form: 'recipe',
    enableReinitialize : true
})(RecipeFormClass)

//adding access to other state objects and export
export default connect(mapStateToProps, { addRecipe, updateRecipe })(RecipeForm)
