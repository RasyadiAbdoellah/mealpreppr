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
      <>
        {!isAuthenticated() && (
          <button onClick={this.login} className={this.props.className}>
            Log In
          </button>
        )}
        {isAuthenticated() && (
          <button onClick={this.logout} className={this.props.className}>
            Log Out
          </button>
        )}
      </>
    );
  }
}

export default function(props) {
  return (
    <nav className="section" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="field is-grouped">
        <NavLink
          to="/recipes"
          onClick={props.getAllRecipes}
          className="button is-dark is-rounded mr-3"
        >
          My Recipes
        </NavLink>
        <NavLink to="/recipes/new" className="button is-dark is-rounded mr-3">
          Add Recipe
        </NavLink>
        <AuthButton
          auth={props.auth}
          className="button is-dark is-rounded mr-3"
        />
      </div>
    </nav>
  );
}
