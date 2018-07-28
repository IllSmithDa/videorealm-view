import React from 'react';
import { connect } from 'react-redux';

import { getAllVideos } from '../actions';
import AllVideos from './AllVideos';

const mapStateToProps = (state) => {
  return {
    videoList: state.videoList
  }
}

export default connect(mapStateToProps, { getAllVideos })(AllVideos);