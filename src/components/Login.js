import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import reqURL from './RequestURL'
import '../CSS/PageLayout.css'

axios.defaults.withCredentials = true;
export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      password:'',
    }
  }
  loginUser = () => {
    const user = { username: this.state.username, password: this.state.password };
    axios.post(`${reqURL}/mongoLogin`, user)
    .then((data) => {
      if (data.data.error) {
        let loginDoc = document.getElementById('badLogin');
        loginDoc.style.display = 'block';
      } else {
        window.location = `/profile`;
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  handleSetUsername = (event) => {
    this.setState({ username: event.target.value });
  }
  handleSetPassword = (event) => {
    this.setState({ password: event.target.value });
  }
  checkEnterKey = (event) => {
    const keyPressed = event.key;
    console.log(keyPressed);
  }
  componentDidUpdate() {
    let eventEnter = document.getElementById('page-event');
    eventEnter.addEventListener('keypress', (event) => {
      console.log(`first keydown event. key property value is "${event.key}"`);
      if (event.key === 'Enter') {
        this.loginUser();
      }
    })
  }
  render() {
    return(
      <div id='page-event'>
        <Navbar />
        <div className = 'Page-Container ' onkeydown={this.checkEnterKey}>
          <h1 className= "app-title-item">Login to Videorealm</h1>
          <div className="form-group">
          <label htmlFor="name"><b>Enter your userame:</b></label>
          <input type="name" className="form-control" id="name" value = { this.state.username } onChange = { this.handleSetUsername }/>
        </div>
        <div className="form-group">
          <label htmlFor="pwd"><b>Enter your Password:</b></label>
          <input type="password" className="form-control" id="pwd" value = { this.state.password } onChange = { this.handleSetPassword }/>
        </div>
        <p id = 'badLogin' className ="email-warning">Error: Incorrect username and/or password! </p> 
          <button type="submit" className="btn btn-default" onClick = { this.loginUser }>Submit</button>
        </div>
      </div>
    );
  }
}