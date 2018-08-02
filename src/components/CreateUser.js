import React, { Component } from 'react'
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import Navbar from './Navbar';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';
axios.defaults.withCredentials = true;

export default class CreateUser extends Component {
   constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email:'',
      secretKey:'',
    }
  }
  createUser = () => {
    let badPassword = false;
    let badEmail = false;
    let badUsername = false;
    let badSecretKey = false;
    
    // check username length
    if (this.state.username.length < 3) {
      badUsername = true;
      const userDoc = document.getElementById('shortUsername');
      userDoc.style.display = 'block';
    } else {
      const userDoc = document.getElementById('shortUsername');
      userDoc.style.display = 'none';
    }

    //check if email exists
    if (!EmailValidator.validate(this.state.email)) {
      const emailDoc = document.getElementById('badEmail');
      emailDoc.style.display = 'block';
      badEmail = true;
    } else {
      const emailDoc = document.getElementById('badEmail');
      emailDoc.style.display = 'none';
    }
    //check password if it meets requirements
    if (!/\d/.test(this.state.password) || !/\d/.test(this.state.password) || 
    this.state.password.length < 6 || this.state.password.length > 20) {
      const paswordDoc = document.getElementById('badPassword');
      paswordDoc.style.display = 'block';
      badPassword = true;
    
    } else {
      const paswordDoc = document.getElementById('badPassword');
      paswordDoc.style.display = 'none';
    }
    const usernameReq = {username: this.state.username};
    const emailReq = {email: this.state.email};
    axios
    .post(`${reqURL}/checkUsername`, usernameReq) 
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
          .then((data) => {
            if (data.data.error) {
              console.log('error', data.data.err)
              const emailDoc = document.getElementById('dupEmail');
              emailDoc.style.display = 'block';
              badEmail = true;
            } else {
              const emailDoc = document.getElementById('dupEmail');
              emailDoc.style.display = 'none';
            }
            
            const secretKey = { secretKey: this.state.secretKey };
            axios.post(`${reqURL}/checkSecretKey`, secretKey)
              .then((data) => {
                console.log('data', data.data.error);
                if (data.data.error) {
                  document.getElementById('badkey').style.display='block';
                  badSecretKey = true;
                } else {
                  document.getElementById('badkey').style.display = 'none';
                  badSecretKey = false;
                }
                // if it passes all tests 
                if (!badPassword && !badEmail && !badUsername && !badSecretKey) {
                  const userData = { username: this.state.username, password: this.state.password, email: this.state.email };
                  axios
                    .post(`${reqURL}/usercreate`, userData)
                    .then((userData) => {
                      if (userData.data.error) {}
                      window.location = `/profile`;
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }
              })
              .catch((err) => {
                throw err;
              })
          })
          .catch(err => {
            throw err;
          })
      })
      .catch(err => {
        throw err;
      })
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
  componentDidMount() {
    console.log(process.env.SECRET_KEY);
  }
  componentDidUpdate() {
    let eventEnter = document.getElementById('page-event');
    eventEnter.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.createUser();
      }
    })
  }
  render() {
    return (
      <div id = 'page-event'>
        <Navbar />
        <div className = 'Page-Container'>
          <div className='form-group app-userform'>
            <h1 className = 'app-title-item'> Create Your Videorealm Account </h1>
            <label className='text-items' htmlFor='name' id='username-message'> <b>Choose your username:</b></label>
            <input type='name' className='form-control form-input' id='name' value = { this.state.username } onChange = { this.handleSetUsername }/>
            <p id = 'shortUsername' className ='email-warning text-items'>Error: Username must be at least 3 letters</p> 
            <p id = 'badUsername' className ='email-warning text-items'>Error: Username already exists</p> 
          </div>
          <div className='form-group'>
            <label className='text-items' htmlFor='pwd'><b>Create your password:</b></label>
            <input type='password' className='form-control form-input' id='pwd' value = { this.state.password } onChange = { this.handleSetPassword }/>
            <p id = 'badPassword' className ='email-warning text-items'>Error: invalid password. Password must be at least 8 characters long and must 
            include at least one number and one special character </p> 
          </div>
          <div className='form-group'>
            <label className='text-items' htmlFor='pwd'><b>Enter a valid Email:</b></label>
            <input type='email' className='form-control form-input' id='email' value = { this.state.email } onChange = { this.handleSetEmail }/>
            <p id = 'badEmail' className ='email-warning text-items'>Please enter an existing email</p>
            <p id = 'dupEmail' className ='email-warning text-items'>Error: Only one account allowed per email</p> 
          </div>
          <div className='form-group'>
            <label className='text-items' htmlFor='pwd'><b>Enter the secret key:</b></label>
            <input type='password' className='form-control form-input' id='secretkey' value = { this.state.secretKey } onChange = { this.handleSecretKey }/>
            <p id = 'badkey' className ='email-warning text-items'>That is not the secret key</p>
          </div>
          <button type='submit' className='all-buttons text-items' id='submit-button' onClick={ this.createUser }>Submit</button>
        </div>
      </div>
    );
  }
}