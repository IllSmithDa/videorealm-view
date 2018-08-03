import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import reqURL from './RequestURL'
import DeleteAllVid from './DeleteAllVid';
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
      uploadImageUrl:`${reqURL}/addDefaultPic`,
      adminPassword: ''
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
  handleAdminPassword = (event) =>{
    this.setState({ adminPassword: event.target.value })
  }
  checkPassword = () => {
    const adminPW = { adminPassword: this.state.adminPassword};
    axios.post(`${reqURL}/checkAdminKey`, adminPW)
      .then(adminData => {
        if (adminData.data.error) {
          document.getElementById('wrongKey').style.display = 'block';
        } else {
          document.getElementById('adminModal').style.display = 'none';
        }
      })
      .catch(err => {
        throw err;
      })
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
        <h1 className = 'app-title-item'>Admin's Profile</h1><br/>
          <div class = 'profile-image-container'>
            <button className='image-button' onClick={this.openImageModal}>Update Profile Picture</button>
            <img class = 'Profile-Image'src = {this.state.defaultProfilePic} alt='admin-profile-picture'/>
          </div>

          <div id='imageUploadModal' className='image-modal'>
            <div className='modal-content'>
              <span className='modal-close' onClick={this.closeImageModal}>&times;</span>
              <h1>Upload new Profile picture</h1>
              <br/>
              <form ref='uploadForm' 
                id='uploadForm' 
                action= {this.state.uploadImageUrl}
                method='post' 
                encType="multipart/form-data">
                <input type="file" name="profPictureFile" onChange = {this.setTimer}/>
                <input type='submit' value='Upload'/><br/>
              </form> 
            </div>
          </div>
          <div id='adminModal' className='image-modal-admin'>
            <div className='modal-content'>
              <h1>Enter admin key to access webpage</h1><br/>
              <input type= 'password' onChange = {this.handleAdminPassword }/><br/>
              <p id='wrongKey' className='email-warning'>Error: Admin key is not correct! </p><br/>
              <button onClick={this.checkPassword}>Submit</button>
            </div>
          </div>
          <h1 className = 'app-title-item'> Admin's Videos</h1>
          <DeleteAllVid/>
          <AllVideos/>
        </div>
      </div>
    );
  }
}