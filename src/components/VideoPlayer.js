import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import CommentList from './CommentList';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';
import '../CSS/VideoLayout.css';
import '../../node_modules/video-react/dist/video-react.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;
export default class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      videoID: '',
      videoName: '',
      videoUploader: '',
      videoURL: `https://s3.amazonaws.com/my.unique.bucket.uservideos/${(window.location.href).split('/').pop()}`,
      views: null,
      videoThumbnail: '',
      uploaderProfileName: '',
    };
  }

  componentDidMount() {
    // set default slider at 0.
    //  const seekSlider = document.getElementById("seek-bar");
    // seekSlider.value = 0;
    // grabs the current url
    let getID = window.location.href;
    // grabs username inside current url
    getID = getID.split('/').pop();
    // console.log(getID);
    const videoID = { videoID: getID };
    axios
      .post(`${reqURL}/getVideo`, videoID)
      .then((videoData) => {
        if (videoData.data.error) {
          window.location = '/errorpage';
        } else {
          this.setState({
            videoID: videoData.data.videoID,
            videoName: videoData.data.videoName,
            videoUploader: videoData.data.userName[0].toUpperCase() + videoData.data.userName.slice(1),
            views: videoData.data.views,
            videoThumbnail: videoData.data.videoThumbURL,
            videoURL: videoData.data.videoURL,
            uploaderProfileName: videoData.data.userName,
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  }
  /*
  playVideo = () => {
    let videoDoc = document.getElementById('video-player');
    let playButton = document.getElementById("play-pause");
    if (videoDoc.paused) {
      //play video and change text to Pause
      videoDoc.play();
      playButton.src =  require('./assets/pausebutton.png');
    }
    else {
      videoDoc.pause();
      playButton.src =  require('./assets/playbutton2.png');
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
      playButton.src =  require('./assets/playbutton2.png');
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
      muteButton.src = require('./assets/mutebutton.png')
    } else {
      videoDoc.muted = true;
      muteButton.src =  require('./assets/unmutebutton.png')
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
*/

  render() {
    const { videoURL } = this.state;
    const { videoName } = this.state;
    const { uploaderProfileName } = this.state;
    const { videoUploader } = this.state;
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h1 className="video-title"><b>{ videoName }</b> </h1>
          <div>
            <video id="video-player" className="video-player-item" controls controlsList="nodownload"/* onTimeUpdate={this.updateVideoSeek} */>
              <source src={videoURL} type="video/mp4" />
              <source src={videoURL} type="video/mov" />
            </video>
          </div>
          <Link to={`/profile/${uploaderProfileName}`}>
            <h4 className="video-uploader text-items">{videoUploader}</h4>
          </Link>
          <CommentList />
        </div>
      </div>
    );
  }
}

/*  Custom controls test
<div id="video-controls" className='video-control-container'>
  <img
    src={ require('./assets/playbutton2.png') }
    alt='play-button' className='play-icon'
    onClick={this.playVideo}
    id="play-pause"
  />
  <input  className='video-seek-bar' onInput={this.seekVideo} type="range" id="seek-bar" />
  <span
    id="curtimetext"
    className='video-current-time'
  >
    <b>00:00</b></span><span className='time-divde'><b> / </b>
  </span>
    <span id="durtimetext" className='video-total-time'><b>00:00</b></span>
  <img
    src={ require('./assets/mutebutton.png') }
    className='mute-icon' id="mute-button"
    onClick={this.muteVideo}/>
  <input
    className='volumne-slider-item'
    onInput={this.volumeChange}
    type="range"
    id="volume-slider"
    min="0"
    max="100"
    step="1"
  />
  <img
    src={ require('./assets/fullscreenbtn.png') }
    className='fullscreen-icon'
    id="full-screen"
    onClick={this.fullScreenMode}
  />
</div>
*/
