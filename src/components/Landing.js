import React from 'react';

export default class Landing extends React.Component {
  login = () => {
    this.props.auth.login();
  };

  logout = () => {
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
        {!isAuthenticated() && <button onClick={this.login}>Log In</button>}
        {isAuthenticated() && <button onClick={this.logout}>Log Out</button>}
      </div>
    );
  }
}
