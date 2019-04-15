import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'mealprepr.auth0.com',
    clientID: 'Om5Q7N90qxCMySOfW9pTr2nix8PjbEHs',
    redirectUri: 'http://localhost:3000/',
    responseType: 'token id_token',
    scope: 'openid',
  });

  accessToken;
  idToken;
  expiresAt;

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/landing');
        console.log(err);
      }
    });
  };

  getAccessToken = () => {
    return this.accessToken;
  };

  getIdToken = () => {
    return this.IdToken;
  };

  setSession = authResult => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the main route
    history.replace('/');
  };

  renewSesstion = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`,
        );
      }
    });
  };

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      return_to: window.location.origin,
    });

    // navigate to the landing route
    history.replace('/landing');
  };
}
