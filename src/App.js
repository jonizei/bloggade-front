import React, { Component } from 'react';
import './App.css';
import FrontPage from './FrontPage.js';
import Login from './Login.js';

class App extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loggedIn : true
    };
  }

  onSubmit = event => {
    event.preventDefault();

    this.setState({loggedIn : true});
  }

  render() {

    let renderObj = <FrontPage isAdmin={false} />;

    if(this.state.loggedIn) {
      renderObj = <FrontPage isAdmin={true} />;
    }

    return (
      <div className="App">
        {renderObj}
      </div>
    );
  }
}

export default App;

