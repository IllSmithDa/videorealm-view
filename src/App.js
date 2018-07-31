import React, { Component } from 'react';
import * as EmailValidator from 'email-validator';
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
      email:'',
    }
  }
  createUser = () => {
    let badPassword = false;
    let badEmail = false;
    let badUsername = false;

    // check username length
    if (this.state.username.length < 3) {
      badUsername = true;
      const userDoc = document.getElementById('shortUsername');
      userDoc.style.display = "block";
    } else {
      const userDoc = document.getElementById('shortUsername');
      userDoc.style.display = "none";
    }

    //check if email exists
    if (!EmailValidator.validate(this.state.email)) {
      const emailDoc = document.getElementById('badEmail');
      emailDoc.style.display = "block";
      badEmail = true;
    } else {
      const emailDoc = document.getElementById('badEmail');
      emailDoc.style.display = "none";
    }
    //check password if it meets requirements
    if (!/\d/.test(this.state.password) || !/\d/.test(this.state.password) || 
    this.state.password.length < 6 || this.state.password.length > 20) {
      const paswordDoc = document.getElementById('badPassword');
      paswordDoc.style.display = "block";
      badPassword = true;
    
    } else {
      const paswordDoc = document.getElementById('badPassword');
      paswordDoc.style.display = "none";
    }

    const usernameReq = {username: this.state.username};
    const emailReq = {email: this.state.email};
    axios
    .post(`${reqURL}/checkUsername`, usernameReq) 
      .then((data) => {
        if (data.data.error) {
          const userDoc = document.getElementById('badUsername');
          userDoc.style.display = "block";
          badUsername = true;
        } else {
          const userDoc = document.getElementById('badUsername');
          userDoc.style.display = "none";
        }
        axios.post(`${reqURL}/checkEmail`, emailReq)
          .then((data) => {
            if (data.data.error) {
              console.log('error', data.data.err)
              const emailDoc = document.getElementById('dupEmail');
              emailDoc.style.display = "block";
              badEmail = true;
            } else {
              const emailDoc = document.getElementById('dupEmail');
              emailDoc.style.display = "none";
            }

            // if it passes all tests 
            if (!badPassword && !badEmail && !badUsername) {
              const userData = { username: this.state.username, password: this.state.password, email: this.state.email };
              axios
                .post(`${reqURL}/usercreate`, userData)
                .then(() => {
                  window.location = `/profile`;
                })
                .catch((err) => {
                  console.log(err);
                })
            }
          })
          .catch(err => {
            throw err;
          })
      })
      .catch(err => {
        throw err;
      })

    // if it passes all tests 
    if (!badPassword && !badEmail && !badUsername) {
      const userData = { username: this.state.username, password: this.state.password, email: this.state.email };
      axios
        .post(`${reqURL}/usercreate`, userData)
        .then(() => {
          window.location = `/profile`;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  handleSetUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSetPassword = (event) => {
    this.setState({ password: event.target.value });
  }
  handleSetEmail = (event) => {
    this.setState({ email: event.target.value });
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
          <p id = 'shortUsername' className ="email-Warning">Error: Username must be at least 3 letters</p> 
          <p id = 'badUsername' className ="email-Warning">Error: Username already exists</p> 
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Create your password:</label>
          <input type="password" className="form-control" id="pwd" value = { this.state.password } onChange = { this.handleSetPassword }/>
          <p id = 'badPassword' className ="email-Warning">Error: invalid password</p> 
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Email:</label>
          <input type="email" className="form-control" id="email" value = { this.state.email } onChange = { this.handleSetEmail }/>
        </div>
        <p id = 'badEmail' className ="email-Warning">Please enter an existing email!</p>
        <p id = 'dupEmail' className ="email-Warning">Error: Only one account allowed per email</p> 
        <button type="submit" className="btn btn-default" onClick = { this.createUser }>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
