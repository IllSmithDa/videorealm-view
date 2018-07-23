import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import reqURL from './RequestURL'
import AllVideos from './AllVideos';
import '../CSS/PageLayout.css';
import '../CSS/Profile.css';


// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      defaultProfilePic: 'https://s3.amazonaws.com/my.unique.bucket.userimages/DefaultPic.jpg',
      uploadImageUrl:`${reqURL}/addDefaultPic`
    }
  }
  componentDidMount() {

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
    return (
      <div>
        <Navbar/>
        <div  class = 'Page-Container'>
          <h1>Admin's Profile</h1>
          <div class = 'profile-image-container'>
            <button className='image-button' onClick={this.openImageModal}>Update Profile Picture</button>
            <img class = 'Profile-Image'src = {this.state.defaultProfilePic}/>
          </div>

          <div id='imageUploadModal' className='image-modal'>
            <div className='modal-content'>
              <span className='modal-close' onClick={this.closeImageModal}>&times;</span>
              <h1>Upload new Profile picture</h1>
              <form ref='uploadForm' 
                id='uploadForm' 
                action= {this.state.uploadImageUrl}
                method='post' 
                encType="multipart/form-data">
                <input type="file" name="profPictureFile" onChange = {this.setTimer}/>
                <input type='submit' value='Upload'/>
              </form> 
            </div>
          </div>
          <AllVideos/>
        </div>
      
      </div>
    );
  }
}