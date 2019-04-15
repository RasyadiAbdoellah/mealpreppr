import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route } from 'react-router-dom';
import { Landing } from './components';
import { MainContainer } from './containers';

import Auth from './Auth/Auth';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="flex-container">
            <Route
              path="/home"
              render={props => <MainContainer auth={auth} {...props} />}
            />
            <Route
              path="/"
              render={props => {
                return <Landing auth={auth} {...props} />;
              }}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
