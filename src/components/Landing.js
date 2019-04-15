import React from 'react';
import Auth from '../Auth/Auth';

export default class Landing extends React.Component {
  loginHandler = () => {
    this.props.auth.login();
  };

  logoutHandler = () => {
    this.props.auth.logout();
  };

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {!isAuthenticated ? (
          <button onClick={this.loginHandler}> Log In </button>
        ) : (
          <button onClick={this.logoutHandler}> Log Out </button>
        )}
      </div>
    );
  }
}
