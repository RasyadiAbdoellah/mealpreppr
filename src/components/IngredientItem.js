import React from 'react';
  //IngredientItem will need the following props: addIngredient(eventHandler), removeIngredient(eventHandler), keyCheck(handler), ingredientInput(handler), i(index of array), ingredient(array element), last(boolean)

export default function IngredientList(props) {

  const returnValue = props.last ? 
  (<button onClick={props.addIngredient}> + </button>): 
  (<button id={`ingredient_${props.index}_remove`} onClick={props.removeIngredient}> - </button>)
  return (
    <li key={props.index} id={`ingredient_${props.index}`}>
      <input id={`ingredient_${props.index}_name`} value={props.ingredient.name} onKeyDown={props.keyCheck} onChange={props.ingredientInput}/>
      <input id={`ingredient_${props.index}_val`} type="number" value={props.ingredient.RecipeIngredients.val} onKeyDown={props.keyCheck} onChange={props.ingredientInput}/>
      <input id={`ingredient_${props.index}_scale`} value={props.ingredient.RecipeIngredients.scale} onKeyDown={props.keyCheck} onChange={props.ingredientInput}/>  
      {returnValue}
    </li>
  )
}