import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { addRecipe } from '../redux/actions/recipe'
import { getRecipeById } from '../redux/selectors'


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

let RecipeForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit(data => console.log('submitting',data))}>
            <Field name='name' component='input' type='text' />
            <Field name='details' component='textarea' />
            <FieldArray name='Ingredients' component={IngredientFieldArray}/>
            <button type="submit">Submit</button>
        </form>
    )
}

// mapStateToProps function is only so that RecipeForm can be reused for editing recipes.
function mapStateToProps(state, { id }){
    return {initialValues: getRecipeById(state, id)}
}

RecipeForm = reduxForm({
    form: 'recipe'
})(RecipeForm)

RecipeForm = connect(mapStateToProps, { addRecipe })(RecipeForm)

export default RecipeForm