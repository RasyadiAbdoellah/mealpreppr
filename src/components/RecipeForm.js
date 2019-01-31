import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { addRecipe, updateRecipe } from '../redux/actions/recipe'
import { getRecipeById } from '../redux/selectors'
import axios from 'axios';
import API_URL from '../config';

const IngredientItem = (ingredient, index, fields) => {
// IngredientItem is callback function passed to array .map function in IngredientFieldArray
    // determine what button to display
    let add, remove
    if (fields.length > 1 && index !== fields.length-1) remove = (<button type='button' onClick={() => fields.remove(index)}> - </button>); //if Ingredients array is more than 1, and current element is not last, show remove button
    if (fields.length === 0 || index === fields.length-1) add = (<button type='button' onClick={() => fields.push()}> + </button>); //if Ingredient array is empty, or current element is last, show add button

    return (
        <li key={index}>
            <Field name={`${ingredient}.val`} component='input' type='number' />
            <Field name={`${ingredient}.scale`} component='input' type='text' />
            <Field name={`${ingredient}.name`} component='input' type='text' />
            {remove}
            {add}
        </li>
    )
}

const IngredientFieldArray = props => {
// IngredientFieldArray uses IngredientItem callback to render the list elements
// This component is wrapped with the FieldArray component in RecipeFormClass for redux-forms functionality

    const {fields} = props
    if(fields.length === 0) fields.push();

    return (
        <ul>
            {fields.map(IngredientItem)}
        </ul>
        

    )
}


class RecipeFormClass extends React.Component {
// RecipeForm is a class component because the submit handler requires props.id to determine which axios method to run.
    
    submit = (values) => {
        const {id, addRecipe, updateRecipe } = this.props
        //data object is there because backend expects data.Recipe. I could change it into just an unamed pojo, seems like a lot of effort to reduce a line from the code tho.
        const data = { Recipe: {...values}}
        console.log('in submit',data)

        if(!id){
            return axios.post(API_URL + '/recipes', data)
            .then(res => {
                this.props.toggle()
                return addRecipe(res)
            })
            .catch(error =>{
                console.log(error)
            })
        } else {
            return axios.patch(API_URL + '/recipes/' + id, data)
            .then(res => {
                this.props.toggle()
                updateRecipe(res)
            })
            .catch(error =>{
                console.log(error)
            })
        }
    }

    render(){
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Field name='name' component='input' type='text' />
                <Field name='details' component='textarea' />
                <FieldArray name='Ingredients' component={IngredientFieldArray}/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

// mapStateToProps function is only so that RecipeForm can be reused for editing recipes.
// the { id } in function sig is because connect passes the state and the component's own props as arguments. In essence the func sig is shorthand for doing const id = component's props.id  
function mapStateToProps(state, { id }){
    return {initialValues: getRecipeById(state, id)}
}

//adding reduxForm functionality to RecipeFormClass
let RecipeForm = reduxForm({
    form: 'recipe'
})(RecipeFormClass)

//adding access to other state objects
RecipeForm = connect(mapStateToProps, { addRecipe, updateRecipe })(RecipeForm)

//exporting the complete connected component
export default RecipeForm