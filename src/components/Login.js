import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';
import '../CSS/App.css';

axios.defaults.withCredentials = true;
export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidUpdate() {
    const eventEnter = document.getElementById('page-event');
    eventEnter.addEventListener('keypress', (event) => {
      // console.log(`first keydown event. key property value is '${event.key}'`);
      if (event.key === 'Enter') {
        this.loginUser();
      }
    });
  }

  loginUser = () => {
    const { username } = this.state;
    const { password } = this.state;
    const user = { username, password };
    axios.post(`${reqURL}/mongoLogin`, user)
      .then((data) => {
        if (data.data.error) {
          document.getElementById('badLogin').style.display = 'block';
        } else {
          window.location = `/profile/${username}`;
        }
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

  render() {
    const { username, password } = this.state;

    return (
      <div id="page-event">
        <Navbar />
        <div className="Page-Container">
          <h1 className="app-title-item">Login to Videorealm</h1>
          <div className="form-group">
            <label className="text-items" htmlFor="name"><b>Enter your userame:</b></label>
            <input type="name" className="form-control form-input" id="name" value={username} onChange={this.handleSetUsername} />
          </div>
          <div className="form-group">
            <label className="text-items" htmlFor="pwd"><b>Enter your Password:</b></label>
            <input type="password" className="form-control form-input" id="pwd" value={password} onChange={this.handleSetPassword} />
          </div>
          <p id="badLogin" className="email-warning text-items">
            Error: Incorrect username and/or password!
          </p>
          <button type="submit" className="text-items all-buttons" onClick={this.loginUser}>Submit</button>
          <Link to="/lostusername"><p className="add-margins add-top-margins">Forgot Username? </p></Link>
          <Link to="/lostpassword"><p className="add-margins">Forgot Password? </p></Link>
        </div><br /><br /><br />
        <Footer />
      </div>
    );
  }
}
