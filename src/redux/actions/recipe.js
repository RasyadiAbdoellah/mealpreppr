import { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, GET_RECIPE, GET_RECIPES, SELECT_RECIPE, CLEAR_RECIPE } from '../recipeActionTypes'

export function getAllRecipes(response) {
    return {
        type: GET_RECIPES,
        payload: response
    }
}

export function addRecipe(response) {
    return {
        type: ADD_RECIPE,
        payload: response
    }
}

export function updateRecipe(response) {
    return {
        type: UPDATE_RECIPE,
        payload: response
    }
}

export function selectRecipe(id) {
    return {
        type: SELECT_RECIPE,
        payload: id
    }
}

export function clearRecipe() {
    return {
        type: CLEAR_RECIPE
    }
}
