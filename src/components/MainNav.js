import React from "react";
import { NavLink } from "react-router-dom";

class AuthButton extends React.Component {
  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem("isLoggedIn") === "true") {
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

export default function(props) {
  return (
    <nav id={props.id}>
      <NavLink to="/recipes" onClick={props.getAllRecipes}>
        My Recipes
      </NavLink>
      <NavLink to="/recipes/new">Add Recipe</NavLink>
      <AuthButton auth={props.auth} />
    </nav>
  );
}
