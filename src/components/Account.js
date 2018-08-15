import React, { Component } from 'react';
import axios from 'axios';
import LoadingAnimation from './LoadingAnimation';
import Navbar from './Navbar';
import Footer from './Footer';
import reqURL from './RequestURL';
import AccountVideos from './AccountVideos';
import DeleteVideos from './DeleteVideos';
import '../CSS/LoadingAnimation.css';
import '../CSS/PageLayout.css';
import '../CSS/VideoLayout.css';
// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      videoUploadReq: `${reqURL}/uploadNewVideo`,
      videoIDList: [],
      userVideoName: '',
      maxVideoSize: '35mb',
      maxSizeNum: 35000000,
      loginState: true,
      fileName: '',
      username: '',
      displayName: '',
      newUsername: '',
      newPassword: '',
      passwordRepeat: '',
      oldPassword: '',
    };
  }

  componentDidMount() {
    axios.get(`${reqURL}/getUsername`)
      .then((userData) => {
        this.setState({
          username: userData.data,
          displayName: userData.data[0].toUpperCase() + userData.data.slice(1),
        });
        axios.get(`${reqURL}/getVideoList`)
          .then((data) => {
            if (data.data.error) {
              this.setState({ loginState: false });
            } else {
              const videoIDArr = [];
              for (let i = 0; i < data.data.length; i += 1) {
                videoIDArr.push(data.data[i].videoID);
              }
              this.setState({ loginState: true, videoIDList: videoIDArr });
              // console.log(this.state.videoIDList);
              if (data.data.length >= 5) {
                document.getElementById('videoWarning').style.display = 'block';
              } else {
                document.getElementById('videoWarning').style.display = 'none';
              }
            }
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  componentDidUpdate() {
    let videoNameReady = true;
    let fileReady = true;

    const { fileName, userVideoName, maxSizeNum } = this.state;

    // if video is selected
    if (fileName !== '') {
      // console.log(document.getElementById('upload-file').files[0]);


      // check if correct and supported format
      if (!(/.mp4/).test(fileName) && !(/.mov/).test(fileName)
      && !(/.wmv/).test(fileName) && !(/.avi/).test(fileName)
      && !(/.flv/).test(fileName)) {
        document.getElementById('video-error').style.display = 'block';
        fileReady = false;
      } else {
        document.getElementById('video-error').style.display = 'none';
        fileReady = true;
      }

      const currentFileSize = document.getElementById('upload-file').files[0].size;
      if (fileName !== '' && currentFileSize > maxSizeNum) {
        document.getElementById('video-size').style.display = 'block';
        fileReady = false;
      } else {
        document.getElementById('video-size').style.display = 'none';
        fileReady = true;
      }
    } else {
      document.getElementById('video-error').style.display = 'none';
      document.getElementById('video-size').style.display = 'none';
      fileReady = false;
    }

    // check if videoname empty
    if (userVideoName !== '') {
      videoNameReady = true;
    } else {
      videoNameReady = false;
    }

    // if both conditions are met
    if (fileReady && videoNameReady) {
      document.getElementById('upload-submit').disabled = false;
    } else {
      document.getElementById('upload-submit').disabled = true;
    }

    document.getElementById('videoForm').addEventListener('submit', () => {
      document.getElementById('upload-submit').style.display = 'none';
      document.getElementById('upload-file').style.display = 'none';
      document.getElementById('video-add').style.display = 'block';
      document.getElementById('animation-load').style.display = 'flex';
      document.getElementById('videoName').style.display = 'none';
      document.getElementById('video-upload-close').style.display = 'none';
      document.getElementById('form-header').style.display = 'none';
    });
  }

  getVideoList = () => {
    const { getVideoList } = this.state;
    return getVideoList;
  }

  openModal = () => {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('video-upload-close').style.display = 'block';
    document.getElementById('form-header').style.display = 'block';
    document.getElementById('upload-submit').disabled = true;
  }

  closeModal = () => {
    document.getElementById('myModal').style.display = 'none';
  }

  handleVideoName = (event) => {
    this.setState({ userVideoName: event.target.value });
  }

  openWarning = () => {
    document.getElementById('warningModal').style.display = 'block';
  }

  openUsernameModal = () => {
    document.getElementById('usernameModal').style.display = 'block';
  }

  closeDeleteModal = () => {
    document.getElementById('warningModal').style.display = 'none';
  }

  finalDeleteUser = () => {
    const { videoIDList } = this.state;
    const videoList = { videoIDList };
    axios.post(`${reqURL}/deleteVideos`, videoList)
      .then(() => {
        axios.get(`${reqURL}/deleteUserFinal`)
          .then((data) => {
            if (data.data.error) {
              document.getElementById('deleteFailure').style.display = 'block';
            } else {
              window.location = '/';
            }
          })
          .catch((err) => {
            throw err;
          });
      });
  }

  changeUploadState = (event) => {
    this.setState({ fileName: event.target.value });
    const { fileName } = this.state;
    console.log(fileName);
  }

  disableSubmit = () => {
    document.getElementById('upload-submit').disabled = true;
    document.getElementById('upload-submit').disabled = true;
  }

  handleNewUsername = (event) => {
    this.setState({ newUsername: event.target.value });
  }

  cancelUsername = () => {
    document.getElementById('usernameModal').style.display = 'none';
  }

  closeUserModal = () => {
    document.getElementById('usernameModal').style.display = 'none';
  }

  submitNewUsername = () => {
    let badUsername = false;
    let repUsername = false;
    const { username, newUsername } = this.state;
    const usernameChange = { username, newUsername };
    const user = { username: newUsername };

    if (newUsername.length < 3 || newUsername.length > 20 || /\W/.test(newUsername) || /\s/.test(newUsername)
    || !/[a-zA-Z]/.test(newUsername)) {
      document.getElementById('badUsername').style.display = 'block';
      badUsername = true;
    } else {
      document.getElementById('badUsername').style.display = 'none';
      badUsername = false;
    }

    axios.post(`${reqURL}/checkUsername`, user)
      .then((data) => {
        if (data.data.error) {
          document.getElementById('repUsername').style.display = 'block';
          repUsername = true;
        } else {
          document.getElementById('repUsername').style.display = 'none';
          repUsername = false;
        }
        if (!badUsername && !repUsername) {
          axios.post(`${reqURL}/changeUsername`, usernameChange)
            .then((userData) => {
              document.getElementById('usernameModal').style.display = 'none';
              this.setState({
                username: userData.data,
                displayName: userData.data[0].toUpperCase() + userData.data.slice(1),
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

  handleNewPassword = (event) => {
    this.setState({ newPassword: event.target.value });
  }

  handleRepeatPassword = (event) => {
    this.setState({ passwordRepeat: event.target.value });
  }

  handleOldPassword = (event) => {
    this.setState({ oldPassword: event.target.value });
  }

  openPasswordModal = () => {
    document.getElementById('passwordModal').style.display = 'block';
  }

  closePasswordModal = () => {
    document.getElementById('passwordModal').style.display = 'none';
  }

  submitNewPassword = () => {
    let correctOld = true;
    let correctNew = true;
    const { oldPassword, newPassword, passwordRepeat } = this.state;
    const password = { password: oldPassword };
    const passwordNew = { password: newPassword };
    axios.post(`${reqURL}/checkPassword`, password)
      .then((passData) => {
        if (passData.data.error) {
          document.getElementById('incorrectPW').style.display = 'block';
          correctOld = false;
        } else {
          document.getElementById('incorrectPW').style.display = 'none';
          correctOld = true;
        }
        if (newPassword !== passwordRepeat) {
          document.getElementById('noMatchPW').style.display = 'block';
          correctNew = false;
        } else {
          document.getElementById('noMatchPW').style.display = 'none';
          correctNew = true;
        }
        if (/\s/.test(newPassword) || !/\d/.test(newPassword) || !/\d/.test(newPassword) || !/\W/.test(newPassword)
        || !/\d/.test(newPassword) || newPassword.length < 8 || newPassword.length > 20 || newPassword === oldPassword
        || !/[A-Z]/.test(newPassword)) {
          document.getElementById('badPW').style.display = 'block';
          correctNew = false;
        } else {
          document.getElementById('badPW').style.display = 'none';
          correctNew = true;
        }

        if (correctOld && correctNew) {
          axios.post(`${reqURL}/changePassword`, passwordNew)
            .then(() => {
              document.getElementById('passwordModal').style.display = 'none';
              document.getElementById('paswordSuccess').style.display = 'block';
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

  //   <button type="submit" className="add-margins all-buttons" onClick={this.openWarning}>Delete my account </button>
  render() {
    const { videoUploadReq, loginState, displayName, maxVideoSize } = this.state;
    if (!loginState) {
      window.location = '/login';
      return (
        <div>
          <h1>Please Login</h1>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h1 className="accountTitle app-title-item">{displayName}&apos;s Account</h1>
          <button type="submit" className="add-margins reply-buttons" onClick={this.openUsernameModal}>Change Username </button>
          <button type="submit" className="add-margins reply-buttons" onClick={this.openPasswordModal}>Change Password </button>
          <br />
          <button id="deletebutton" type="submit" className="add-margins reply-buttons hide-element" onClick={this.openWarning}>Delete my account </button>
          <p id="paswordSuccess" className="add-margins email-warning"> <b>Password Sucessfully Changed!</b></p>
          <p id="deleteFailure" className="add-margin email-warning "> <br /><b>Warning: failed to Delete Account</b></p>
          <div id="warningModal" className="modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="close" onClick={this.closeDeleteModal}>&times;</span>
              <h3 className="app-title-item red-font">
                Warning: You will lose all your data including profile picture and videos.
                Do you wish to Delete your account?
              </h3>
              <div>
                <button type="submit" className="reply-buttons delete-button" onClick={this.finalDeleteUser}>Yes</button>
                <button type="submit" className="reply-buttons delete-button" onClick={this.closeDeleteModal}>No</button>
              </div>
            </div>
          </div>
          <div id="usernameModal" className="modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="close" onClick={this.closeUserModal}>&times;</span>
              <h2>
                Enter a new uername
              </h2>
              <p><b>Must be 3 to 20 characters long and must contain at least one letter and no special characters</b></p>
              <input className="video-name-input" type="text" maxLength="30" name="videoName" onChange={this.handleNewUsername} />
              <p id="repUsername" className="email-warning"> <b>Username already exists </b></p>
              <p id="badUsername" className="email-warning"> <b>Invalid username</b></p>
              <div>
                <br />
                <button type="submit" className="reply-buttons" onClick={this.cancelUsername}>Cancel</button>
                <button type="submit" className="reply-buttons" onClick={this.submitNewUsername}>Submit</button>
              </div>
            </div>
          </div>
          <div id="passwordModal" className="modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="close" onClick={this.closePasswordModal}>&times;</span>
              <h2>
                Enter a new password
              </h2>
              <p>
                <b>Must be 8 to 20 characters long with at least 1 capital letter, 1 number, 1 special character and must different from your current
                password.
                </b>
              </p>
              <b>Current Password:</b><input className="video-name-input" maxLength="50" type="password" name="videoName" onChange={this.handleOldPassword} />
              <p id="incorrectPW" className="email-warning"><b> Error: Password is not correct</b></p><br />

              <b>New Password:</b><input className="video-name-input" maxLength="50" type="password" name="videoName" onChange={this.handleNewPassword} /><br />
              <b>Confirm New Password:</b> <input className="video-name-input" maxLength="50" type="password" name="videoName" onChange={this.handleRepeatPassword} />
              <p id="badPW" className="email-warning"> <b>Error: The password does not meet criteria</b></p>
              <p id="noMatchPW" className="email-warning"> <b>Error: The passwords do not match</b></p><br />
              <div>
                <br />
                <button type="submit" className="reply-buttons" onClick={this.closePasswordModal}>Cancel</button>
                <button type="submit" className="reply-buttons" onClick={this.submitNewPassword}>Submit</button>
              </div>
            </div>
          </div>
          <h1 className="accountTitle app-title-item">{displayName}&apos;s Videos</h1>
          <div className="group-button">
            <button id="myBtn2" type="submit" className="add-margins reply-buttons" onClick={this.openModal}> Upload Video </button>
            <DeleteVideos deleteVideoList={this.getVideoList} />
          </div>
          <p id="videoWarning" className="add-margins email-Warning">
            <b>Notice: You have reached the maximum number of videos allowed on this account! Delete
              existing video(s) to add new ones.
            </b>
          </p>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span id="video-upload-close" role="button" tabIndex="-1" className="close" onClick={this.closeModal}>&times;</span>
              <h1 className="upload-title">Upload Video Here</h1>
              <p><b>Maximum video size: {maxVideoSize}</b> </p>
              <p><b>Supported formats: mp4, mov, wmv, avi, flv </b> </p>
              <form
                id="videoForm"
                action={videoUploadReq}
                method="post"
                encType="multipart/form-data"
              >
                <h3 id="form-header" className="video-name"> Enter Video Name:
                  <input id="videoName" maxLength="50" className="video-name-input" type="text" name="videoName" onChange={this.handleVideoName} />
                </h3>
                <p id="video-add" className="hide-element">
                  <b>Please Wait while your video is being uploaded. This can
                  take a few minutes.
                  </b>
                </p>
                <LoadingAnimation />
                <input id="upload-file" type="file" name="videoFile" onChange={this.changeUploadState} />
                <input id="upload-submit" type="submit" value="Upload" />
                <p id="video-error" className="email-warning"> The file type is not supported! </p>
                <p id="video-size" className="email-warning">Videofile exceeds {maxVideoSize}</p>
              </form>
            </div>
          </div>
          <AccountVideos />
        </div><br /><br /><br />
        <Footer />
      </div>
    );
  }
}
