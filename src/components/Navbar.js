import React, { Component } from 'react';
import axios from 'axios';
import reqURL from './RequestURL';
import '../CSS/Navbar.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      profileName: '',
      loginState: 'LOGIN',
      accountState: '',
      searchItem: '',
      createState: 'NEW ACCOUNT',
      userName: '',
    };
  }

  componentWillMount() {
    axios
      .get(`${reqURL}/getUsername`)
      .then((userData) => {
        if (userData.data.error) {
          this.setState({
            loginState: 'LOGIN',
            accountState: '',
            createState: 'SIGN UP FOR FREE',
            profileName: '',
          });
        } else {
          this.setState({
            loginState: 'LOGOUT',
            accountState: 'ACCOUNT',
            profileName: 'PROFILE',
            createState: '',
            userName: userData.data,
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  componentDidUpdate() {
    const eventEnter = document.getElementById('search-field');
    eventEnter.addEventListener('keypress', (event) => {
      // console.log(`first keydown event. key property value is '${event.key}'`);
      if (event.key === 'Enter') {
        this.searchForVideos();
      }
    });
  }

  myProfile = () => {
    const { userName } = this.state;
    window.location = `/profile/${userName}`;
  }

  myAccount = () => {
    window.location = '/account';
  }

  createUser = () => {
    window.location = '/createUser';
  }

  loginPage = () => {
    const { loginState } = this.state;
    if (loginState === 'LOGIN') {
      window.location = '/login';
    }
    if (loginState === 'LOGOUT') {
      document.getElementById('profile-button').style.display = 'none';
      document.getElementById('account-button').style.display = 'none';
      document.getElementById('loginstate').style.display = 'none';
      axios
        .get(`${reqURL}/logoutUser`)
        .then(() => {
          document.getElementById('create-button').style.display = 'block';
          window.location = '/login';
        });
    }
  }

  homePage = () => {
    window.location = '/';
  }

  searchForVideos = () => {
    const { searchItem } = this.state;
    if (searchItem !== '') {
      window.location = `/video_search/${searchItem}`;
    }
  }

  handleSearchTerm = (event) => {
    this.setState({ searchItem: event.target.value });
  }

  render() {
    const { profileName, accountState, createState, loginState } = this.state;
    const renderLoginButton = () => {
      if (loginState === 'LOGIN') {
        return (
          <div className="account-container">
            <button id="create-button" type="submit" onClick={this.createUser} className="navbar-button">{createState}</button>
            <button id="loginstate" type="submit" onClick={this.loginPage} className="navbar-button">{loginState}</button>
          </div>
        );
      }
      return (
        <div className="account-container">
          <button id="profile-button" type="submit" onClick={this.myProfile} className="navbar-button">{profileName}</button>
          <button id="loginstate" type="submit" onClick={this.loginPage} className="navbar-button">{loginState}</button>
        </div>
      );
    };
    return (
      <div className="navbar-container">
        <div className="navbar-grid">
          <div>
            <div className="navbar-home-container">
              <img className="navbar-icon-home" alt="home-page" src="https://img.icons8.com/dusk/64/000000/home-page.png" onClick={this.homePage} />
            </div>
            <div className="navbar-mobile" />
          </div>
          <div>
            <div className="searchbar-grid">
              <div className="searchbar-container">
                <input id="search-field" maxLength="350" type="text" onChange={this.handleSearchTerm} placeholder="Search for videos" />
                <img className="navbar-icon-item" alt="search-video" onClick={this.searchForVideos} src="https://img.icons8.com/doodle/48/000000/search--v1.png" />
              </div>
            </div>
          </div>
          {renderLoginButton()}
        </div>
      </div>
    );
  }
}

/*
            <div className="navbar-home-container">
              <img className="navbar-icon-home" alt="home-page" src="https://img.icons8.com/dusk/64/000000/home-page.png" onClick={this.homePage} />
            </div>

            */