import React from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";

import { RecipeForm, RecipeDetails, DetailsNav } from "../components";
import { getRecipeById } from "../redux/selectors";
import { deleteSelectedRecipe } from "../redux/actions/recipe";

// RecipeList is visually going to be a card, or rectangular box, with the recipe name and details, and full info that expands or opens a RecipeEntry component in new view on click
// expanded view will reveal an edit and delete button
// edit button toggles the JSX fragment shown
class Details extends React.Component {
  render() {
    const { recipe, match, deleteSelectedRecipe } = this.props;

    // fragment rendered is changed depending on the local showInput state
    return (
      <div id="detail" className="column is-one-third-desktop is-half-tablet">
        <Switch>
          <Route
            exact
            path="/recipes/new"
            render={() => {
              return (
                <>
                  <DetailsNav match={match} isForm />
                  <RecipeForm id="new" />
                </>
              );
            }}
          />
          <Route
            exact
            path={`${match.url}`}
            render={() => {
              //RecipeDetails needs the parent match prop since
              return (
                <>
                  {/* Match.url below should be /recipes/:id so the Link to should = recipes/1/edit when done correctly */}
                  <DetailsNav
                    match={match}
                    deleteSelectedRecipe={deleteSelectedRecipe}
                  />
                  <RecipeDetails id={match.params.id} recipe={recipe} />
                </>
              );
            }}
          />
          <Route
            path={`${match.url}/edit`}
            render={() => {
              return (
                <>
                  <DetailsNav match={match} isForm />
                  <RecipeForm id={match.params.id} />
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
