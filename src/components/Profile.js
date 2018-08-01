import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import UserVideoList from './UserVideoList';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';
import '../CSS/Profile.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profileName: '',
      uploadImageUrl: `${reqURL}/uploadProfilePic`,
      profilePictureSrc:'',
    }
  }
  componentDidMount() {
    axios
      .get(`${reqURL}/getUsername`)
      .then((userData) => {
        // console.log('username:', userData.data );
        axios.get(`${reqURL}/getUserImage`)
        .then((imageData) => {
          // console.log(imageData.data);
          // uppercase first letter only and slice rest of the string onto the first to be kept lowercase
          this.setState({ profileName: userData.data[0].toUpperCase() + userData.data.slice(1), profilePictureSrc: imageData.data })
          // console.log(this.state.profilePictureSrc);
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
  setTimer() {
    window.setTimeout(() => {
      console.log('image loaded')
    }, 5000 )
  };
  render() {
    return(
      <div>
        <Navbar />
        <div className = 'Page-Container'>
          <h1 className = 'profile-title app-title-item'>{this.state.profileName}'s Profile</h1>
          
          <div className = 'profile-image-container'>
            <button className='image-button' onClick={this.openImageModal}>Update Profile Picture</button>
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
                <input type="file" name="profPictureFile" onChange = {this.setTimer}/>
                <input className='upload-title' type='submit' value='Upload'/>
              </form> 
            </div>
          </div>
          <h1 className = 'profile-title app-title-item'> {this.state.profileName}'s Videos</h1>
          <UserVideoList/>
        </div>
      </div>
    );
  }
}