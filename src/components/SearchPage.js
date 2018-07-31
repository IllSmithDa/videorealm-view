import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import axios from 'axios';
import ReqUrl from './RequestURL';
import Navbar from './Navbar';

axios.defaults.withCredentials = true;

class App extends Component {
  constructor () {
    super();
    this.state = {
      videoList: []
    }
  }

  componentDidMount() {
    // grabs the current url
    let searchItem = window.location.href;
    // grabs username inside current url 
    searchItem = searchItem.split("/").pop();
    const searchVideo = ({ searchTerm: searchItem })
  
    axios.post(`${ReqUrl}/searchVideos`, searchVideo)
      .then(data => {
        let videoList = [];
        for (let i = 0; i < data.data.length; i++) {
            videoList.push(data.data[i]);
        }
        this.setState({videoList: videoList});
        console.log(this.state.videoList);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Navbar/>   
        <div className='Page-Container'>
          <h2 className='search-title'>Search Results</h2>
          {this.state.videoList.map((post, index) => {
            return (
              <div key = {post.id} className = "video-key"> 
                <Link to={`/video/${post.videoID}`}className = "video-div"> 
                  <Player src = {post.videoURL} >
                    <BigPlayButton position="center" />
                  </Player>
                  <p className  = "video-videoName" >{post.videoName} <br/>
                  {post.userName[0].toUpperCase() + post.userName.slice(1)}</p>  
                </Link>
              </div>
            ); 
          })}    
        </div>
      </div>
    );
  }
}

export default App;