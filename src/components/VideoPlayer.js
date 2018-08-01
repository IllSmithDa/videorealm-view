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
        console.log('size', document.documentElement.clientWidth);
        console.log('size', document.documentElement.clientHeight);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return(
      <div>
        <Navbar/>
        <div className='Page-Container'>

          <h1 className = 'video-title'><b>{this.state.videoName}</b> </h1>
          <div className = 'video-container'>
            <Player
              fluid={false}
              width='100%'
              height={document.documentElement.clientHeight/1.475}
              src={this.state.videoURL}
            >
              <BigPlayButton position="center" />
            </Player>
          </div>
          <h3 className = 'video-uploader'>{this.state.videoUploader}</h3>
          
          <CommentList/>
        </div>
      </div>
    );
  }
}