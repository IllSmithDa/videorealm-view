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
    const { profileName } = this.state;
    const { profilePictureSrc } = this.state;
    const { currentUsername } = this.state;
    const { uploadImageUrl } = this.state;
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h1 className="profile-title app-title-item">{profileName}</h1>
          <div className="profile-image-container">
            <button id="userImageUpload" type="submit" className="image-button" onClick={this.openImageModal}>Update Profile Picture</button>
            <img className="Profile-Image" src={profilePictureSrc} alt="profilePicture" />
          </div>

          <div id="imageUploadModal" className="image-modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="modal-close" onClick={this.closeImageModal}>&times;</span>
              <h1 className="upload-title">Upload new Profile picture</h1>
              <form
                id="uploadForm"
                action={uploadImageUrl}
                method="post"
                encType="multipart/form-data"
              >
                <input className="upload-image-button" type="file" name="profPictureFile" onChange={this.trackFileUpload} />
                <input id="uploadImagebtn" className="upload-title-button" type="submit" value="Upload" />
              </form>
            </div>
          </div>
          <h1 className="profile-title app-title-item"> {profileName}&apos;s Videos</h1>
          <UserVideoList username={currentUsername} />
        </div>
      </div>
    );
  }
}
