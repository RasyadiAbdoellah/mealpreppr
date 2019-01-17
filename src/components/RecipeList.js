import React from 'react';
import { connect } from "react-redux";
import { getRecipesList } from '../redux/selectors';
import * as axios from 'axios';
import API_URL from '../config';
import { getAllRecipes } from '../redux/actions/recipe'

function RecipeList (props) {
    const get = () => {
        axios.get(API_URL + '/recipes')
            .then(res =>props.getAllRecipes(res))
            .catch(error => console.log(error))
    }

    return (
        <ul>
            <li>
                <button onClick={get}>
                get recipe list
                </button>
            </li>
            {
                props.recipes.map(recipe => {
                    return (
                        <li>
                            <p>Name:{recipe.name}</p>
                            <p>ID: {recipe.id}</p>
                        </li>
                    )
                })
            }
            
        </ul>
    )
}

function mapStateToProps(state) {
    const recipes = getRecipesList(state)
    return { recipes }
}

export default connect(mapStateToProps, { getAllRecipes })(RecipeList)