import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CommentList from '../CommentSection/CommentList';
import reqURL from '../RequestURL';
import './VideoPage.css';

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
      videoDate: '',
      videoThumbnail: '',
      uploaderProfileName: '',
      startTime: 0,
      updateTime: 0,
      hasVideoViewed: false,
    };
  }

  componentDidMount() {
    // set default slider at 0.
    const seekSlider = document.getElementById('seek-bar');
    seekSlider.value = 0;
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
            videoDate: videoData.data.videoDate,
            videoURL: videoData.data.videoURL,
            uploaderProfileName: videoData.data.userName,
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  componentDidUpdate() {
    let startTime = 0;
    let updateTime = 0;
    let timewatching = 0;
    let totalTimeWatched = 0;
    let hasVideoViewed = false;

    const videoDoc = document.getElementById('video-player');
    document.getElementById('timeupdate');

    videoDoc.addEventListener('timeupdate', () => {
      updateTime = videoDoc.currentTime;
      timewatching = (updateTime - startTime);
    });
    videoDoc.addEventListener('play', () => {
      startTime = videoDoc.currentTime;
    });
    videoDoc.addEventListener('pause', () => {
      totalTimeWatched += timewatching;
      if ((totalTimeWatched >= videoDoc.duration - 1 || totalTimeWatched >= 20) && (!hasVideoViewed)) {
        this.updateViewCounter();
        hasVideoViewed = true;
      }
    });
  }

  updateViewCounter = () => {
    const { videoID, uploaderProfileName } = this.state;
    const videoInfo = { videoID, videoUploader: uploaderProfileName };
    axios.post(`${reqURL}/viewUpdate`, videoInfo)
      .then(() => {
        this.setState({ hasVideoViewed: true });
      })
      .catch((err) => {
        throw err;
      });
  }

  playVideo = () => {
    const videoDoc = document.getElementById('video-player');
    const playButton = document.getElementById('play-pause');
    if (videoDoc.paused) {
      // play video and change text to Pause
      videoDoc.play();
      playButton.src = require('../assets/pause.png');
    } else {
      videoDoc.pause();
      playButton.src = require('../assets/playButton.png');
    }
  }

  seekVideo = () => {
    // moves seeker to where your mouse clicks on the input range
    const videoDoc = document.getElementById('video-player');
    const seekSlider = document.getElementById('seek-bar');
    const seekTo = videoDoc.duration * (seekSlider.value / 100);
    videoDoc.currentTime = seekTo;
  }

  updateVideoSeek = () => {
    // causes the seeker to move in time with the video time
    const videoDoc = document.getElementById('video-player');
    const seekSlider = document.getElementById('seek-bar');
    const curtimetext = document.getElementById('curtimetext');
    const durtimetext = document.getElementById('durtimetext');

    // Calculate the slider value
    const value = (100 / videoDoc.duration) * videoDoc.currentTime;

    // Update the slider value
    seekSlider.value = value;

    // show time to the user
    let currentMins = Math.floor(videoDoc.currentTime / 60);
    let currentSecs = Math.floor(videoDoc.currentTime - currentMins * 60);
    let durmins = Math.floor(videoDoc.duration / 60);
    let dursecs = Math.floor(videoDoc.duration - durmins * 60);

    if (currentSecs < 10) { currentSecs = '0' + currentSecs; }
    if (dursecs < 10) { dursecs = '0' + dursecs; }
    if (currentMins < 10) { currentMins = '0' + currentMins; }
    if (durmins < 10) { durmins = '0' + durmins; }
    curtimetext.innerHTML = currentMins + ':' + currentSecs;
    durtimetext.innerHTML = durmins + ':' + dursecs;

    const playButton = document.getElementById('play-pause');
    if (curtimetext.innerHTML === durtimetext.innerHTML) {
      // sets seeker back to beginning of video and turns pause into play
      playButton.src = require('../assets/playButton.png');
      seekSlider.value = 0;
    }
  }

  volumeChange = () => {
    const videoDoc = document.getElementById('video-player');
    const volumeslider = document.getElementById('volume-slider');
    videoDoc.volume = volumeslider.value / 100;
  }

  muteVideo = () => {
    const videoDoc = document.getElementById('video-player');
    const muteButton = document.getElementById('mute-button');
    if (videoDoc.muted) {
      videoDoc.muted = false;
      muteButton.src = require('../assets/muteOff.png');
    } else {
      videoDoc.muted = true;
      muteButton.src = require('../assets/muteOn.png');
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
    const { videoURL, videoName, videoDate, uploaderProfileName, videoUploader, views } = this.state;
    return (
      <div>
        <Navbar />
        <div className="video-page-container">
          <div>
            <video
              id="video-player"
              onClick={this.playVideo}
              className="video-player-item"
              controlsList="nodownload"
              preload="metadata"
              onTimeUpdate={this.updateVideoSeek /*  controls */}
            >
              <source src={videoURL} type="video/mp4" />
              <source src={videoURL} type="video/mov" />
            </video>
            <div id="video-controls" className="video-control-container">
              <img
                src={require('../assets/playButton.png')}
                alt="play-button"
                className="play-icon"
                onClick={this.playVideo}
                id="play-pause"
              />
              <div>
                <div className="control-block">
                  <input onInput={this.seekVideo} type="range" id="seek-bar" />
                </div>
              </div>
              <div>
                <div className="time-block">
                  <span id="curtimetext">00:00</span>
                  <span>/</span>
                  <span id="durtimetext">00:00</span>
                </div>
              </div>
              <img
                src={require('../assets/muteOff.png')}
                className="mute-icon"
                alt="mute-button"
                id="mute-button"
                onClick={this.muteVideo}
              />
              <div>
                <div className="volume-container">
                  <input
                    onInput={this.volumeChange}
                    type="range"
                    id="volume-slider"
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
              </div>
              <img
                src={require('../assets/fullscreenbtn.png')}
                alt="fullscreen-button"
                className="fullscreen-icon"
                id="full-screen"
                onClick={this.fullScreenMode}
              />
            </div>
          </div>
          <div>
          <h1 className="video-title"><b>{ videoName }</b> </h1>
            <Link className="profile-link-container" to={`/profile/${uploaderProfileName}`}>
              <span>{videoUploader}</span>
            </Link>
            <p className="video-date-item"> Published on {videoDate} </p>
            <p className="video-view-counter"> {views} views </p>
          </div>
          <div className="comment-comp-container">
            <CommentList videoUploader={uploaderProfileName} />
          </div>
        </div>
        <div className="footer-comp-container">
          <Footer />
        </div>
      </div>
    );
  }
}
