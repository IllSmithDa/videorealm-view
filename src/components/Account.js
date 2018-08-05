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
    };
  }

  componentDidMount() {
    document.getElementById('deleteFailure').style.display = 'none';
    document.getElementById('upload-submit').disabled = true;
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
  }

  componentDidUpdate() {
    const { fileName } = this.state;
    const { userVideoName } = this.state;
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

  // <button className='all-buttons' onClick={this.openWarning}>Delete my account </button>
  render() {
    const { videoUploadReq, loginState } = this.state;
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
          <h1 className="accountTitle app-title-item">Your Account</h1>
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
          <h1 className="accountTitle app-title-item">Your Videos</h1>
          <div className="group-button">
            <button id="myBtn2" type="submit" className="button-item all-buttons" onClick={this.openModal}> Upload Video </button>
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
                <p id="image-update"> Please Wait when your video is being uploaded. </p>
                <input type="file" name="videoFile" onChange={this.changeUploadState} />
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
