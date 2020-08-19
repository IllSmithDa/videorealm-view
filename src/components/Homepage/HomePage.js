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
        <div  id="demo" className="app-title-container carousel slide" data-ride="carousel">
          <ul class="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" class="active"></li>
            <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li>
          </ul>
    
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className="title-container" id="title-slide">
                <h1>Videorealm</h1>
              </div>
            </div>
            <div class="carousel-item">
              <div className="title-container" id="first-news">
                <h1>Checkout New Videos</h1>
              </div>
            </div>
            <div class="carousel-item">
              <div className="title-container" id="second-news">
                <h1>Sign Up for Free</h1>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
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
