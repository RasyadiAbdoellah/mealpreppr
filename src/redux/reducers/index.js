import recipes from './recipe'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    recipes,
    form: formReducer
})