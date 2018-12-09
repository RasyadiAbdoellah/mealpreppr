import React, { Component } from 'react';
import IngredientList from './IngredientList';


export default class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Recipe: {
        name: '',
        details: '',
        day: 0,
        week: 0,
        month: 0,
        Ingredients: [{
          name: '',
          val: '',
          scale: '',
        }],
      },
    };
  }

  recipeInputHandler = (event) => {
    /*
    sets recipe state via inputs. Takes the input ID (Recipe-name or Recipe-details) and spilts it.
    Uses the split results and input value to determine state key:value pair.
    */
    const elID = event.target.id.split('-')
    const objKey = elID[1]
    const value = event.target.value
    const Recipe = this.state.Recipe

    Recipe[objKey] = value
  
    this.setState({Recipe})
  }

  ingredientHandler = (data) => {
    /* 
    handler to take ingredient data and pass it to state.  
    State obj is hard-coded, so no need to make anything dynamic.
    Requires data sent up to be an array.
    */

    const Recipe = this.state.Recipe
    Recipe.Ingredients = data

    Recipe.Ingredients = data

    this.setState({Recipe})
  }

render() {
  return (
    <div>
      <form>
        <label>
          Recipe Name:
          <input id="Recipe-name" value={this.state.Recipe.name} onChange={this.recipeInputHandler} />
        </label>
        <IngredientList onIngredientChange={this.ingredientHandler} Ingredients={this.state.Recipe.Ingredients}/>
        <label>
          Details:
          <textarea id="Recipe-details" value={this.state.Recipe.details} onChange={this.recipeInputHandler}/>
        </label>

      </form>
    </div>
  )
}
}