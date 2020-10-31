import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Player, BigPlayButton } from 'video-react';
import reqURL from '../RequestURL';
import './UserVideoList.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class UserVideoList extends Component {
  constructor() {
    super();
    this.state = {
      videoList: [],
      loginState: true,
    };
  }

  componentDidMount() {
    let getUsername = window.location.href;
    // grabs username inside current url
    getUsername = getUsername.split('/').pop();
    // console.log(getUsername);
    const username = { username: getUsername };
    axios.post(`${reqURL}/checkUsername`, username)
      .then((userData) => {
        if (userData.data.success) {
          window.location = '/errorpage';
        } else {
          axios.post(`${reqURL}/postVideoList`, username)
            .then((data) => {
              // console.log(data.data);
              if (data.data.error) {
                this.setState({ loginState: false });
              } else {
                const videoList = [];
                for (let i = 0; i < data.data.length; i += 1) {
                  videoList.push(data.data[i]);
                }
                this.setState({ videoList, loginState: true });
              }
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  }
  goToLink = (link) => {
    window.location.href = link;
  }
  render() {
    const { videoList } = this.state;
    return (
      <div className="user-video-container">
        {videoList.map((post) => {
          return (
            <div key={post.id} className="user-video-item">
              <img src={post.videoThumbURL} alt="video-thumb" onClick={() => { this.goToLink(`/video/${post.videoID}`)}}/>
              <div>
                <span onClick={() => { this.goToLink(`/video/${post.videoID}`)}}>{ post.videoName } </span>
              </div>
              <div>
                <span onClick={() => { this.goToLink(`/profile/${post.userName}`)}}> {post.userName[0].toUpperCase() + post.userName.slice(1)}</span>
              </div> 
            </div>
          );
        })}
      </div>
    );
  }
}
