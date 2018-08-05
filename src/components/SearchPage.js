import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import axios from 'axios';
import ReqUrl from './RequestURL';
import Navbar from './Navbar';
import Footer from './Footer';

axios.defaults.withCredentials = true;

export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      videoList: [],
    };
  }

  componentDidMount() {
    // grabs the current url
    let searchItem = window.location.href;
    // grabs username inside current url
    searchItem = searchItem.split('/').pop();
    const searchVideo = ({ searchTerm: searchItem });

    axios.post(`${ReqUrl}/searchVideos`, searchVideo)
      .then((data) => {
        const videoList = [];
        for (let i = 0; i < data.data.length; i += 1) {
          videoList.push(data.data[i]);
        }
        this.setState({ videoList });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { videoList } = this.state;
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <h2 className="search-title">Search Results</h2>
          {videoList.map((post) => {
            return (
              <div key={post.id} className="video-key">
                <Link to={`/video/${post.videoID}`} className="video-div">
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
        </div><br /><br /><br />
        <Footer />
      </div>
    );
  }
}
