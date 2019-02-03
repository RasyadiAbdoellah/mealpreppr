import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { RecipeContainer } from './containers';
import { getRecipesList } from './redux/selectors';

export default class App extends Component {
  constructor(props){
    super()
    this.state = {
        displayRecipeList: true,
        displayRecipeForm: false,
        
    }
}
render(){
    return (
        <HashRouter>
            <div className="App">
                <Route path='/recipes' component={RecipeContainer}/>
            </div>
        </HashRouter>
    )
}



}



