import React, { Component } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';

axios.defaults.withCredentials = true;

export default class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      secretKey: '',
    };
  }

  componentDidUpdate() {
    const eventEnter = document.getElementById('page-event');
    eventEnter.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.createUser();
      }
    });
  }

  createUser = () => {
    let badPassword = false;
    let badEmail = false;
    let badUsername = false;
    let badSecretKey = false;
    const { username } = this.state;
    const { email } = this.state;
    const { password } = this.state;

    // check username length
    if (username.length < 3) {
      badUsername = true;
      const userDoc = document.getElementById('shortUsername');
      userDoc.style.display = 'block';
    } else {
      const userDoc = document.getElementById('shortUsername');
      userDoc.style.display = 'none';
    }

    // check if email exists
    if (!EmailValidator.validate(email)) {
      const emailDoc = document.getElementById('badEmail');
      emailDoc.style.display = 'block';
      badEmail = true;
    } else {
      const emailDoc = document.getElementById('badEmail');
      emailDoc.style.display = 'none';
    }
    // check password if it meets requirements
    if (!/\d/.test(password) || password.length < 8 || password.length > 20) {
      const paswordDoc = document.getElementById('badPassword');
      paswordDoc.style.display = 'block';
      badPassword = true;
    } else {
      const paswordDoc = document.getElementById('badPassword');
      paswordDoc.style.display = 'none';
    }
    const usernameReq = { username };
    const emailReq = { email };
    axios.post(`${reqURL}/checkUsername`, usernameReq)
      .then((data) => {
        if (data.data.error) {
          const userDoc = document.getElementById('badUsername');
          userDoc.style.display = 'block';
          badUsername = true;
        } else {
          const userDoc = document.getElementById('badUsername');
          userDoc.style.display = 'none';
        }
        axios.post(`${reqURL}/checkEmail`, emailReq)
          .then((emailData) => {
            if (emailData.data.error) {
              // console.log('error', data.data.err);
              const emailDoc = document.getElementById('dupEmail');
              emailDoc.style.display = 'block';
              badEmail = true;
            } else {
              const emailDoc = document.getElementById('dupEmail');
              emailDoc.style.display = 'none';
            }
            const { secretKey } = this.state;
            const mySecretKey = { secretKey };
            axios.post(`${reqURL}/checkSecretKey`, mySecretKey)
              .then((secretData) => {
                // console.log('data', secretData.data.error);
                if (secretData.data.error) {
                  document.getElementById('badkey').style.display = 'block';
                  badSecretKey = true;
                } else {
                  document.getElementById('badkey').style.display = 'none';
                  badSecretKey = false;
                }
                // if it passes all tests
                if (!badPassword && !badEmail && !badUsername && !badSecretKey) {
                  const userData = { username, password, email };
                  axios
                    .post(`${reqURL}/usercreate`, userData)
                    .then(() => {
                      window.location = `/profile/${username}`;
                    })
                    .catch((err) => {
                      throw err;
                    });
                }
              })
              .catch((err) => {
                throw err;
              });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
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

  handleSecretKey = (event) => {
    this.setState({ secretKey: event.target.value });
  }

  render() {
    const { usermame, password, email, secretKey } = this.state;

    return (
      <div id="page-event">
        <Navbar />
        <div className="Page-Container">
          <div className="form-group app-userform">
            <h1 className="app-title-item"> Create Your Videorealm Account </h1>
            <label className="text-items" htmlFor="name" id="username-message"> <b>Choose your username:</b></label>
            <input type="name" className="form-control form-input" id="name" value={usermame} onChange={this.handleSetUsername} />
            <p id="shortUsername" className="email-warning text-items">Error: Username must be at least 3 letters</p>
            <p id="badUsername" className="email-warning text-items">Error: Username already exists</p>
          </div>
          <div className="form-group">
            <label className="text-items" htmlFor="pwd"><b>Create your password:</b></label>
            <input type="password" className="form-control form-input" id="pwd" value={password} onChange={this.handleSetPassword} />
            <p id="badPassword" className="email-warning text-items">Error: invalid password. Password must be at least 8 characters long and must
              include at least one number and one special character
            </p>
          </div>
          <div className="form-group">
            <label className="text-items" htmlFor="pwd"><b>Enter a valid Email:</b></label>
            <input type="email" className="form-control form-input" id="email" value={email} onChange={this.handleSetEmail} />
            <p id="badEmail" className="email-warning text-items">Please enter an existing email</p>
            <p id="dupEmail" className="email-warning text-items">Error: Only one account allowed per email</p>
          </div>
          <div className="form-group">
            <label className="text-items" htmlFor="pwd"><b>Enter your beta key:</b></label>
            <input type="password" className="form-control form-input" id="secretkey" value={secretKey} onChange={this.handleSecretKey} />
            <p id="badkey" className="email-warning text-items">That is not a correct beta key</p>
          </div>
          <button type="submit" className="all-buttons text-items" id="submit-button" onClick={this.createUser}>Submit</button>
        </div><br /><br /><br />
        <Footer />
      </div>
    );
  }
}
