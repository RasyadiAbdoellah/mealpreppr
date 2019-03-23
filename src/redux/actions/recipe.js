import * as axios from 'axios';
import API_URL from '../../config';
import { ADD_RECIPE, UPDATE_RECIPE, DELETING_RECIPE, DELETE_RECIPE, GET_RECIPE, GET_RECIPES, SELECT_RECIPE, CLEAR_RECIPE, RECEIVE_RECIPES } from '../recipeActionTypes'


//getRecipes switches the isGetting flag in the redux store to true
//getRecipes is called within the main get action getAllRecipes so it does not need to be exported.
function getRecipes() {
    return {
        type: GET_RECIPES
    }
}

//
function receiveRecipes(response){
    return {
        type: RECEIVE_RECIPES,
        payload:response
    }
}


export function getAllRecipes(){
    return function(dispatch){
        dispatch(getRecipes())
        return axios.get(API_URL + '/recipes')
        //if there is an error receiveRecipes will trigger either set getFailed = true and getRecipes = false or push data to state and getRecipes = False
            .then(res => dispatch(receiveRecipes(res)), err => dispatch(receiveRecipes('error: ' + toString(err))))
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

//passed id param is assigned to recipeIdToDelete prop in redux store.
function deletingRecipe(id) {
    return {
        type: DELETING_RECIPE,
        id
    }
}


//provide no response on success, error messaging on fail
function deleteRecipe(response) {
    return {
        type: DELETE_RECIPE,
        response
    }
}

export function deleteSelectedRecipe(id) {
    return function(dispatch){
        dispatch(deletingRecipe(id))
        return axios.delete(API_URL + '/recipes/' + id)
            .then( res => dispatch(deleteRecipe()), error => dispatch(deleteRecipe('error: ' + toString(error))))
    }
}