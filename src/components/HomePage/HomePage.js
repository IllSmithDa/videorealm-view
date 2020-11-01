/* eslint-disable import/no-unresolved */
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AllVideos from '../AllVIdeos/AllVideos';
import PopularVideos from '../PopularVideos/PopularVideos';
import './HomePage.css';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="homepage-container">
        <div id="demo" className="app-title-container carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" className="active" />
            <li data-target="#demo" data-slide-to="1" />
            <li data-target="#demo" data-slide-to="2" />
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="title-container" id="title-slide">
                <h1>Videorealm</h1>
              </div>
            </div>
            <div className="carousel-item">
              <div className="title-container" id="first-news">
                <h1>Checkout New Videos</h1>
              </div>
            </div>
            <div className="carousel-item">
              <div className="title-container" id="second-news">
                <h1>Sign Up for Free</h1>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon" />
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon" />
          </a>
        </div>
        <div className="videos-container">
          <h1>Popular Videos </h1>
          <PopularVideos />
        </div>
        <div className="videos-container">
          <h1>Latest Videos </h1>
          <AllVideos />
        </div>
      </div>
      <Footer />
    </div>
  );
}
