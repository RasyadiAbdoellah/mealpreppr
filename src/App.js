import React, { Component } from 'react';
import {Recipe} from './containers'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Recipe/>
      </div>
    );
  }
}

export default App;
