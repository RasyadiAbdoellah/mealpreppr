import React, { Component } from 'react';
import { HashRouter, Router, Route } from 'react-router-dom';
import { Landing } from './components';
import { MainContainer } from './containers';
import history from './history';

import Auth from './Auth/Auth';
import Callback from './components/Callback';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};
export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <div className="flex-container">
            <Route
              path="/"
              render={props => <MainContainer auth={auth} {...props} />}
            />
            <Route
              path="/callback"
              exact
              render={props => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
          </div>
        </div>
      </Router>
    );
  }
}
