import React from 'react';
import { connect } from "react-redux";
import { Route } from 'react-router-dom'
// import { RouteWithProps } from '../bin'

import { getAllRecipes } from '../redux/actions/recipe'
import { getRecipesList, getStateRecipes } from '../redux/selectors';
import { RecipeList, Nav} from '../components';
import { RecipeDetailsContainer } from '.';

class MainContainer extends React.Component {
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
            return recipeIsGetting ? <p>Loading...</p> : <RecipeList recipes={recipeList} {...props} />
          }} />
        </div>

        <Route path='/recipes/:id' component={RecipeDetailsContainer}/>
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
export default connect( mapStateToProps, { getAllRecipes })(MainContainer)