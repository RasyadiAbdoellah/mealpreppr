import React, { Component } from 'react';
import {RecipeForm, Recipe, RecipeList} from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecipeForm/>
        {/* <Recipe/> */}
        <RecipeList/>
      </div>
    );
  }
}

export default App;
