import React, { Component } from 'react';
import axios from 'axios';
import reqURL from '../RequestURL';
import './Navbar.css';

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
    const { profileName, accountState, createState, loginState, userName } = this.state;
    const renderLoginButton = () => {
      if (loginState === 'LOGIN') {
        return (
          <div className="account-container">
            <div>
              <span id="login" role="button" tabIndex={0} onClick={this.loginPage}>{loginState}</span>
              <span id="create-account" role="button" tabIndex={-1} onClick={this.createUser}>SIGN UP FOR FREE</span>
            </div>
          </div>
        );
      }
      return (
        <div className="account-container">
          <button id="profile-button" type="submit" onClick={this.myProfile}>{profileName}</button>
          <button id="loginstate" type="submit" onClick={this.loginPage}>{loginState}</button>
        </div>
      );
    };
    const renderMobileLogin = () => {
      if (loginState === 'LOGIN') {
        return (
          <div className="dropdown-menu dropdown-container">
            <a className="dropdown-item" href="/">HOME</a>
            <span className="dropdown-item" id="login" role="button" tabIndex={0} onClick={this.loginPage}>{loginState}</span>
            <span className="dropdown-item" id="create-account" role="button" tabIndex={-1} onClick={this.createUser}>SIGN UP FOR FREE</span>
          </div>
        );
      }
      return (
        <div className="dropdown-menu dropdown-container">
          <a className="dropdown-item" href="/">HOME</a>
          <span className="dropdown-item" id="profile-button" type="submit" role="button" tabIndex={0} onClick={this.myProfile}>{profileName}</span>
          <span className="dropdown-item" id="loginstate" type="submit" role="button" tabIndex={-1} onClick={this.loginPage}>{loginState}</span>
        </div>
      );
    };
    return (
      <div className="navbar-container">
        <div className="navbar-grid">
          <div>
            <div className="navbar-home-container">
              <img className="navbar-icon-home" alt="home-page" src={require("../assets/videorealm-icon.png")} onClick={this.homePage} />
            </div>
          </div>
          <div>
            <div className="searchbar-grid">
              <div className="searchbar-container">
                <input id="search-field" maxLength="350" type="text" onChange={this.handleSearchTerm} placeholder="Search for videos" />
                <img alt="search-video" onClick={this.searchForVideos} src={require("../assets/search.png")} />
              </div>
              <div className="searchbar-container-mobile">
                <img alt="search-video" onClick={this.searchForVideos} src={require("../assets/search.png")} />
              </div>
              <div className="mobile-button-container">
                <div className="btn-group navbar-mobile-container ">
                  <button type="button" className="mobile-nav-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    &#9776;
                  </button>
                  {renderMobileLogin()}
                </div>
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
