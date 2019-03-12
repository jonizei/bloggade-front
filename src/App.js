import React, { Component } from 'react';
import './App.css';
import BlogList from './BlogList.js';
import BlogArticle from './BlogArticle.js';

class App extends Component {

  state = {mode : 'browse'};

  render() {

    let printObj = null;

    if(this.state.mode === 'read') {
      printObj = <BlogArticle />;
    } else if(this.state.mode === 'browse') {
      printObj = <BlogList />
    }

    return (
      <div className="App">
        <div className="left-sidebar"></div>
        {printObj}
        <div className="right-sidebar"></div>
      </div>
    );
  }
}

export default App;
