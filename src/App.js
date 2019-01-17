import React, { Component } from 'react';
import {RecipeForm, Recipe, RecipeList} from './components';

class App extends Component {
  constructor(props){
    super()
    this.state = {
        displayRecipeList: true,
        displayRecipeForm: false,
        
    }
}

toggleRecipeList = () => {
    this.setState({
        displayRecipeList: !this.state.displayRecipeList
    })
}

toggleRecipeForm = () => {
    this.setState({
        displayRecipeForm: !this.state.displayRecipeForm
    })
}

render(){
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
