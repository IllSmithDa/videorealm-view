import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import axios from 'axios';
import ReqUrl from '../RequestURL';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './SearchPage.css';

axios.defaults.withCredentials = true;

export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      videoList: [],
      searchItem: '',
      index: 0,
      reachedEnd: false,
    };
  }

  componentDidMount() {
    // grabs the current url
    let searchItem = window.location.href;
    // grabs username inside current url
    searchItem = searchItem.split('/').pop();
    const { reachedEnd, index } = this.state;
    searchItem = searchItem.replace(/%20/g, ' ');
    this.setState({ searchItem });
    const searchVideo = ({ searchTerm: searchItem, reachedEnd, index });

    axios.post(`${ReqUrl}/searchVideos`, searchVideo)
      .then((data) => {
        if (data.data.searchResults.length === 0) {
          document.getElementById('results').innerText = 'No Results Found!';
        }
        this.setState({ videoList: data.data.searchResults, index: data.data.index + 1 });
        if (data.data.searchResults.length % 5 === 0 && !data.data.reachedEnd) {
          document.getElementById('more-results').style.display = 'block';
        } else {
          document.getElementById('more-results').style.display = 'none';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  seeMoreResults = () => {
    // grabs the current url
    let searchItem = window.location.href;
    // grabs username inside current url
    searchItem = searchItem.split('/').pop();
    const { reachedEnd, videoList, index } = this.state;
    this.setState({ searchItem });
    const searchVideo = ({ searchTerm: searchItem, reachedEnd, index });

    axios.post(`${ReqUrl}/searchVideos`, searchVideo)
      .then((data) => {
        this.setState({ videoList: videoList.concat(data.data.searchResults), index: data.data.index + 1 });
        if (data.data.searchResults.length % 5 === 0 && !data.data.reachedEnd) {
          document.getElementById('more-results').style.display = 'block';
        } else {
          document.getElementById('more-results').style.display = 'none';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  goToLink = (link) => {
    window.location.href = link;
  }

  render() {
    const { videoList, searchItem } = this.state;
    return (
      <div>
        <Navbar />
        <div className="searchpage-container">
          <h1>Search Results for &#39;{searchItem}&#39; </h1>
          <div className="searchpage-video-container">
            {videoList.map((post) => {
              return (
                <div key={post.id} className="searchpage-video-item">
                  <img src={post.videoThumbURL} alt="video-thumb" onClick={() => { this.goToLink(`/video/${post.videoID}`); }} />
                  <div>
                    <span role="button" tabIndex={0} onClick={() => { this.goToLink(`/video/${post.videoID}`); }}>{ post.videoName } </span>
                  </div>
                  <div>
                    <span role="button" tabIndex={0} onClick={() => { this.goToLink(`/profile/${post.userName}`); }}> {post.userName[0].toUpperCase() + post.userName.slice(1)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p id="more-results" className="more-videos-item" onClick={this.seeMoreResults}> See More videos </p>
        </div>
        <Footer />
      </div>
    );
  }
}
