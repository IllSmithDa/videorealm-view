import React, { Component } from 'react';
import Navbar from './Navbar';
import AllVideos from './AllVideos';
import '../CSS/PageLayout.css';

export default class News extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className = 'Page-Container'>
          <AllVideos/>
        </div>
      </div>
    );
  }
}