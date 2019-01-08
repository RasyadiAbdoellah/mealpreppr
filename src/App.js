import React, { Component } from 'react';
import {Recipe, RecipeList} from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Recipe/>
        <RecipeList/>
      </div>
    );
  }
}

export default App;
