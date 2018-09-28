import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
      loginState: true,
    };
  }

  componentWillMount() {
    axios.get(`${reqURL}/getVideoList`)
      .then((data) => {
        const videoList = [];
        for (let i = 0; i < data.data.length; i += 1) {
          videoList.push(data.data[i]);
        }
        this.setState({ videoList });
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
                <p className="video-videoName">{post.videoName} </p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
