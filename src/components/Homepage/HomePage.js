import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AllVideos from '../AllVideos';
import PopularVideos from '../PopularVideos';
import './Homepage.css';
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="Page-Container">
        <div className="app-title-container">
          <h1>Videorealm</h1>
        </div>
        <div>
          <h3 className="video-label"><br />Popular Videos </h3>
          <PopularVideos />
        </div>
        <div>
          <h3 className="video-label"><br />Latest Videos </h3>
          <AllVideos />
        </div>
      </div><br /><br /><br />
      <Footer />
    </div>
  );
}
