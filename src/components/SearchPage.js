import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import axios from 'axios';
import ReqUrl from './RequestURL';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import '../CSS/PageLayout.css';

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

  render() {
    const { videoList, searchItem } = this.state;
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h2 id="results" className="search-title">Search Results for &#39;{searchItem}&#39; </h2>
          <div className="video-container">
            {videoList.map((post) => {
              return (
                <div key={post.id} className="video-key">
                  <Link to={`/video/${post.videoID}`} className="video-div" preload="none">
                    <Player src={post.videoURL}>
                      <BigPlayButton position="center" />
                    </Player>
                    <p className="video-videoName">{post.videoName} <br />
                      {post.userName[0].toUpperCase() + post.userName.slice(1)}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
          <p id="more-results" className="more-videos-item" onClick={this.seeMoreResults}> See More videos </p>
        </div><br /><br /><br />
        <Footer />
      </div>
    );
  }
}
