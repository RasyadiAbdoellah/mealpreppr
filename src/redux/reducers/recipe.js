import { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, GET_RECIPE, GET_RECIPES } from '../recipeActionTypes'

const initialState = {
    allIds: [],
    byId: {}
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
                allIds: [ ...state.allIds, ...dataIds ],
                byId: { ...state.byId, ...recipesById}

            }
        }
        default:
            return state;
    }
}