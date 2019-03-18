import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
    const { recipe, match } = props
    return (
        <Link to={`${match.url}/${recipe.id}`} key={recipe.id} className='recipe-card' > 
                <h1>{recipe.name}</h1>
        </Link>
    )
}

export default function RecipeList(props){
        return (
            <div className='recipe-collection'>
                {props.recipes.map(recipe => <RecipeCard recipe={recipe} {...props}/>)} 
            </div>
        )
    }


