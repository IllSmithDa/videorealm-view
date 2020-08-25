import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import { connect } from 'react-redux';
// import { getAllVideos } from '../../actions';
import reqURL from '../RequestURL';
import './PopularVideos.css';

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
          videoIndex: videoIndex + 4,
          totalArr: videoData.data.videoArr,
          reachedEnd: videoData.data.reachedEnd,
        });
        //  console.log(videoData.data.reachedEnd);
        // console.log(videoData.data.videoArr.length % 5);
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
          videoIndex: videoIndex + 4,
          totalArr: totalArr.concat(videoData.data.videoArr),
          reachedEnd: videoData.data.reachedEnd,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { totalArr } = this.state;
    return (
      <div>
        <div className="pop-video-container">
          {totalArr.map((post) => {
            return (
              <div key={post.id} className="video-item">
                <Link to={`/video/${post.videoID}`}>
                  <img src={post.videoThumbURL} alt="video-thumb" />
                  <div className="video-header">
                    <span>{ post.videoName } </span>
                  </div>
                </Link>
                <Link to={`/profile/${post.userName}`}>
                  <span>{post.userName[0].toUpperCase() + post.userName.slice(1)}</span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="more-pop-videos">
          <span role="button" tabIndex="0" onClick={this.seeMoreVideos}> See More videos </span>
        </div>
      </div>
    );
  }
}
