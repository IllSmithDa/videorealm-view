import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import axios from 'axios';
import reqURL from './RequestURL';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class AllVideos extends Component {
  constructor() {
    super();
    this.state = {
      videoList: [],
    }
  }
  componentDidMount() {
    axios.get(`${reqURL}/getAllVideos`)
      .then((videoData) => {
        this.setState({ videoList: videoData.data });
        console.log(this.state.videoList);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    return(
      <div>
        <h1> Latest Videos </h1>
        <div className="video-container">
          {this.state.videoList.map((post, index) => {
            return (
              <div key = {post.id} className = "video-key"> 
                <Link to={`/video/${post.videoID}`}className = "video-div"> 
                  <Player src = {post.videoURL} >
                    <BigPlayButton position="center" />
                  </Player>
                  <p className  = "video-videoName" >{post.videoName}</p>
                  <p className = "video-channelName"> channel: {post.userName}</p>  
                </Link>
              </div>
            ); 
          })}
        </div>
      </div>
    )
  }
}
//     <img src = {post.videoThumbURL} alt="thumbnail_photo" width = '222' height = '150' />