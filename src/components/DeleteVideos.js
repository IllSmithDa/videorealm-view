import React, { Component } from 'react';
import axios from 'axios';
import { Player, BigPlayButton } from 'video-react';
import { Link } from 'react-router-dom';
import reqURL from './RequestURL';
import '../CSS/VideoLayout.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class DeleteVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idVideoDeleteList: [],
      videoList: [],
    };
  }

  componentDidMount() {
    axios.get(`${reqURL}/getVideoList`)
      .then((videoData) => {
        this.setState({ videoList: videoData.data });
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteSubmission = () => {
    // console.log(idVideoDeleteList);
    const { idVideoDeleteList } = this.state;
    const videoIDArray = [];
    for (let i = 0; i < idVideoDeleteList.length; i += 1) {
      videoIDArray.push({ Key: idVideoDeleteList[i] });
    }
    // console.log('my array', videoIDArray);
    const videoDeleteData = { videoIDList: videoIDArray };
    axios.post(`${reqURL}/deleteVideos`, videoDeleteData)
      .then(() => {
        window.location = '/account';
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteModal = () => {
    document.getElementById('DeleteVideos').style.display = 'block';
  }

  closeModal = () => {
    document.getElementById('DeleteVideos').style.display = 'none';
  }

  handleDeleteCheck = (event) => {
    const { idVideoDeleteList } = this.state;
    if (event.target.checked) {
      if (idVideoDeleteList.length === 0) {
        // console.log(event.target.value);
        // console.log(`${event.target.value}.jpg`);
        idVideoDeleteList.push(event.target.value);
        idVideoDeleteList.push(`${event.target.value}.jpg`);
      } else {
        for (let i = 0; i < idVideoDeleteList.length; i += 1) {
          if (idVideoDeleteList[i] === event.target.value) {
            break;
          }
          if (i === idVideoDeleteList.length - 1) {
            idVideoDeleteList.push(event.target.value);
            idVideoDeleteList.push(`${event.target.value}.jpg`);
          }
        }
      }
    } else {
      for (let i = 0; i < idVideoDeleteList.length; i += 1) {
        if (idVideoDeleteList[i] === event.target.value) {
          idVideoDeleteList.splice(i, 2);
          break;
        }
      }
    }
  }

  render() {
    const { videoList } = this.state;
    return (
      <div>
        <button id="DeleteButton" type="submit" className="reply-buttons" onClick={this.deleteModal}> Delete Video(s) </button>
        <div id="DeleteVideos" className="modal">
          <div className="modal-content">
            <span role="button" tabIndex="-1" className="close" onClick={this.closeModal}>&times;</span>
            <h1 className="delete-title">Select videos you want to delete <br /></h1>
            <div className="video-container">
              {videoList.map((post) => {
                return (
                  <div key={post.id} className="video-key video-item">
                    <Link to={`/video/${post.videoID}`} className="video-div" preload="none">
                      <img src={post.videoThumbURL} alt="video-thumb" className="video-preview-item" />
                    </Link>
                    <p className="HomePage-videoName"> {post.videoName} </p>
                    <input type="checkbox" value={post.videoID} onChange={this.handleDeleteCheck} />
                  </div>
                );
              })}
            </div>
            <button className="add-button-margins reply-buttons delete-button" type="submit" onClick={this.deleteSubmission}>Delete Video(s)</button>
          </div>
        </div>
      </div>
    );
  }
}
