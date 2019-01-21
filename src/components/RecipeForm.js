import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { addRecipe, updateRecipe } from '../redux/actions/recipe'
import { getRecipeById } from '../redux/selectors'
import axios from 'axios';
import API_URL from '../config';

const IngredientItem = (ingredient, index, fields) => {
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
    const {fields} = props
    if(fields.length === 0) fields.push();

    return (
        <ul>
            {fields.map(IngredientItem)}
        </ul>
        

    )
}

class RecipeFormClass extends React.Component {
    submit = (values) => {
        const {id, addRecipe, updateRecipe } = this.props
        //data object is there because backend expects data.Recipe. I could change it into just an unamed pojo, seems like a lot of effort to reduce a line from the code tho.
        const data = { Recipe: {...values}}
        console.log('in submit',data)

        if(!id){
            return axios.post(API_URL + '/recipes', data).then(res => addRecipe(res))
        } else {
            return axios.patch(API_URL + '/recipes/' + id, data).then(res => updateRecipe(res))
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
function mapStateToProps(state, { id }){
    return {initialValues: getRecipeById(state, id)}
}

let RecipeForm = reduxForm({
    form: 'recipe'
})(RecipeFormClass)

RecipeForm = connect(mapStateToProps, { addRecipe, updateRecipe })(RecipeForm)

export default RecipeForm