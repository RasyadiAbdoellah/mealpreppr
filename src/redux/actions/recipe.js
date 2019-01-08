import { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, GET_RECIPE, GET_RECIPES } from './recipeActionTypes'

export function getAllRecipes(response) {
    return {
        type: GET_RECIPES,
        payload: response
    }
}