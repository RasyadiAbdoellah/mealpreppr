import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Redirect } from 'react-router-dom';

export default function RecipeDetails(props) {
  const {recipe, id } = props
  if(recipe && (recipe.id === +id)){
      return (
      <>
        <h1>{recipe.name}</h1>
        <h2>Ingredients</h2>
        <ul className='ingredients'>
            {recipe.Ingredients && recipe.Ingredients.map(ingredient => (
                <li className='ingredient-entry' key={ingredient.name}>
                    <span>{ingredient.val} {ingredient.scale} {ingredient.name}</span>
                </li>
            ))}
        </ul>
        <h2>Instructions</h2>
        <div>{ReactHtmlParser(recipe.details)}</div>
      </>
    )
  } else {
    return <Redirect to='/recipes' />
  }
}