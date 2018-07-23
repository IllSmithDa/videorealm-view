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
        console.log('videoData id', videoData.data._id);
        this.state.videoURL = videoData.data.videoURL;
        this.setState({ videoID: videoData.data.videoID, videoName: videoData.data.videoName, videoUploader: videoData.data.userName, 
          views: videoData.data.views, videoThumbnail: videoData.data.videoThumbURL });
          console.log('videoName', this.state.videoName);
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
        
          <h1>{this.state.videoName} </h1>

          <Player 
            fluid={false}
            width={800}
            height={600}
            src={this.state.videoURL}
          >
            <BigPlayButton position="center" />
          </Player>

          <h3>{this.state.videoUploader}</h3>
          
          <CommentList/>
        </div>
      </div>
    );
  }
}