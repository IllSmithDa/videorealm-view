import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import reqURL from '../RequestURL';
import './LoginPage.css';

axios.defaults.withCredentials = true;
class Login extends Component {
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
    this.props.loginUser(user);

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
        <div className="login-page-container">
          <h1 className="app-title-item">Login to Videorealm</h1>
          <div className="form-group">
            <p htmlFor="name"><b>Enter your userame:</b></p>
            <input maxLength="30" type="name" className="form-control form-input" id="name" value={username} onChange={this.handleSetUsername} />
          </div>
          <div className="form-group">
            <p htmlFor="pwd"><b>Enter your Password:</b></p>
            <input maxLength="50" type="password" className="form-control form-input" id="pwd" value={password} onChange={this.handleSetPassword} />
          </div>
          <p id="badLogin" className="email-warning">
            Error: Incorrect username and/or password!
          </p>
          <button type="submit" className="user-login-button" onClick={this.loginUser}>Submit</button>
          <div className="login-link-group">
            <Link to="/lostusername"><p>Forgot Username? </p></Link>
            <Link to="/lostpassword"><p>Forgot Password? </p></Link>
            <Link to="/createUser"><p> Sign Up For Free</p></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.defaultProps = {
  loginUser: () => {},
};

Login.propTypes = {
  loginUser: Proptypes.func,
};

export default connect(null, loginUser)(Login);
