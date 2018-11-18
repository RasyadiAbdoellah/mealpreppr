import React from 'react';
  //IngredientItem will need the following props: addIngredient(eventHandler), removeIngredient(eventHandler), keyCheck(handler), ingredientInput(handler), i(index of array), ingredient(array element), last(boolean)

export default function IngredientList(props) {

  const button = props.last ? 
  (<button onClick={props.addIngredient}> + </button>): 
  (<button id={`ingredient_${props.index}_remove`} onClick={props.removeIngredient}> - </button>)

  //local scope variables
  const ingredient = props.ingredient
  const quantity = ingredient.RecipeIngredients

  return (
    <li key={props.index} id={`ingredient_${props.index}`}>

      <input id={`ingredient_${props.index}_name`} 
      value={ingredient.name} 
      onKeyDown={props.keyCheck} 
      onChange={props.ingredientInput}/>

      <input id={`ingredient_${props.index}_val`} 
      type="number" 
      value={quantity.val} 
      onKeyDown={props.keyCheck} 
      onChange={props.ingredientInput}/>

      <input id={`ingredient_${props.index}_scale`} 
      value={quantity.scale} 
      onKeyDown={props.keyCheck} 
      onChange={props.ingredientInput}/>

      {button}
    </li>
  )
}