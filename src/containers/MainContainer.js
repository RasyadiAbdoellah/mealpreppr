import React from 'react';
import { connect } from "react-redux";
import * as axios from 'axios';
import API_URL from '../config';
import { Route } from 'react-router-dom'
// import { RouteWithProps } from '../bin'

import { getAllRecipes, selectRecipe } from '../redux/actions/recipe'
import { getRecipesList, getStateRecipes } from '../redux/selectors';
import {RecipeForm, RecipeList, RecipeDetail, Nav} from '../components';

class RecipeContainer extends React.Component {
  constructor(props){
    super(props)
    this.props.getAllRecipes()
  }

  render(){
    const { recipeList, recipeIsGetting } = this.props 
    return (
      <>
        <div id='main'>
          <Nav id='navbar'/>
          <Route path='/recipes' render={props =>{
            return <RecipeList recipes={recipeList} {...props} />
          }} />
        </div>

        <Route path='/recipes/:id' render={(props) => {
          const recipe = recipeList.find(recipe => recipe.id === +props.match.params.id)
          return <RecipeDetail {...props} recipe={recipe}/>
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