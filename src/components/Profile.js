import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import UserVideoList from './UserVideoList';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';
import '../CSS/Profile.css';
import '../CSS/VideoLayout.css';
// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profileName: '',
      uploadImageUrl: `${reqURL}/uploadProfilePic`,
      profilePictureSrc:'',
      loginState: true,
      currentUsername: '',
      imageFileTrack:''
    }
  }
  componentDidMount() {
    
    document.getElementById('uploadImagebtn').disabled = true;
    let getUsername = window.location.href;
    // grabs username inside current url 
    getUsername = getUsername.split("/").pop();
    console.log(getUsername);
    const username = {username: getUsername};
    axios
      .post(`${reqURL}/userNameMatch`, username)
      .then((userData) => {
        if (userData.data.error) {
          this.setState({ loginState: false })
          document.getElementById('userImageUpload').style.display = 'none';
        } else {
          this.setState({ loginState: true })
        }
        // console.log('username:', userData.data );
        axios.post(`${reqURL}/getUserImage`, username)
        .then((imageData) => {
          // console.log(imageData.data);
          // uppercase first letter only and slice rest of the string onto the first to be kept lowercase
          this.setState({ profileName: getUsername[0].toUpperCase() + getUsername.slice(1), 
            profilePictureSrc: imageData.data, currentUsername: getUsername })
          console.log(this.state.profilePictureSrc);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  openImageModal = () => {
    let modal = document.getElementById('imageUploadModal');
    modal.style.display = "block";
  }
  closeImageModal = () =>{
    let modal = document.getElementById('imageUploadModal');
    modal.style.display = "none";
  }
  trackFileUpload = (event) => {
    this.setState({ imageFileTrack: event.target.value });
  };
  componentDidUpdate() {
    if (this.state.imageFileTrack !== '') {
      document.getElementById('uploadImagebtn').disabled = false;
    } else {
      document.getElementById('uploadImagebtn').disabled = true;
    }
  }
  render() {
    return(
      <div>
        <Navbar />
        <div className = 'Page-Container'>
          <h1 className = 'profile-title app-title-item'>{this.state.profileName}</h1>
          
          <div className = 'profile-image-container'>
            <button id='userImageUpload' className='image-button' onClick={this.openImageModal}>Update Profile Picture</button>
            <img className = 'Profile-Image'src = {this.state.profilePictureSrc} alt='profilePicture'/>
          </div>

          <div id='imageUploadModal' className='image-modal'>
            <div className='modal-content'>
              <span className='modal-close' onClick={this.closeImageModal}>&times;</span>
              <h1 className='upload-title'>Upload new Profile picture</h1>
              <form ref='uploadForm' 
                id='uploadForm' 
                action= {this.state.uploadImageUrl}
                method='post' 
                encType="multipart/form-data">
                <input  className='upload-image-button' type="file" name="profPictureFile" onChange = {this.trackFileUpload}/>
                <input id='uploadImagebtn' className='upload-title-button' type='submit' value='Upload'/>
              </form> 
            </div>
          </div>
          <h1 className = 'profile-title app-title-item'> {this.state.profileName}'s Videos</h1>
          <UserVideoList username={this.state.currentUsername}/>
        </div>
      </div>
    );
  }
}