import React from 'react';
import { connect } from "react-redux";
import * as axios from 'axios';
import API_URL from '../config';
import { Route } from 'react-router-dom'
// import { RouteWithProps } from '../bin'

import { getAllRecipes, selectRecipe } from '../redux/actions/recipe'
import { getRecipesList, getStateRecipes } from '../redux/selectors';
import {RecipeForm, RecipeList, RecipeDetail} from '../components';

class RecipeContainer extends React.Component {
  constructor(props){
    super()
    this.get()
  }

  get = () => {
    axios.get(API_URL + '/recipes')
        .then(res =>this.props.getAllRecipes(res))
        .catch(error => console.log(error))
}

  render(){
    const { recipeList, recipeIsGetting, match } = this.props 
    console.log('ind render', recipeList)
  
    return (
      <>
        <RecipeList recipes={recipeList} {...this.props} />

        <Route path={`${match.path}/:id`} render={(props) => {
          
          const recipe = recipeList.find(recipe => recipe.id === +props.match.params.id)
          const returnValue = recipeIsGetting ? <p>loading...</p> : <RecipeDetail {...props} recipe={recipe}/>
          return returnValue
        }}/>
      </>
    )
}
}

//the state mapped to props.recipes is actually formatted through selectors.js
//getRecipesList returns an array of recipe objects
function mapStateToProps(state){
  const recipeList = getRecipesList(state)
  const recipeIsGetting = getStateRecipes(state).isGetting
  
  return { recipeList, recipeIsGetting } 
}

//exports the connected component
export default connect( mapStateToProps, { getAllRecipes })(RecipeContainer)