import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { MainContainer } from './containers';
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
                <div className='flex-container'>
                    <Route path='/' component={MainContainer}/>
                
                </div>
            </div>
        </HashRouter>
    )
}



}



