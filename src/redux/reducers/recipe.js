import { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, GET_RECIPE, GET_RECIPES, SELECT_RECIPE, CLEAR_RECIPE } from '../recipeActionTypes'

const initialState = {
    allIds: [],
    byId: {},
    selectedId: null,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES: {
            const { data } = action.payload
            const dataIds = data.map(recipe => recipe.id)
            const recipesById = {}

            data.forEach(recipe => {
                recipesById[recipe.id] = {...recipe}
            });
            return {
                ...state,
                allIds: dataIds,
                byId: recipesById

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
        case SELECT_RECIPE: {
            
            const  id  = action.payload
            
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