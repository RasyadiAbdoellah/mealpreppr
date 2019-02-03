import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
    const { recipe, match } = props
    return (
        <li key={recipe.id}>
            <Link to={`${match.url}/${recipe.id}`}>
                <p>Name:{recipe.name}</p>
                <p>ID: {recipe.id}</p>
                <p>Details: {recipe.details}</p>
            </Link>
        </li>
    )
}

export default function RecipeList(props){
        return (
            <div id='recipe-list'>
                <ul>
                    {props.recipes.map(recipe => <RecipeCard recipe={recipe} {...props}/>)} 
                </ul>
            </div>
        )
    }


