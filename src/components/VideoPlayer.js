import React, { Component } from 'react';
import { Player, BigPlayButton, } from 'video-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CommentList from '../components/CommentList';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css'
import '../CSS/VideoLayout.css'
import '../../node_modules/video-react/dist/video-react.css' // import css

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;
export default class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      videoID:'',
      videoName: '',
      videoUploader: '',
      videoURL: `https://s3.amazonaws.com/my.unique.bucket.uservideos/${ (window.location.href).split("/").pop() }`,
      views: null,
      videoThumbnail: '',
    }
  }
  componentDidMount() {
    
    // set default slider at 0. 
    const seekSlider = document.getElementById("seek-bar");
    seekSlider.value = 0;
    // grabs the current url
    let getID = window.location.href;
    // grabs username inside current url 
    getID = getID.split("/").pop();
    console.log(getID);
    let videoID = { videoID: getID };
    axios
      .post(`${reqURL}/getVideo`, videoID)
      .then((videoData) => {
        this.setState({ videoID: videoData.data.videoID, videoName: videoData.data.videoName, 
          videoUploader: videoData.data.userName[0].toUpperCase() + videoData.data.userName.slice(1), 
          views: videoData.data.views, videoThumbnail: videoData.data.videoThumbURL,
          videoURL: videoData.data.videoURL });
      })
      .catch((err) => {
        console.log(err);
      })
  }
  playVideo = () => {
    let videoDoc = document.getElementById('video-player');
    let playButton = document.getElementById("play-pause");
    if (videoDoc.paused) {
      //play video and change text to Pause
      videoDoc.play();
      playButton.innerHTML = 'Pause';
    }
    else {
      videoDoc.pause();
      playButton.innerHTML = 'Play';
    }
  }
  seekVideo = () => {
    // moves seeker to where your mouse clicks on the input range
    const videoDoc = document.getElementById('video-player');
    const seekSlider = document.getElementById("seek-bar");
    const seekTo = videoDoc.duration * (seekSlider.value/100);
    videoDoc.currentTime = seekTo;
  }
  updateVideoSeek = () => {
    // causes the seeker to move in time with the video time
    const videoDoc = document.getElementById('video-player');
    const seekSlider = document.getElementById("seek-bar");
    const curtimetext = document.getElementById("curtimetext");
    const durtimetext = document.getElementById("durtimetext");

    // Calculate the slider value
    const value = (100 / videoDoc.duration) * videoDoc.currentTime;
    
    // Update the slider value
    seekSlider.value = value;

    // show time to the user
    let currentMins = Math.floor(videoDoc.currentTime / 60);
	  let currentSecs = Math.floor(videoDoc.currentTime - currentMins * 60);
	  let durmins = Math.floor(videoDoc.duration / 60);
    let dursecs = Math.floor(videoDoc.duration - durmins * 60);
    
	  if(currentSecs < 10){ currentSecs = "0"+currentSecs; }
	  if(dursecs < 10){ dursecs = "0"+dursecs; }
	  if(currentMins < 10){ currentMins = "0"+currentMins; }
	  if(durmins < 10){ durmins = "0"+durmins; }
	  curtimetext.innerHTML = currentMins+":"+currentSecs;
    durtimetext.innerHTML = durmins+":"+dursecs;

    let playButton = document.getElementById("play-pause");
    if(curtimetext.innerHTML === durtimetext.innerHTML) {
      // sets seeker back to beginning of video and turns pause into play
      playButton.innerHTML = 'Play';
      seekSlider.value = 0;
    }
  }
  volumeChange = () => {
    const videoDoc = document.getElementById('video-player');
    const volumeslider = document.getElementById("volume-slider");
    videoDoc.volume = volumeslider.value / 100;
  }
  muteVideo = () => {
    const videoDoc = document.getElementById('video-player');
    const muteButton = document.getElementById('mute-button');
    if (videoDoc.muted) {
      videoDoc.muted = false;
      muteButton.innerHTML = 'Mute';
    } else {
      videoDoc.muted = true;
      muteButton.innerHTML = 'Unmute';
    }
  }
  fullScreenMode = () => {
    const videoDoc = document.getElementById('video-player');
    if (videoDoc.requestFullScreen) {
      videoDoc.requestFullScreen();
    }  
    if (videoDoc.webkitRequestFullScreen) {
      videoDoc.webkitRequestFullScreen();
    }
    if (videoDoc.mozRequestFullScreen) {
      videoDoc.mozRequestFullScreen();
    }
  }

  render() {
    return(
      <div>
        <Navbar/>
        <div className='Page-Container'>
          <h1 className='video-title text-items'><b>{this.state.videoName}</b> </h1>
          <div className='video-container'>
            <video id='video-player' className='video-player-item' onTimeUpdate={this.updateVideoSeek}>
              <source src={this.state.videoURL} type="video/mp4" />
              <source src={this.state.videoURL} type="video/mov" />
            </video>
            <div id="video-controls" className='video-control-container'>
              <img src='C:\Users\Samuel Kim\Documents\Lambda School\friendrealm-view\src\components\assets\playbutton2.png' className='play-icon' onClick={this.playVideo} id="play-pause"/>
              <input  className='video-seek-bar' onInput={this.seekVideo} type="range" id="seek-bar" />
              <span id="curtimetext">00:00</span> / <span id="durtimetext">00:00</span>
              <button type="button" id="mute-button" onClick={this.muteVideo}>Mute</button>
              <input onInput={this.volumeChange}  type="range" id="volume-slider" min="0" max="100" step="1" />
              <button type="button" id="full-screen" onClick={this.fullScreenMode}>[]</button>
              
            </div>
          </div>
          <h4 className='video-uploader text-items'>{this.state.videoUploader}</h4>
          <CommentList/>
        </div>
      </div>
    );
  }
}
/* old video player 

<Player
  fluid={false}
  width='100%'
  height='50%'
  src={this.state.videoURL}
>
  <BigPlayButton position="center" />
</Player> 
*/