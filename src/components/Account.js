import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import reqURL from './RequestURL';
import UserVideoList from './UserVideoList';
import DeleteVideos from './DeleteVideos';
import '../CSS/PageLayout.css';

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      videoName: '',
      videoRequest: '',
      videoUploadReq: `${reqURL}/uploadVideo`,
      userVideoName: '',
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
  componentDidMount() {
    axios.get(`${reqURL}/getVideoList`)
      .then(data => {
        if (data.data.length >= 5) {
          let warningDoc = document.getElementById('videoWarning');
          warningDoc.style.display = 'block';
        }
      })
      .catch(err => {
        throw err;
      })
  }

  render() {
    return(
      <div>
        <Navbar />
        <div class = 'Page-Container'>
          <h1 className = 'accountTitle app-title-item'>Your Videos</h1>
          <div className ='group-button'>
            <button id="myBtn2" className ='button-item' onClick={this.openModal}> Upload Video </button>
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
                    <input tupe= 'text' name='videoName' onChange = {this.handleVideoName}/>
                </h3>
                <input type="file" name="videoFile" onChange = {this.setTimer}/>
                <input className='upload-button' type='submit' value='Upload'/>
                
              </form> 
            </div>
          </div>
          <UserVideoList/>
        </div>
      </div>
    );
  }
}