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
      userName: ''
    }
  }
  myProfile = () => {
    window.location = `/profile/${this.state.userName}`;
  }
  myAccount = () => {
    window.location = '/account';
  }
  createUser = () => {
    window.location = '/createUser';
  }
  loginPage = () => {
    if (this.state.loginState === 'LOGIN') {
      window.location = '/login';
    }
    if (this.state.loginState === 'LOGOUT') {
    axios
      .get(`${reqURL}/logoutUser`)
      .then(() => {
        document.getElementById('create-button').style.display = 'block';
        window.location = '/login';
      })
    }
  }
  homePage = () => {
    window.location = '/';

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
  componentWillMount() {
    axios
      .get(`${reqURL}/getUsername`)
      .then((userData) => {
        if (userData.data.error) {
          document.getElementById('account-button').style.display = 'none';
          document.getElementById('profile-button').style.display = 'none';
          this.setState({ loginState: 'LOGIN',  accountState: '', createState: 'NEW ACCOUNT', profileName: ''});
        } else {
          document.getElementById('create-button').style.display = 'none';
          this.setState({ loginState: 'LOGOUT', accountState: 'ACCOUNT',  profileName: 'PROFILE', 
          createState: '', userName: userData.data});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return(
      <div className = 'navbar-container'>
        <div className = 'navbar-margins'>
          <div className = 'navbar-item-container'>        
            <img className = 'navbar-icon-item' alt='home-page' src = 'https://png.icons8.com/ios/1600/home.png' onClick = {this.homePage} />
            <input className='searchbar-field' type='text' onChange={this.handleSearchTerm} placeholder='Search for videos'></input> 
				    <img className='navbar-icon-item' alt='search-video' onClick={this.searchForVideos} src='https://png.icons8.com/ios/1600/search.png' />
          </div>
          <div className = 'navbar-item-container2'>
            <button id='profile-button' onClick = {this.myProfile} className = 'navbar-button'>{this.state.profileName}</button>
            <button id='account-button' onClick = {this.myAccount} className = 'navbar-button'>{this.state.accountState}</button>
            <button id='create-button' onClick = {this.createUser} className = 'navbar-button'>{this.state.createState}</button>
            <button onClick = {this.loginPage} className = 'navbar-button'>{this.state.loginState}</button>
          </div>
        </div>
      </div>
    )
  }
}