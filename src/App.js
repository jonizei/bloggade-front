import React, { Component } from 'react';
import './App.css';
import BlogList from './BlogList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="left-sidebar"></div>
        <BlogList />
        <div className="right-sidebar"></div>
      </div>
    );
  }
}

export default App;
