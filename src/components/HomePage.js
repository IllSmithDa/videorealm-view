import React, { Component } from 'react';
import Navbar from './Navbar';
import AllVideos from './AllVideos';
import '../CSS/PageLayout.css';
import '../CSS/App.css';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className = 'Page-Container'>
        <h1 className="app-title-item video-title"> <b> Welcome to  Videorealm</b> </h1>
        <h4><b>Your next social media app!</b><br/><br/></h4>
        <h4 className='app-title-item'><br />Latest Videos </h4>
          <AllVideos/>
        </div>
      </div>
    );
  }
}