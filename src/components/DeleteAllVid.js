import React, { Component } from 'react';
import axios from 'axios';
import { Player, BigPlayButton } from 'video-react';
import { Link } from 'react-router-dom';
import reqURL from './RequestURL';
import '../CSS/VideoLayout.css';
import '../CSS/PageLayout.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class DeleteAllVid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idVideoDeleteList: [],
      videoList: [],
    }
  }
  componentDidMount() {
    axios.get(`${reqURL}/getAllVideos`)
    .then((videoData) => {
      this.setState({ videoList: videoData.data });
      console.log(this.state.videoList);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  deleteSubmission = () => {
    console.log(this.state.idVideoDeleteList);
    let videoIDArray = [];
    for (let i = 0; i < this.state.idVideoDeleteList.length; i++) {
      videoIDArray.push({Key: this.state.idVideoDeleteList[i]});
      videoIDArray.push({Key: `${this.state.idVideoDeleteList[i]}tn.jpg`})
    }
    console.log('my array', videoIDArray);
    const videoDeleteData = { videoIDList: videoIDArray}
    axios.post(`${reqURL}/deleteVideos`, videoDeleteData)
      .then(() => {
        window.location = `/account`;
      })
      .catch((err) => {
        console.log(err);
      })
  }
  deleteModal = () => {
    let reqDocument = document.getElementById('DeleteVideos');
    reqDocument.style.display = 'block';
  }
  closeModal = () => {
    let reqDocument = document.getElementById('DeleteVideos');
    reqDocument.style.display = 'none';
  }

  handleDeleteCheck = (event) => {
    if (event.target.checked) {
      if (this.state.idVideoDeleteList.length === 0) {
        this.state.idVideoDeleteList.push(event.target.value);
      } else {
        for (let i = 0; i < this.state.idVideoDeleteList.length; i++) {
          if (this.state.idVideoDeleteList[i] === event.target.value) {
            break;
          }
          if(i === this.state.idVideoDeleteList.length - 1) {
            this.state.idVideoDeleteList.push(event.target.value);
          }    
        }
      }
    } else {
      for (let i = 0; i < this.state.idVideoDeleteList.length; i++) {
        if (this.state.idVideoDeleteList[i] === event.target.value) {
          this.state.idVideoDeleteList.splice(i, 1);
          break;
        }   
      }
    }
  }
  render() {
    return(
      <div>
        <button id='DeleteButton' onClick={this.deleteModal}> Delete Video(s) </button>
        <div id='DeleteVideos' className='modal'>
           <div className="modal-content">
              <span className="close" onClick={this.closeModal}>&times;</span>
              <h1 className = 'delete-title'>Select videos you want to delete <br/></h1>
              <div className="video-container">
                {this.state.videoList.map((post, index) => {
                  return (
                    <div key = {post.id} className = "video-key video-item"> 
                        <Link to={`/video/${post.videoID}`} className = "video-div"> 
                          <Player src = {post.videoURL} >
                            <BigPlayButton position="center" />
                          </Player>
                        </Link>
                        <p className  = "HomePage-videoName"> {post.videoName} </p>
                      <input type="checkbox" value = { post.videoID } onChange = { this.handleDeleteCheck } />
                    </div>
                  );
                })}
              </div>
              <button className='delete-button' type="submit"  onClick={ this.deleteSubmission }>Delete Video(s)</button>
            </div>
        </div>
      </div>
    );
  }
}