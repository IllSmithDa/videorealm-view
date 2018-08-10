import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import { connect } from 'react-redux';
import { getAllVideos } from '../actions';
import reqURL from './RequestURL';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class PopularVideos extends Component {
  constructor() {
    super();
    this.state = {
      videoIndex: 0,
      totalArr: [],
      reachedEnd: false,
    };
  }

  componentDidMount() {
    const { videoIndex, reachedEnd } = this.state;
    const index = { index: videoIndex, reachedEnd };
    // calls action to get all videos
    axios.post(`${reqURL}/getPopularVideos`, index)
      .then((videoData) => {
        this.setState({
          videoIndex: videoIndex + 5,
          totalArr: videoData.data.videoArr,
          reachedEnd: videoData.data.reachedEnd,
        });
        //  console.log(videoData.data.reachedEnd);
        // console.log(videoData.data.videoArr.length % 5);
        if (videoData.data.videoArr.length % 5 === 0 && !videoData.data.reachedEnd) {
          document.getElementById('more-pop-videos').style.display = 'block';
        } else {
          document.getElementById('more-pop-videos').style.display = 'none';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  seeMoreVideos = () => {
    const { videoIndex, totalArr, reachedEnd } = this.state;
    const index = { index: videoIndex, reachedEnd };
    // calls action to get all videos
    axios.post(`${reqURL}/getPopularVideos`, index)
      .then((videoData) => {
        this.setState({
          videoIndex: videoIndex + 5,
          totalArr: totalArr.concat(videoData.data.videoArr),
          reachedEnd: videoData.data.reachedEnd,
        });
        if (totalArr.length % 5 === 0 && !videoData.data.reachedEnd) {
          document.getElementById('more-pop-videos').style.display = 'block';
        } else {
          document.getElementById('more-pop-videos').style.display = 'none';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { totalArr } = this.state;
    return (
      <div>
        <div className="video-container">
          {totalArr.map((post) => {
            return (
              <div key={post.id} className="video-key">
                <Link to={`/video/${post.videoID}`} className="video-div">
                  <Player src={post.videoURL}>
                    <BigPlayButton position="center" preload="none" />
                  </Player>
                  <span className="video-videoName">{ post.videoName } </span>
                  <br />
                </Link>
                <Link to={`/profile/${post.userName}`}>
                  <span>{post.userName[0].toUpperCase() + post.userName.slice(1)}</span>
                </Link>
              </div>
            );
          })}
          <p id="more-pop-videos" className="more-videos-item" onClick={this.seeMoreVideos}> See More videos </p>
        </div>
      </div>
    );
  }
}
