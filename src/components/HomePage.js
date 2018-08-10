import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AllVideos from './AllVideos';
import PopularVideos from './PopularVideos';
import '../CSS/PageLayout.css';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="Page-Container">
        <div className="app-title-container">
          <h1 className="app-title-item app-header"> <b> Welcome to  Videorealm</b> </h1>
          <h4 className="app-subheader">Your next video sharing app!</h4>
        </div>
        <div>
          <h3 className="app-title-item"><br />Popular Videos </h3>
          <PopularVideos />
        </div>
        <div>
          <h3 className="app-title-item"><br />Latest Videos </h3>
          <AllVideos />
        </div>
      </div><br /><br /><br />
      <Footer />
    </div>
  );
}
