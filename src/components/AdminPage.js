import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import reqURL from './RequestURL';
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
      uploadImageUrl: `${reqURL}/addDefaultPic`,
      adminPassword: '',
    };
  }

  openImageModal = () => {
    document.getElementById('imageUploadModal').style.display = 'block';
  }

  closeImageModal = () => {
    document.getElementById('imageUploadModal').style.display = 'none';
  }

  handleAdminPassword = (event) => {
    this.setState({ adminPassword: event.target.value });
  }

  checkPassword = () => {
    const { adminPassword } = this.state;
    const adminPW = { adminPassword };
    axios.post(`${reqURL}/checkAdminKey`, adminPW)
      .then((adminData) => {
        if (adminData.data.error) {
          document.getElementById('wrongKey').style.display = 'block';
        } else {
          document.getElementById('adminModal').style.display = 'none';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { defaultProfilePic } = this.state;
    const { uploadImageUrl } = this.state;
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h1 className="app-title-item">Admin&apos;s Profile</h1><br />
          <div className="profile-image-container">
            <button type="submit" className="image-button" onClick={this.openImageModal}>Update Profile Picture</button>
            <img className="Profile-Image" src={defaultProfilePic} alt="admin-profile" />
          </div>
          <div id="imageUploadModal" className="image-modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="modal-close" onClick={this.closeImageModal}>&times;</span>
              <h1>Upload new Profile picture</h1>
              <br />
              <form
                id="uploadForm"
                action={uploadImageUrl}
                method="post"
                encType="multipart/form-data"
              >
                <input type="file" name="profPictureFile" onChange={this.setTimer} />
                <input type="submit" value="Upload" />
                <br />
              </form>
            </div>
          </div>
          <div id="adminModal" className="image-modal-admin">
            <div className="modal-content">
              <h1>Enter admin key to access webpage</h1>
              <br />
              <input type="password" onChange={this.handleAdminPassword} />
              <br />
              <p id="wrongKey" className="email-warning">Error: Admin key is not correct!</p><br />
              <button type="submit" onClick={this.checkPassword}>Submit</button>
            </div>
          </div>
          <h1 className="app-title-item">Admin&apos;s Videos</h1>
          <DeleteAllVid />
          <AllVideos />
        </div>
      </div>
    );
  }
}
