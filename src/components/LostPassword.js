import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';

export default class LostPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      lostKey: '',
      password: '',
      repPassword: '',
    };
  }

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  }

  lostKeyHandler = (event) => {
    this.setState({ lostKey: event.target.value });
  }

  submitEmail = () => {
    const { email } = this.state;
    const myEmail = { email };
    axios.post(`${reqURL}/sendPwEmail`, myEmail)
      .then((userData) => {
        if (userData.data.error) {
          document.getElementById('email-error').style.display = 'block';
        } else {
          document.getElementById('stage-1').style.display = 'none';
          document.getElementById('stage-2').style.display = 'block';
          document.getElementById('key-retrieval2').style.display = 'block';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  submitLostKey = () => {
    const { lostKey } = this.state;
    const key = { myKey: lostKey };
    axios.post(`${reqURL}/checkMissingPWKey`, key)
      .then((userData) => {
        if (userData.data.error) {
          document.getElementById('key-error').style.display = 'block';
        } else {
          document.getElementById('key-retrieval2').style.display = 'none';
          document.getElementById('stage-2').style.display = 'none';
          document.getElementById('stage-3').style.display = 'block';
          document.getElementById('key-error').style.display = 'none';
          document.getElementById('key-alreadyhave').style.display = 'none';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  enterAKey = () => {
    document.getElementById('stage-1').style.display = 'none';
    document.getElementById('key-retrieval2').style.display = 'none';
    document.getElementById('key-alreadyhave').style.display = 'block';
    document.getElementById('stage-2').style.display = 'block';
  }

  sendNewKey = () => {
    document.getElementById('stage-1').style.display = 'block';
    document.getElementById('stage-2').style.display = 'none';
    document.getElementById('key-alreadyhave').style.display = 'none';
    document.getElementById('key-retrieval2').style.display = 'none';
  }

  handleSetPassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleRepPassword = (event) => {
    this.setState({ repPassword: event.target.value });
  }

  submitNewPassword = () => {
    const { password, repPassword } = this.state;

    let badPassword = false;
    // check password if it meets requirements
    if (password !== repPassword) {
      document.getElementById('repPassword').style.display = 'block';
      badPassword = true;
    } else {
      document.getElementById('repPassword').style.display = 'none';
      badPassword = false;
    }

    if (/\s/.test(password) || !/\d/.test(password) || !/\d/.test(password) || !/\W/.test(password)
    || !/\d/.test(password) || password.length < 8 || password.length > 20 || !/[A-Z]/.test(password)) {
      const paswordDoc = document.getElementById('badPassword');
      paswordDoc.style.display = 'block';
      badPassword = true;
    } else {
      const paswordDoc = document.getElementById('badPassword');
      paswordDoc.style.display = 'none';
    }

    if (!badPassword) {
      const { lostKey } = this.state;
      const key = { myKey: lostKey };
      axios.post(`${reqURL}/checkMissingPWKey`, key)
        .then((userData) => {
          if (userData.data.error) {
            document.getElementById('key-error').style.display = 'block';
          } else {
            const username = userData.data;
            const passwordNew = { username, password };
            axios.post(`${reqURL}/missingPw`, passwordNew)
              .then(() => {
                document.getElementById('stage-3').style.display = 'none';
                document.getElementById('stage-4').style.display = 'block';
              })
              .catch((err) => {
                throw err;
              });
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h1 className="upload-title app-title-item "> Lost Password Retrieval</h1>
          <div id="stage-1" className="add-margins">
            <p>
              <b><br />Please enter your account associated email here and a key for resetting your
              password will be sent to your email.<br />
              </b>
            </p>
            <b>Email:</b> <input className="video-name-input" onChange={this.emailHandler} /><br /><br />
            <button type="submit" className="reply-buttons" onClick={this.enterAKey}>Enter existing Key</button>
            <button className="reply-buttons" type="submit" onClick={this.submitEmail}>Submit Email<br /></button>
            <p id="email-error" className="email-warning"> Error: Account with that email does not exist </p>
          </div>
          <p id="key-retrieval2" className="hide-element add-margins">
            <b><br />Your retrieval key has been sent to your email. Please type it in here to verify your account
            </b><br />
          </p>
          <p id="key-alreadyhave" className="hide-element add-margins">
            <b><br />Please type your key in here to verify your account and reset your password.
            </b><br />
          </p>
          <div id="stage-2" className="hide-element add-margins">
            <b>Key:</b> <input className="video-name-input" onChange={this.lostKeyHandler} /><br /><br />
            <button type="submit" className="reply-buttons" onClick={this.sendNewKey}>Send Another Key</button>
            <button type="submit" className="reply-buttons" onClick={this.submitLostKey}>Submit Key</button>
          </div>
          <p id="key-error" className="email-warning add-margins">Error: invalid Key</p>
          <div id="stage-3" className="hide-element">
            <p className="add-margins">
              <b><br />Enter your new password here. Password must be 8 to 20 characters long and
              must include at least one number, one letter and one special character
              </b>
            </p>
            <div className="form-group">
              <label className="text-items" htmlFor="pwd"><b>Create your password:</b></label>
              <input type="password" className="form-control form-input" onChange={this.handleSetPassword} />
              <p id="badPassword" className="email-warning text-items">Error: Password does not meet criterias
              </p>
            </div>
            <div className="form-group">
              <label className="text-items" htmlFor="pwd"><b>Confirm your password:</b></label>
              <input type="password" className="form-control form-input" onChange={this.handleRepPassword} />
              <p id="repPassword" className="email-warning text-items">Error: Passwords do not match</p>
            </div>
            <button type="submit" className="add-margins all-buttons button-size" onClick={this.submitNewPassword}>Submit</button>
          </div>
          <div id="stage-4" className="hide-element add-margins">
            <p><b> Your have successfully reset your password. Please user your new password to log into your account</b></p>
          </div>
        </div>
      </div>
    );
  }
}
