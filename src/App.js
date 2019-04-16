import React, { Component } from 'react';
import './App.css';
import FrontPage from './FrontPage.js';
import Login from './Login.js';

class App extends Component {

  anonUser = {
    roles: [
      'ANYNOMOUS'
    ]
  }

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.tryLogin = this.tryLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      loggedIn : true,
      isLoading : false,
      userDetails: {},
      loginActions: {
        tryLogin: this.tryLogin,
        handleLogout: this.handleLogout
      } 
    };
  }

  componentDidMount() {
    this.handleLogin();
  }

  tryLogin(username, password) {

    let user = {
        userName: username,
        password: password
    };

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user),
        dataType: 'json'
    }).then((httpResp) => httpResp.json())
        .then((jsonObject) => {
            localStorage.setItem('accessToken', jsonObject.accessToken);
            this.handleLogin();
        })
        .catch(this.onError);

  }

  handleLogin() {
    const jwt = localStorage.getItem('accessToken');

    this.setState({isLoading : true});
    fetch('http://localhost:8080/api/auth/users/details', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then((httpResp) => httpResp.json())
        .then((jsonObject) => {
          this.setState({loggedIn: true, userDetails: jsonObject.user, isLoading : false});
        })
        .catch((msg) => {
          console.log(msg);
          this.setState({loggedIn: false, userDetails: this.anonUser, isLoading : false});
        });

  }

  handleLogout(changeMode) {

    this.setState({loggedIn: false, userDetails: this.anonUser}, () => {
      localStorage.removeItem('accessToken');
      this.handleLogin();
    });

  }

  render() {

    if(!this.state.isLoading) {
      return (
        <div className="App">
          <FrontPage userDetails={this.state.userDetails} loginActions={this.state.loginActions} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <p>Loading...</p>
        </div>
      );
    }

  }
}

export default App;

