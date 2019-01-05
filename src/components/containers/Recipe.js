import React, { Component } from 'react';
import IngredientList from './IngredientList';
import * as axios from 'axios';
import {default as API_URL} from '../../config.js'


export default class Recipe extends Component {
  constructor(props) {
    super(props);
    console.log(API_URL)
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

    //change below to action creator to modify for redux
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

    //will need to experiment with redux actions to see if nested objects are possible
    this.setState({Recipe})
  }

  submitHandler = () => {
    // sends data to backend.
    // will need to figure out how to connect to a dev and prod url, prob by setting ENV variables.
    // We might be able to re-use this for post and patch. Put in a check to see if recipe has ID. no id = post, id = patch

    // Will need to model how data is handled by redux. Should it have multiple objects to handle built vs persisted data?

    //TODO: MODEL DATA AND CORRESPONDING LOGIC
    switch(this.state.Recipe) {
      case Recipe.id:
        axios.patch()
          .then()
      // send an action to redux
      break
      case !Recipe.id:
        axios.post()
          .then()
      // send an action to redux
      break

      default:
    }
    
    
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
        <input type="submit" />
      </form>
    </div>
  )
}
}