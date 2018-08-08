import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingAnimation from './LoadingAnimation';
import UserVideoList from './UserVideoList';
import reqURL from './RequestURL';
import '../CSS/LoadingAnimation.css';
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
      profilePictureSrc: '',
      loginState: true,
      currentUsername: '',
      imageFileTrack: '',
    };
  }

  componentDidMount() {
    document.getElementById('uploadImagebtn').disabled = true;
    let getUsername = window.location.href;
    // grabs username inside current url
    getUsername = getUsername.split('/').pop();
    // console.log(getUsername);
    const username = { username: getUsername };

    axios.post(`${reqURL}/checkUsername`, username)
      .then((userCheck) => {
        if (userCheck.data.success) {
          // if user does not exist
          window.location = '/errorpage';
        } else {
          axios
            .post(`${reqURL}/userNameMatch`, username)
            .then((userData) => {
              if (userData.data.error) {
                // console.log('error occured')
                this.setState({ loginState: false });
                document.getElementById('userImageUpload').style.display = 'none';
              } else {
                this.setState({ loginState: true });
              }
              // console.log('username:', userData.data );
              axios.post(`${reqURL}/getUserData`, username)
                .then((imageData) => {
                  // console.log(imageData.data);
                  // uppercase first letter only and slice rest of the string onto the first to be kept lowercase
                  this.setState({
                    profileName: getUsername[0].toUpperCase() + getUsername.slice(1),
                    profilePictureSrc: imageData.data[0].profilePictureID,
                    currentUsername: getUsername,
                  });
                  // console.log(this.state.profilePictureSrc);
                })
                .catch((err) => {
                  throw err;
                });
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  componentDidUpdate() {
    const { imageFileTrack } = this.state;
    if (imageFileTrack !== '') {
      document.getElementById('uploadImagebtn').disabled = false;
    } else {
      document.getElementById('uploadImagebtn').disabled = true;
    }

    document.getElementById('uploadImageForm').addEventListener('submit', () => {
      document.getElementById('uploadImagebtn').style.display = 'none';
      document.getElementById('image-input').style.display = 'none';
      document.getElementById('image-update').style.display = 'block';
      document.getElementById('animation-load').style.display = 'flex';
    });
  }

  openImageModal = () => {
    document.getElementById('imageUploadModal').style.display = 'block';
  }

  closeImageModal = () => {
    document.getElementById('imageUploadModal').style.display = 'none';
  }

  trackFileUpload = (event) => {
    this.setState({ imageFileTrack: event.target.value });
  };

  render() {
    const { profileName, profilePictureSrc, currentUsername, uploadImageUrl } = this.state;
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h1 className="profile-title app-title-item">{profileName}</h1>
          <div className="profile-image-container">
            <button id="userImageUpload" type="submit" className="image-button" onClick={this.openImageModal}>Update Profile Picture</button>
            <img className="profile-image" src={profilePictureSrc} alt="profilePicture" />
          </div>
          <div id="imageUploadModal" className="image-modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="modal-close" onClick={this.closeImageModal}>&times;</span>
              <h1 className="upload-title">Upload new Profile picture</h1>
              <form
                id="uploadImageForm"
                action={uploadImageUrl}
                method="post"
                encType="multipart/form-data"
              >
                <p id="image-update" className="hide-element"> Please Wait while your image is being uploaded. </p>
                <LoadingAnimation />
                <input id="image-input" className="upload-image-button" type="file" name="profPictureFile" onChange={this.trackFileUpload} />
                <input id="uploadImagebtn" className="upload-title-button" type="submit" value="Upload" />
              </form>
            </div>
          </div>
          <h1 className="profile-title app-title-item"> {profileName}&apos;s Videos</h1>
          <UserVideoList username={currentUsername} />
        </div><br /><br /><br />
        <Footer />
      </div>
    );
  }
}
