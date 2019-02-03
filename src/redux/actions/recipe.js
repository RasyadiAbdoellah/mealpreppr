import * as axios from 'axios';
import API_URL from '../../config';
import { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, GET_RECIPE, GET_RECIPES, SELECT_RECIPE, CLEAR_RECIPE, RECEIVE_RECIPES } from '../recipeActionTypes'

function axiosGetRecipes() {
    return axios.get(API_URL + '/recipes')
 }


export function getRecipes() {
    return {
        type: GET_RECIPES
    }
}

export function getAllRecipes(){
    return function(dispatch){
        dispatch(getRecipes())
        return axiosGetRecipes().then(res => dispatch(receiveRecipes(res)), err => dispatch(receiveRecipes('error')))
    }
}

function receiveRecipes(response){
    return {
        type: RECEIVE_RECIPES,
        payload:response
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
        id
    }
}

export function clearRecipe() {
    return {
        type: CLEAR_RECIPE
    }
}
