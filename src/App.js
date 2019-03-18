import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { MainContainer } from './containers';

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
                <div className='flex-container'>
                    <Route path='/' component={MainContainer}/>
                
                </div>
            </div>
        </HashRouter>
    )
}



}



