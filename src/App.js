import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RecipeForm, RecipeList, RecipeExpanded} from './components';
import { getStateRecipes ,getRecipeById } from './redux/selectors';

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
    const {selectedRecipe} = this.props 
    return (
        <div className="App">
            <button onClick={this.toggleRecipeList}> My Recipe </button>
            <button onClick ={this.toggleRecipeForm}> Add Recipe </button>
            {this.state.displayRecipeForm && <RecipeForm toggle={this.toggleRecipeForm}/>}
            {this.state.displayRecipeList && <RecipeList/>}
            {selectedRecipe && <RecipeExpanded recipe={selectedRecipe}/>}
        </div>
    )
}



}

function mapStateToProps(state){

    const selectedRecipe = getRecipeById(state, getStateRecipes(state).selectedId)
    return { selectedRecipe }
}

export default connect(mapStateToProps)(App);
