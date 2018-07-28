import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import reqURL from './components/RequestURL';
import './CSS/App.css';
import './CSS/PageLayout.css';
axios.defaults.withCredentials = true;

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }
  createUser = () => {
    const userData = { username: this.state.username, password: this.state.password };
    axios
      .post(`${reqURL}/usercreate`, userData)
      .then(() => {
        window.location = `/profile`;
      })
  }
  handleSetUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSetPassword = (event) => {
    this.setState({ password: event.target.value });
  }
  render() {
    return (
      <div className="App-container">
        <Navbar/>
        <div className = 'Page-Container'>
          <div className = 'app-title'>
            <h1>Welcome to Friendrealm</h1>
            <h4> Your next social media app!</h4>
          </div>
          <div className="form-group app-userform">
          <h1> Create Your Friendrealm Account </h1>
          <label htmlFor="name"> Choose your username:</label>
          <input type="name" className="form-control" id="name" value = { this.state.username } onChange = { this.handleSetUsername }/>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Create your password:</label>
          <input type="password" className="form-control" id="pwd" value = { this.state.password } onChange = { this.handleSetPassword }/>
        </div>
        <button type="submit" className="btn btn-default" onClick = { this.createUser }>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
