import React from "react";
import { Link } from "react-router-dom";

function RecipeCard(props) {
  const { recipe, match } = props;
  return (
    <div className="column is-narrow">
      <Link
        to={`${match.url}/${recipe.id}`}
        className="box"
        style={{ width: "200px", height: "200px" }}
      >
        <h1>{recipe.name}</h1>
      </Link>
    </div>
  );
}

export default function RecipeList(props) {
  return (
    <div className="columns is-multiline">
      {props.recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} {...props} />
      ))}
    </div>
  );
}
