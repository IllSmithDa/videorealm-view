import React from 'react';
import Navbar from './Navbar';
import AllVideos from './AllVideos';
import '../CSS/PageLayout.css';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="Page-Container">
        <h1 className="app-title-item app-header"> <b> Welcome to  Videorealm</b> </h1>
        <h4 className="app-subheader">Your next video sharing app!</h4>
        <h1 className="app-title-item"><br />Latest Videos </h1>
        <AllVideos />
      </div>
    </div>
  );
}
