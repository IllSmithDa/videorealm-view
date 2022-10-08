/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import videoData from '../Data/Videos';
// import { getAllVideos } from '../../actions';
import reqURL from '../RequestURL';
import './PopularVideos.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default function PopularVideos() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [sortedAllVideos, setSortedAllVideos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const videoIds = videoData.allIds;
    const allVideos = videoData.byId;
    const sortedIds = videoIds.sort((a, b) => {
      console.log(allVideos[b].views);
      console.log(allVideos[a].views);
      return allVideos[b].views - allVideos[a].views;
    });
    console.log(videoData.allIds);
    console.log(sortedIds);
    setVideoIndex(videoIndex + 4);
    setSortedAllVideos(sortedIds);
    const slicedVideos = sortedIds.slice(0, 4);
    setVideos(slicedVideos);
  }, []);

  const seeMoreVideos = () => {
    // calls action to get all videos
    if (videoIndex + 4 >= sortedAllVideos.length - 1) {
      setReachedEnd(true);
    }
    setVideoIndex(videoIndex + 4);
    const videoIds = sortedAllVideos.slice(videoIndex, videoIndex + 4);
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
