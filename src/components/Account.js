import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import reqURL from './RequestURL';
import AccountVideos from './AccountVideos';
import DeleteVideos from './DeleteVideos';
import '../CSS/PageLayout.css';
import '../CSS/VideoLayout.css';
// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      videoUploadReq: `${reqURL}/uploadVideo`,
      userVideoName: '',
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
    document.getElementById('deleteFailure').style.display = 'none';
    document.getElementById('upload-submit').disabled = true;
    axios.get(`${reqURL}/getUsername`)
      .then((userData) => {
        console.log(userData.data);
        this.setState({
          username: userData.data,
          displayName: userData.data[0].toUpperCase() + userData.data.slice(1),
        });
        axios.get(`${reqURL}/getVideoList`)
          .then((data) => {
            if (data.data.error) {
              this.setState({ loginState: false });
            } else {
              this.setState({ loginState: true });
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
    const { fileName, userVideoName } = this.state;
    if (fileName !== '' && userVideoName !== '') {
      document.getElementById('upload-submit').disabled = false;
    } else {
      document.getElementById('upload-submit').disabled = true;
    }
  }

  getVideoList = () => {
    const { getVideoList } = this.state;
    return getVideoList;
  }

  openModal = () => {
    document.getElementById('myModal').style.display = 'block';
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
  }

  changeUploadState = (event) => {
    this.setState({ fileName: event.target.value });
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

    if (newUsername.length < 3 || /\W/.test(newUsername) || /\s/.test(newUsername)) {
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
        || !/[a-zA-Z]/.test(newPassword)) {
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
    const { videoUploadReq, loginState, displayName } = this.state;
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
          <button type="submit" className="add-margins all-buttons" onClick={this.openUsernameModal}>Change Username </button>
          <button type="submit" className="add-margins all-buttons" onClick={this.openPasswordModal}>Change Password </button>
          <button type="submit" className="add-margins all-buttons" onClick={this.openWarning}>Delete my account </button>
          <p id="paswordSuccess" className="add-margins email-warning"> <b>Password Sucessfully Changed!</b></p>
          <p id="deleteFailure" className="email-Warning"> <br /><b>Warning: failed to Delete Account</b></p>
          <div id="warningModal" className="modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="close" onClick={this.closeDeleteModal}>&times;</span>
              <h2>
                Warning: You will lose all your data including profile picture and videos.
                Do you wish to Delete your account?
              </h2>
              <br />
              <div>
                <button type="submit" className="all-buttons button-size" onClick={this.finalDeleteUser}>Yes</button>
                <button type="submit" className="all-buttons button-size" onClick={this.closeDeleteModal}>No</button>
              </div>
            </div>
          </div>
          <div id="usernameModal" className="modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="close" onClick={this.closeUserModal}>&times;</span>
              <h2>
                Enter a new uername
              </h2>
              <p> Must be at least 3 characters long and must contain at least one letter and no special characters</p>
              <input className="video-name-input" type="text" name="videoName" onChange={this.handleNewUsername} />
              <p id="repUsername" className="email-warning"> <b>Username already exists </b></p>
              <p id="badUsername" className="email-warning"> <b>Invalid username</b></p>
              <div>
                <br />
                <button type="submit" className="all-buttons button-size" onClick={this.cancelUsername}>Cancel</button>
                <button type="submit" className="all-buttons button-size" onClick={this.submitNewUsername}>Submit</button>
              </div>
            </div>
          </div>
          <div id="passwordModal" className="modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="close" onClick={this.closePasswordModal}>&times;</span>
              <h2>
                Enter a new password
              </h2>
              <p> Must be 8 to 20 characters long with at least 1 letter, 1 number, 1 special character and must different from your current
                password
              </p>
              <b>Current Password:</b><input className="video-name-input" type="password" name="videoName" onChange={this.handleOldPassword} />
              <p id="incorrectPW" className="email-warning"><b> Error: Password is not correct</b></p><br />

              <b>New Password:</b><input className="video-name-input" type="password" name="videoName" onChange={this.handleNewPassword} /><br />
              <b>Confirm New Password:</b> <input className="video-name-input" type="password" name="videoName" onChange={this.handleRepeatPassword} />
              <p id="badPW" className="email-warning"> <b>Error: The password does not meet criteria</b></p>
              <p id="noMatchPW" className="email-warning"> <b>Error: The passwords do not match</b></p><br />
              <div>
                <br />
                <button type="submit" className="all-buttons button-size" onClick={this.closePasswordModal}>Cancel</button>
                <button type="submit" className="all-buttons button-size" onClick={this.submitNewPassword}>Submit</button>
              </div>
            </div>
          </div>
          <h1 className="accountTitle app-title-item">{displayName}&apos;s Videos</h1>
          <div className="group-button">
            <button id="myBtn2" type="submit" className="add-margins button-item all-buttons" onClick={this.openModal}> Upload Video </button>
            <DeleteVideos deleteVideoList={this.getVideoList} />
          </div>
          <p id="videoWarning" className="email-Warning">
            <b>Notice: You have reached the maximum number of videos allowed on this account! Delete
              existing video(s) to add new ones.
            </b>
          </p>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span role="button" tabIndex="-1" className="close" onClick={this.closeModal}>&times;</span>
              <h1 className="upload-title">Upload Video Here</h1>
              <form
                id="uploadForm"
                action={videoUploadReq}
                method="post"
                encType="multipart/form-data"
              >
                <h3 className="video-name"> {'Enter Video Name: '}
                  <input className="video-name-input" type="text" name="videoName" onChange={this.handleVideoName} />
                </h3>
                <p id="image-update"> Please Wait when your video is being uploaded. </p><br />
                <input id="upload-file" type="file" name="videoFile" onChange={this.changeUploadState} />
                <input id="upload-submit" className="upload-button" type="submit" value="Upload" />
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
