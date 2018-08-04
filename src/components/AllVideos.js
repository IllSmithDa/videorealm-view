import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import { connect } from 'react-redux';
import { getAllVideos } from '../actions';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

class AllVideos extends Component {
  constructor() {
    super();
    this.state = {
      getApples: () => { return 'apples'; },
      candy: 'hello',
    };
  }

  componentDidMount() {
    // calls action to get all videos
    this.props.getAllVideos();
  }

  render() {
    const { videoList } = this.props;
    return (
      <div>
        <div className="video-container">
          {videoList.map((post) => {
            return (
              <div key={post.id} className="video-key">
                <Link to={`/video/${post.videoID}`} className="video-div">
                  <Player src={post.videoURL}>
                    <BigPlayButton position="center" />
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
        </div>
      </div>
    );
  }
}

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
