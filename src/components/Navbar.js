import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
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
    }
  }
  myProfile = () => {
    window.location = '/profile';
  }
  myAccount = () => {
    window.location = '/account';
  }
  loginPage = () => {
    // window.location = '/login';
    if (this.state.loginState === 'LOGIN') {
      window.location = '/login';
    }
    if (this.state.loginState === 'LOGOUT') {
    axios
      .get(`${reqURL}/logoutUser`)
      .then(() => {
        window.location = '/login';
      })
    }
  }
  newsPage = () => {
    window.location = '/news';
  }
  homePage = () => {
    if (this.state.loginState === 'LOGOUT') {
      window.location = '/news';
    } else {
      window.location = '/';
    }
    
  }
  searchForVideos = () => {
		if (this.state.searchItem !== '') {
			setTimeout(() => {
				window.location = `/video_search/${this.state.searchItem}`;
			})
		}
  }
	handleSearchTerm = (event) => {
		this.setState({searchItem: event.target.value})
	}
  componentDidMount() {
    axios
      .get(`${reqURL}/getUsername`)
      .then((userData) => {
        // console.log('username:', userData);
        if (userData.data === '' || userData.data === null || userData.data === undefined) {
          this.setState({ loginState: 'LOGIN',  accountState: '' });
        } else {
          this.setState({ loginState: 'LOGOUT', accountState: 'ACCOUNT',  profileName: userData.data.toUpperCase() });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return(
      <div className = "navbar-container">
        <div className = 'test'>
          <div className = "navbar-item-container">        
            <img className = "navbar-icon-item" alt='home-page' src = "https://png.icons8.com/ios/1600/home.png" onClick = {this.homePage} />
            <img className = "navbar-icon-item" alt='messages' src="https://png.icons8.com/wired/40/000000/activity-feed-2.png" onClick = {this.newsPage} />
            <input className="searchbar-field" type="text" onChange={this.handleSearchTerm} placeholder="Search for videos"></input> 
				    <button onClick={this.searchForVideos}>Search</button>
          </div>
          <div className = "navbar-item-container2">
            <button onClick = {this.myProfile} className = "navbar-button">{this.state.profileName}</button>
            <button onClick = {this.myAccount} className = "navbar-button">{this.state.accountState}</button>
            <button onClick = {this.loginPage} className = "navbar-button">{this.state.loginState}</button>
          </div>
        </div>
      </div>
    )
  }
}