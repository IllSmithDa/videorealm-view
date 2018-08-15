import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Player, BigPlayButton } from 'video-react';
import reqURL from './RequestURL';
import '../CSS/PageLayout.css';
import '../CSS/VideoLayout.css';

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

  render() {
    const { videoList } = this.state;
    return (
      <div className="video-container">
        {videoList.map((post) => {
          return (
            <div key={post.id} className="video-key">
              <Link to={`/video/${post.videoID}`} className="video-div">
                <img src={post.videoThumbURL} alt="video-thumb" className="video-preview-item" />
                <p className="video-videoName">
                  {post.videoName}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
