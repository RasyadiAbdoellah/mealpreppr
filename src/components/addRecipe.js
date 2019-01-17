import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'


const IngredientItem = (ingredient, index, fields) => {
    let add = <button type='button' onClick={() => fields.push()}> + </button>
    let remove
    if (fields.length > 1) remove = (<button type='button' onClick={() => fields.remove(index)}> x </button>);
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

const RecipeForm = props => {
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

export default reduxForm({
    form: 'recipe'
})(RecipeForm)