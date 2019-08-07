import React from "react";
import { connect } from "react-redux";
import { Link, Route, Switch, Redirect } from "react-router-dom";

import { RecipeForm, RecipeDetails, DetailsNav } from "../components";
import { getRecipeById } from "../redux/selectors";
import { deleteSelectedRecipe } from "../redux/actions/recipe";

//Details is a container that renders routes for /recipes/new or recipes/:id
//It is called within a route in App.js and receives match from Route in MainContainer. 
//This match prop is used to populate recipe via redux


//TODO - STYLING
//Add inner div with .box or .card
//Add Typography to RecipeDetails
class Details extends React.Component {
  render() {
    const { recipe, match, deleteSelectedRecipe } = this.props;

    return (
      <div id="detail" className="column is-two-fifths-desktop is-half-tablet">
        <Switch>
          <Route
            exact
            path={`${match.url}`}
            render={() => {
              //if id is new show new form, else show recipe detail
              if(match.params.id === 'new') {
                return (
                  <>
                    <DetailsNav match={match} isForm />
                    <RecipeForm id="new" />
                  </>
                );
              } else if(recipe){
                //checks if recipe prop is defined
                return (
                  <>
                    <DetailsNav
                      match={match}
                      deleteSelectedRecipe={deleteSelectedRecipe}
                    />
                    <RecipeDetails id={recipe.id} recipe={recipe} />
                  </>
                );
              } else {
                // fail condition redirects back to recipes
                return <Redirect to='/recipes' />
              }
            }}
          />
          <Route
            //Match.url below should be /recipes/:id so the Link to should = recipes/1/edit when done correctly
            path={`${match.url}/edit`}
            render={() => {
              return (
                <>
                  <DetailsNav match={match} isForm />
                  <RecipeForm id={recipe.id} />
                </>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(
  state,
  {
    match: {
      params: { id }
    }
  }
) {
  const recipe = getRecipeById(state, id);
  return { recipe };
}

export default connect(
  mapStateToProps,
  { deleteSelectedRecipe }
)(Details);
