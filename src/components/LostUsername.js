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
      userName: '',
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
    axios.post(`${reqURL}/sendUsernameEmail`, myEmail)
      .then((userData) => {
        if (userData.data.error) {
          document.getElementById('email-error').style.display = 'block';
        } else {
          document.getElementById('stage-1').style.display = 'none';
          document.getElementById('stage-2').style.display = 'block';
          document.getElementById('key-retrieval').style.display = 'block';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  submitLostKey = () => {
    const { lostKey } = this.state;
    const key = { myKey: lostKey };
    axios.post(`${reqURL}/missingUsername`, key)
      .then((userData) => {
        if (userData.data.error) {
          document.getElementById('key-error').style.display = 'block';
        } else {
          document.getElementById('key-retrieval').style.display = 'none';
          document.getElementById('stage-2').style.display = 'none';
          document.getElementById('stage-3').style.display = 'block';
          document.getElementById('key-error').style.display = 'none';
          document.getElementById('key-alreadyhave').style.display = 'none';
          this.setState({ userName: userData.data });
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  enterAKey = () => {
    document.getElementById('stage-1').style.display = 'none';
    document.getElementById('stage-2').style.display = 'block';
    document.getElementById('key-alreadyhave').style.display = 'block';
  }

  sendNewKey = () => {
    document.getElementById('stage-1').style.display = 'block';
    document.getElementById('stage-2').style.display = 'none';
    document.getElementById('key-alreadyhave').style.display = 'none';
    document.getElementById('key-retrieval').style.display = 'none';
  }

  render() {
    const { userName } = this.state;
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h1 className="upload-title app-title-item "> Lost Username Retrieval</h1>
          <div id="stage-1" className="add-margins">
            <p>
              <b><br />Please enter your account associated email here and a key for retieving to your
              username will be sent to your email.<br />
              </b>
            </p>
            <b>Email:</b> <input className="video-name-input" onChange={this.emailHandler} /><br /><br />
            <button type="submit" className="reply-buttons" onClick={this.enterAKey}>Enter existing Key</button>
            <button className="reply-buttons" type="submit" onClick={this.submitEmail}>Submit Email<br /></button>
            <p id="email-error" className="email-warning"> Error: Account with that email does not exist </p>
          </div>
          <p id="key-retrieval" className="hide-element">
            <b><br />Your retrieval key has been sent to your email. Please type it in here to verify your account
            </b><br />
          </p>
          <p id="key-alreadyhave" className="hide-element">
            <b><br />Please type your key in here to verify your account and retrieve your username.
            </b><br />
          </p>
          <div id="stage-2" className="hide-element add-margins">
            <b>Key:</b> <input className="video-name-input" onChange={this.lostKeyHandler} /><br /><br />
            <button type="submit" className="reply-buttons" onClick={this.sendNewKey}>Send Another Key</button>
            <button type="submit" className="reply-buttons" onClick={this.submitLostKey}>Submit Key</button>
          </div>
          <p id="key-error" className="email-warning add-margins">Error: invalid Key</p>
          <div id="stage-3" className="hide-element add-margins">
            <p><b> Your have successfully retrieved your key. Please userwhen you log into your account</b></p>
            <p> Your username is: <b>{userName}</b></p>
          </div>
        </div>
      </div>
    );
  }
}
