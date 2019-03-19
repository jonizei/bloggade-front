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

    // let renderObj = <Login onSubmit={this.onSubmit} />
    let renderObj = <FrontPage />

    if(this.state.loggedIn) {
      renderObj = <FrontPage />;
    }

    return (
      <div className="App">
        {renderObj}
      </div>
    );
  }
}

export default App;

