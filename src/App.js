import React, { Component } from 'react';
import { HashRouter, Router, Route } from 'react-router-dom';
import { Landing } from './components';
import { MainContainer } from './containers';
import history from './history';

import Auth from './Auth/Auth';
import Callback from './components/Callback';

// Goal for auth is to have a custom landing page that stops ppl from using the app if they're not signed in.
// on sign in it redirect to /home or /main or /dash.
// on sign out it redirects back to /
// signed in  users get autoredirected to /home or whatever if they navigate to /
// TODOS:
// figure out how to make custom signin widget and prevent initial redirect
// figure out how to tie in auth status to redux
// figure out routing logic

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
