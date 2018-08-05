import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
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
      betaEmail: '',
    };
  }

  componentDidMount() {
    document.getElementById('email-warning').style.display = 'none';
    document.getElementById('email-success').style.display = 'none';
  }

  componentDidUpdate() {
    const eventEnter = document.getElementById('admin-submit');
    eventEnter.addEventListener('keypress', (event) => {
      // console.log(`first keydown event. key property value is '${event.key}'`);
      if (event.key === 'Enter') {
        this.checkPassword();
      }
    });
    const eventEnter2 = document.getElementById('beta-submit');
    eventEnter2.addEventListener('keypress', (event) => {
      // console.log(`first keydown event. key property value is '${event.key}'`);
      if (event.key === 'Enter') {
        this.sendBetaKey();
      }
    });
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

  emailHandler = (event) => {
    this.setState({ betaEmail: event.target.value });
  }

  sendBetaKey = () => {
    const { betaEmail } = this.state;
    const email = { email: betaEmail };
    axios.post(`${reqURL}/sendBetaKey`, email)
      .then((data) => {
        if (data.data.error) {
          document.getElementById('email-warning').style.display = 'block';
          document.getElementById('email-warning').style.color = 'red';
        } else {
          document.getElementById('email-success').style.display = 'block';
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
              <input id="admin-submit" type="password" onChange={this.handleAdminPassword} />
              <br />
              <p id="wrongKey" className="email-warning">Error: Admin key is not correct!</p><br />
              <button type="submit" onClick={this.checkPassword}>Submit</button>
            </div>
          </div>
          <h1 className="app-title-item">Admin&apos;s Videos</h1>
          <DeleteAllVid />
          <AllVideos />
          <br />
          <h1> Send Beta Keys </h1>
          Email: <input id="beta-submit" type="email" onChange={this.emailHandler} /><br /><br />
          <button type="submit" onClick={this.sendBetaKey} className="all-buttons"> Send BetaKey </button><br />
          <p id="email-warning"> Error: Failed to send beta key as email already has one </p>
          <p id="email-success"> Beta Key has been successfully been sent out!</p>
          <br /><br /><br />
        </div>
        <br /><br /><br />
        <Footer />
      </div>
    );
  }
}
