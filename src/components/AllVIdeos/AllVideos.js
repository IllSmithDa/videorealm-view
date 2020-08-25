import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import reqURL from '../RequestURL';
import './AllVideos.css';
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
          videoIndex: videoIndex + 4,
          totalArr: videoData.data.videoArr,
          reachedEnd: videoData.data.reachedEnd,
        });
        //  console.log(videoData.data.reachedEnd);
        // console.log(videoData.data.videoArr.length % 4);
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
        <div className="all-videos-container">
          {totalArr.map((post) => {
            return (
              <div key={post.id} className="all-videos-item">
                <Link to={`/video/${post.videoID}`} className="video-div">
                  <img src={post.videoThumbURL} alt="video-thumb" className="video-preview-item" />
                  <div className="all-videos-header">
                    <span>{ post.videoName } </span>
                  </div>
                </Link>
                <Link to={`/profile/${post.userName}`} class="all-videos-username">
                  <span>{post.userName[0].toUpperCase() + post.userName.slice(1)}</span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="more-all-videos">
          <span role="button" tabIndex="0" onClick={this.seeMoreVideos}> See More videos </span>
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
