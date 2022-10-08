import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import reqURL from '../RequestURL';
import videoData from '../Data/Videos';
import './AllVideos.css';
// add credentials or else the session will not be saved

export default function AllVideos() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const videosIds = videoData.allIds;
    setVideoIndex(videoIndex + 4);
    const videoIds = videosIds.slice(0, 4);
    setVideos(videoIds);
  }, []);

  const seeMoreVideos = () => {
    // calls action to get all videos
    if (videoIndex + 4 >= videoData.allIds.length - 1) {
      setReachedEnd(true);
    }
    setVideoIndex(videoIndex + 4);
    const videoIds = videoData.allIds.slice(videoIndex, videoIndex + 4);
    setVideos([...videos, ...videoIds]);
  };
  return (
    <div>
      <div className="all-videos-container">
        {videos.map((id) => {
          return (
            <div key={id} className="all-videos-item">
              <Link to={`/video/${videoData.byId[id].videoID}`} className="video-div">
                <img src={videoData.byId[id].videoThumbURL} alt="video-thumb" className="video-preview-item" />
                <div className="all-videos-header">
                  <span>{ videoData.byId[id].videoName } </span>
                </div>
              </Link>
              <Link to={`/profile/${videoData.byId[id].userName}`} className="all-videos-username">
                <span>{videoData.byId[id].userName[0].toUpperCase() + videoData.byId[id].userName.slice(1)}</span>
              </Link>
            </div>
          );
        })}
      </div>
      {reachedEnd ? <div />
        : (
          <div className="more-all-videos">
            <span role="button" tabIndex="0" onClick={seeMoreVideos}> See More videos </span>
          </div>
        )
      }
    </div>
  );
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
