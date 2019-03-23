import { ADD_RECIPE, UPDATE_RECIPE, DELETING_RECIPE, DELETE_RECIPE, GET_RECIPE, GET_RECIPES, SELECT_RECIPE, CLEAR_RECIPE, RECEIVE_RECIPES } from '../recipeActionTypes'
import { string } from 'prop-types';

const initialState = {
    isGetting: false,
    getFailed: false,
    deleteFailed: false,
    postFailed: false,
    updateFailed: false,
    errorMessage: '',
    isDeletingRecipe: false,
    recipeIdToDelete: null,
    allIds: [],
    byId: {},
    selectedId: null,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES: {
            return Object.assign({}, state, {
                isGetting: true
            })
        }
        case RECEIVE_RECIPES: {
            const { data } = action.payload
            if( data && typeof data !== 'string') {
                const dataIds = data.map(recipe => recipe.id)
                const recipesById = {}
    
                data.forEach(recipe => {
                    recipesById[recipe.id] = {...recipe}
                });
                return Object.assign({}, state, {
                    isGetting: false,
                    getFailed: false,
                    allIds: dataIds,
                    byId: recipesById
                })
            } else {
                return Object.assign({}, state, {
                    isGetting: false,
                    getFailed: true,
                    errorMessage: action.payload
                })
            }
        }
        case ADD_RECIPE: {
            const { data } = action.payload
            const recipeIds = [...state.allIds]
            const recipesById = {...state.byId}

            recipeIds.push(data.id)
            recipesById[data.id] = {...data}

            return {
                ...state,
                allIds: recipeIds,
                byId: recipesById
            }
        }
        case UPDATE_RECIPE: {
            const { data } = action.payload
            const recipe = {...state.byId[data.id], ...data}
            const recipesById = {...state.byId}
            recipesById[recipe.id] = {...recipe}

            return {
                ...state,
                byId: recipesById
            }
        }
        case DELETING_RECIPE: {
            return Object.assign({}, state, {
                isDeletingRecipe: true,
                recipeIdToDelete: action.id
            })
        }
        case DELETE_RECIPE: {
            const res = action.response
            console.log(res)
            const id = state.recipeIdToDelete
            const recipeIds = [...state.allIds]
            const recipesById = {...state.byId}

            if( !res ){
                recipeIds.splice(recipeIds.indexOf(+id), 1)
                delete recipesById[id]

                return Object.assign({}, state, {
                    isDeletingRecipe: false,
                    deleteFailed:false,
                    recipeIdToDelete: null,
                    allIds: recipeIds,
                    byId: recipesById,

                })
            } else {
                return Object.assign({}, state, {
                    isDeletingRecipe: false,
                    deleteFailed: true,
                    errorMessage: res
                })
            }
        }
        case SELECT_RECIPE: {
            
            const  id  = action.id
            
            return {
                ...state,
                selectedId: id,
            }
        }

        case CLEAR_RECIPE: {
            return {
                ...state,
                selectedId: null,
            }
        }
        default:
            return state;
    }
}