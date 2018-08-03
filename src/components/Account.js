import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
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
      videoName: '',
      videoRequest: '',
      videoUploadReq: `${reqURL}/uploadVideo`,
      userVideoName: '',
      loginState: true,
      fileName: ''
    }
  }

  openModal = () => {
    let modal = document.getElementById('myModal');
    modal.style.display = "block";
  }
  closeModal = () => {
    let modal = document.getElementById('myModal');
    modal.style.display = "none";
  }
  setTimer = () => {
    window.setTimeout(() => {
      console.log('image loaded')
    }, 5000 )
  };
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
          console.log('hello')
          document.getElementById('deleteFailure').style.display = 'block';
        } else {
          window.location = `/`;
        }
      })
      .catch(err => {
        throw err;
      })
  }
  changeUploadState = (event) => {
    this.setState({ fileName: event.target.value });
  }
  componentDidUpdate() {
    if (this.state.fileName !== '' && this.state.userVideoName !== '') {
      document.getElementById('upload-submit').disabled = false;
    } else {
      document.getElementById('upload-submit').disabled = true;
    }
  }
  componentDidMount() {
    document.getElementById('deleteFailure').style.display = 'none';
    document.getElementById('upload-submit').disabled = true;
    axios.get(`${reqURL}/getVideoList`)
      .then(data => {
        if (data.data.error) { 
          this.setState({ loginState: false })
        } else {
          this.setState({ loginState: true })
          console.log(data.data.length);
          if (data.data.length >= 5) {
            let warningDoc = document.getElementById('videoWarning');
            warningDoc.style.display = 'block';
          } else {
            document.getElementById('videoWarning').style.display = 'none';
          }
        }
      })
      .catch(err => {
        throw err;
      })
  }

// <button className='all-buttons' onClick={this.openWarning}>Delete my account </button>
  render() {
    if ( !this.state.loginState ) {
      window.location = '/login';
    } else {
      return(
        <div>
          <Navbar />
          <div class = 'Page-Container'>
            <h1 className = 'accountTitle app-title-item'>Your Account</h1>
            <p id = 'deleteFailure' className='email-Warning'> <br/><b>Warning: failed to Delete Account</b></p>
            <div id="warningModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={this.closeDeleteModal}>&times;</span>
                <h2> Warning: You will lose all your data including profile picture and videos. Do you wish to Delete your account?</h2><br/>
                <div>
                <button className='all-buttons button-size' onClick={this.finalDeleteUser}>Yes</button> 
                <button className='all-buttons button-size' onClick={this.closeDeleteModal}>No</button>
                </div>
              </div>
            </div>
            <h1 className = 'accountTitle app-title-item'>Your Videos</h1>
            <div className ='group-button'>
              <button id="myBtn2" className ='button-item all-buttons' onClick={this.openModal}> Upload Video </button>
              <DeleteVideos deleteVideoList={this.state.videoList} />
            </div>
            <p id = 'videoWarning' className='email-Warning'> <b>Notice: You have reached the maximum number of videos allowed on this account! Delete
              existing video(s) to add new ones.</b></p>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={this.closeModal}>&times;</span>
                <h1 className = 'upload-title'>Upload Video Here</h1>
                <form ref='uploadForm' 
                  id='uploadForm' 
                  action= {this.state.videoUploadReq}
                  method='post' 
                  encType="multipart/form-data">
                   <h3 className='video-name'> {'Enter Video Name: '}
                      <input  className='video-name-input' type= 'text' name='videoName' onChange = {this.handleVideoName}/>
                  </h3>
                  <input type="file" name="videoFile" onChange = {this.changeUploadState}/>
                  <input id='upload-submit' className='upload-button' type='submit' value='Upload'/>
                  
                </form> 
              </div>
            </div>
            <AccountVideos/>
          </div>
        </div>
      );
    }
  }
}