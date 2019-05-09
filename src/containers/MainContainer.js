import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import { RouteWithProps } from '../bin'

import { getAllRecipes } from '../redux/actions/recipe';
import { getRecipesList, getStateRecipes } from '../redux/selectors';
import { RecipeList, MainNav } from '../components';
import { RecipeDetailsContainer } from '.';

class MainContainer extends React.Component {
  render() {
    const { recipeList, recipeIsGetting, recipeGetFailed, getAllRecipes, auth } = this.props;
    return (
      <>
        <div id="main" className="columns is-paddingless ">
          <div className="column">
            <div className="container is-fluid">
              <MainNav id="navbar" auth={auth} getAllRecipes={getAllRecipes} />
              <Route
                path="/recipes"
                render={props => {
                  let fragment;
                  if (auth.isAuthenticated()) {
                    if (recipeIsGetting) fragment = <p>Loading...</p>;
                    else if (recipeGetFailed)
                      fragment = <p> Failed to load recipes. Try again later </p>;
                    else fragment = <RecipeList recipes={recipeList} {...props} />;
                  } else {
                    fragment = <p>Not logged in!</p>;
                  }
                  return <div>{fragment}</div>;
                }}
              />
            </div>
          </div>
          <Route path="/recipes/:id" component={RecipeDetailsContainer} />
        </div>
      </>
    );
  }
}

//the state mapped to props.recipes is actually formatted through selectors.js
//getRecipesList returns an array of recipe objects
function mapStateToProps(state) {
  const recipeList = getRecipesList(state);
  const recipeIsGetting = getStateRecipes(state).isGetting;
  const recipeGetFailed = getStateRecipes(state).getFailed;

  return { recipeList, recipeIsGetting, recipeGetFailed };
}

//exports the connected component
export default connect(
  mapStateToProps,
  { getAllRecipes },
)(MainContainer);
