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

export default class AllVideos extends Component {
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
    axios.post(`${reqURL}/getAllVideos`, index)
      .then((videoData) => {
        this.setState({
          videoIndex: videoIndex + 5,
          totalArr: videoData.data.videoArr,
          reachedEnd: videoData.data.reachedEnd,
        });
        //  console.log(videoData.data.reachedEnd);
        // console.log(videoData.data.videoArr.length % 5);
        if (videoData.data.videoArr.length % 5 === 0 && !videoData.data.reachedEnd) {
          document.getElementById('more-videos').style.display = 'block';
        } else {
          document.getElementById('more-videos').style.display = 'none';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  seeMoreVideos = () => {
    const { videoIndex, totalArr } = this.state;
    const index = { index: videoIndex };
    // calls action to get all videos
    axios.post(`${reqURL}/getAllVideos`, index)
      .then((videoData) => {
        this.setState({
          videoIndex: videoIndex + 5,
          totalArr: totalArr.concat(videoData.data.videoArr),
          reachedEnd: videoData.data.reachedEnd,
        });
        if (totalArr.length % 5 === 0 && !videoData.data.reachedEnd) {
          document.getElementById('more-videos').style.display = 'block';
        } else {
          document.getElementById('more-videos').style.display = 'none';
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
                  <video preload="metadata" width="225" height="225">
                    <source src={post.videoURL} type="video/mp4" />
                  </video>
                  <p className="video-videoName">{ post.videoName } </p>
                </Link>
                <Link to={`/profile/${post.userName}`}>
                  <span>{post.userName[0].toUpperCase() + post.userName.slice(1)}</span>
                </Link>
              </div>
            );
          })}
          <p id="more-videos" className="more-videos-item" onClick={this.seeMoreVideos}> See More videos </p>
        </div>
      </div>
    );
  }
}

/*
AllVideos.defaultProps = {
  videoList: [],
  getAllVideos: () => {},
};

AllVideos.propTypes = {
  videoList: PropTypes.array,
  getAllVideos: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    videoList: state.videoList,
  };
};

// connect this component to Redux store to get props
export default connect(mapStateToProps, { getAllVideos })(AllVideos);
*/
