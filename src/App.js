import React, { Component } from 'react';
import axios from 'axios';
import HomePage from './components/HomePage';
import './CSS/App.css';
import './CSS/PageLayout.css';
axios.defaults.withCredentials = true;

class App extends Component {

  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

export default App;
