import React, { Component } from 'react';
import './App.css';
import FrontPage from './FrontPage.js';
import Login from './Login.js';

class App extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {loggedIn : false};
  }

  onSubmit = event => {
    event.preventDefault();

    this.setState({loggedIn : true});
  }

  render() {
    return (
      <div className="App">
        <FrontPage />
      </div>
    );
  }
}

export default App;

