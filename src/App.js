import React, { Component } from 'react';
import {RecipeForm, RecipeList} from './components';

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
            <button onClick={this.toggleRecipeList}> Recipe List</button>
            <button onClick ={this.toggleRecipeForm}> Add Recipe </button>
            {this.state.displayRecipeForm && <RecipeForm/>}
            {this.state.displayRecipeList && <RecipeList/>}
        </div>
    )
}
}

export default App;
