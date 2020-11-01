import React, { Component } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import reqURL from '../RequestURL';
import './RequestKey.css'

export default class RequestKey extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  }

  sendEmail = () => {
    const { email } = this.state;
    const sendEmail = { email };
    const emailCheck = EmailValidator.validate(email);
    if (!emailCheck) {
      document.getElementById('email-wrong').style.display = 'block';
    } else {
      document.getElementById('email-wrong').style.display = 'none';
      axios.post(`${reqURL}/sendEmail`, sendEmail)
        .then((emailErr) => {
          if (emailErr.data.error) {
            document.getElementById('email-wrong').style.display = 'block';
          } else {
            document.getElementById('beta-form').style.display = 'none';
            document.getElementById('form-sucess').style.display = 'block';
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
        <div className="reqkey-container">
          <h1 id="form-sucess" className="app-title-item add-bottom-margins hide-element"> Thank You for your participation!.
          An email will be sent to you if you are selected for the beta
          </h1>
          <div id="beta-form">
            <h1 className="app-title-item add-bottom-margins"> Enter your email to request for a beta key </h1>
            <p className="add-margins">
              <b>
                If you are selected for the beta, you will be sent an email with a key.
              </b>
            </p>
            <div className="form-group">
              <label className="text-items" htmlFor="pwd"><b>Email:</b></label>
              <input type="email" maxLength="350" className="form-control form-input add-margins" onChange={this.emailHandler} />
            </div>
            <p id="email-wrong" className="email-warning add-margins">Error: Email is either not valid or has already recieved a key</p>
            <button type="submit" className="reply-buttons add-margins" onClick={this.sendEmail}>Submit</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
