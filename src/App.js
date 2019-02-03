import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { RecipeContainer } from './containers';
import {Nav} from './components'

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
                <Nav/>
                <div className='flex-container'>
                    <Route path='/recipes' component={RecipeContainer}/>
                
                </div>
            </div>
        </HashRouter>
    )
}



}



