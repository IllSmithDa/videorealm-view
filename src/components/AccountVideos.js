import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Player, BigPlayButton } from 'video-react';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';
import '../CSS/VideoLayout.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class AccountVideos extends Component {
  constructor() {
    super();
    this.state = {
      videoList: [],
      index: 0,
      loginState:true
    }
  }
  componentDidMount() {

    axios.get(`${reqURL}/getVideoList`)
      .then(data => {
        console.log(data.data);
        if (data.data.error) {
          this.setState({ loginState: false})
        } else {
          let videoList = []
          for (let i = 0; i < data.data.length; i++) {
              videoList.push(data.data[i]);
          }
          this.setState({videoList: videoList, loginState: true });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return(
      <div className="video-container">
         {this.state.videoList.map((post, index) => {
            return (
              <div key = {post.id} className = "video-key"> 
                <Link to={`/video/${post.videoID}`} className = "video-div"> 
                  <Player src = {post.videoURL} >
                    <BigPlayButton position="center" />
                  </Player>
                  <p className  = "video-videoName" >{post.videoName} </p>
                </Link>
              </div>
            ); 
          })}
      </div>
    );
    
  }
}
