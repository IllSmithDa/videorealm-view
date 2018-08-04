import React, { Component } from 'react';
import axios from 'axios';
import { Player, BigPlayButton } from 'video-react';
import { Link } from 'react-router-dom';
import reqURL from './RequestURL';
import '../CSS/VideoLayout.css';
import '../CSS/PageLayout.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class DeleteVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idVideoDeleteList: [],
      videoList: [],
      loginState: true,
    };
  }

  componentDidMount() {
    axios.get(`${reqURL}/getVideoList`)
      .then((videoData) => {
        if (videoData.data.error) {
          this.setState({ loginState: false });
        } else {
          this.setState({ videoList: videoData.data, loginState: true });
        }
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
        idVideoDeleteList.push(event.target.value);
      } else {
        for (let i = 0; i < idVideoDeleteList.length; i += 1) {
          if (idVideoDeleteList[i] === event.target.value) {
            break;
          }
          if (i === idVideoDeleteList.length - 1) {
            idVideoDeleteList.push(event.target.value);
          }
        }
      }
    } else {
      for (let i = 0; i < idVideoDeleteList.length; i += 1) {
        if (idVideoDeleteList[i] === event.target.value) {
          idVideoDeleteList.splice(i, 1);
          break;
        }
      }
    }
  }

  render() {
    const { loginState } = this.state;
    const { videoList } = this.state;
    if (!loginState) {
      window.location = '/login';
      return (
        <div>
          <h1>Please Login</h1>
        </div>
      );
    }
    return (
      <div>
        <button id="DeleteButton" type="submit" className="all-buttons" onClick={this.deleteModal}> Delete Video(s) </button>
        <div id="DeleteVideos" className="modal">
          <div className="modal-content">
            <span role="button" tabIndex="-1" className="close" onClick={this.closeModal}>&times;</span>
            <h1 className="delete-title">Select videos you want to delete <br /></h1>
            <div className="video-container">
              {videoList.map((post) => {
                return (
                  <div key={post.id} className="video-key video-item">
                    <Link to={`/video/${post.videoID}`} className="video-div">
                      <Player src={post.videoURL}>
                        <BigPlayButton position="center" />
                      </Player>
                    </Link>
                    <p className="HomePage-videoName"> {post.videoName} </p>
                    <input type="checkbox" value={post.videoID} onChange={this.handleDeleteCheck} />
                  </div>
                );
              })}
            </div>
            <button className="delete-button" type="submit" onClick={this.deleteSubmission}>Delete Video(s)</button>
          </div>
        </div>
      </div>
    );
  }
}
