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
      repPassword: '',
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
    const { username, email, password, repPassword } = this.state;

    // check username length
    if (username.length < 3 || username.length > 20 || /\W/.test(username) || /\s/.test(username)
    || !/[a-zA-Z]/.test(username)) {
      badUsername = true;
      document.getElementById('shortUsername').style.display = 'block';
    } else {
      document.getElementById('shortUsername').style.display = 'none';
      badUsername = false;
    }
    // check if email exists
    if (!EmailValidator.validate(email)) {
      document.getElementById('badEmail').style.display = 'block';
      badEmail = true;
    } else {
      document.getElementById('badEmail').style.display = 'none';
      badEmail = false;
    }
    if (password !== repPassword) {
      document.getElementById('repPassword').style.display = 'block';
      badPassword = true;
    } else {
      document.getElementById('repPassword').style.display = 'none';
      badPassword = false;
    }

    // check password if it meets requirements
    if (/\s/.test(password) || !/\d/.test(password) || !/\d/.test(password) || !/\W/.test(password)
        || !/\d/.test(password) || password.length < 8 || password.length > 20 || !/[A-Z]/.test(password)) {
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

  handleRepPassword = (event) => {
    this.setState({ repPassword: event.target.value });
  }

  requestKey = () => {
    window.location = '/requestkey';
  }

  render() {
    const { usermame, password, repPassword, email, secretKey } = this.state;
    return (
      <div id="page-event">
        <Navbar />
        <div className="Page-Container">
          <div className="form-group app-userform">
            <h1 className="app-title-item"> Create Your Videorealm Account </h1>
            <label className="text-items" htmlFor="name" id="username-message"> <b>Choose your username:</b></label>
            <p className="form-input">
              <b>
              Username must be minumum 3 character with at least one letter. Cannot user special characters for username.
              </b>
            </p>
            <input type="name" maxLength="30" className="form-control form-input" id="name" value={usermame} onChange={this.handleSetUsername} />
            <p id="shortUsername" className="email-warning text-items">
              Error: Username must be minumum 3 characters with at least one capital letter
              and no special characters
            </p>
            <p id="badUsername" className="email-warning text-items">Error: Username already exists</p>
          </div>
          <div className="form-group">
            <label className="text-items" htmlFor="pwd"><b>Create your password:</b></label>
            <p className="form-input">
              <b>Password must be minimum 8 characters long and must include at least one number,
                one letter and one special character
              </b>
            </p>
            <input type="password" maxLength="50" className="form-control form-input" value={password} onChange={this.handleSetPassword} />
            <p id="badPassword" className="email-warning text-items">Error: Password does not meet criterias
            </p>
          </div>
          <div className="form-group">
            <label className="text-items" htmlFor="pwd"><b>Confirm your password:</b></label>
            <input type="password" maxLength="50" className="form-control form-input" value={repPassword} onChange={this.handleRepPassword} />
            <p id="repPassword" className="email-warning text-items">Error: Passwords do not match</p>
          </div>
          <div className="form-group">
            <label className="text-items" htmlFor="pwd"><b>Enter a valid Email:</b></label>
            <input type="email" maxLength="350" className="form-control form-input" id="email" value={email} onChange={this.handleSetEmail} />
            <p id="badEmail" className="email-warning text-items">Please enter an existing email</p>
            <p id="dupEmail" className="email-warning text-items">Error: Only one account allowed per email</p>
          </div>
          <div className="form-group">
            <label className="text-items" htmlFor="pwd"><b>Enter your beta key:</b></label>
            <input type="password" maxLength="50" className="form-control form-input" id="secretkey" value={secretKey} onChange={this.handleSecretKey} />
            <p id="badkey" className="email-warning text-items">That is not a correct beta key</p>
          </div><br />
          <button type="submit" className="all-buttons text-items" id="submit-button" onClick={this.requestKey}>Request Beta Key</button>
          <button type="submit" className="all-buttons text-items" id="submit-button" onClick={this.createUser}>Submit</button>
        </div><br /><br /><br />
        <Footer />
      </div>
    );
  }
}
