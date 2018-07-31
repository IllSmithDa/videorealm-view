import React, { Component } from 'react';
import axios from 'axios';
import ReplyComments from '../components/ReplyComments';
import reqURL from './RequestURL';
import '../CSS/VideoLayout.css';
// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      commentUsername: '',
      videoID: '',
      videoUploader: '',
      commentList: [],
    }
  }
  componentDidMount() {
    const getVideoID = (window.location.href).split("/").pop();
    // grabs video url inside current url 
    console.log('videoID', getVideoID);

    const videoReqID = { videoID: getVideoID }
    axios
      .post(`${reqURL}/getVideo`, videoReqID)
      .then((videoData) => {
        console.log('video data ', videoData.data);
        for (let i = 0; i < videoData.data.comments.length; i++) {
          this.state.commentList.push(videoData.data.comments[i])
        }
        this.setState({ videoID: getVideoID, videoUploader: videoData.data.userName, comment: '' });
        
      })
      .catch((err) => {
        console.log(err);
      })
      
  }

  handleTextChange = (event) => {
    const newComment = event.target.value;
    this.setState({ comment: newComment });
  }
  submitComment = () => {
    const commentData = ({ commentUsername: this.state.commentUsername, videoUploader: this.state.videoUploader, 
      videoID: this.state.videoID, comment: this.state.comment });
    axios
      .post(`${reqURL}/addComment`, commentData)
      .then(data => {
        console.log(data);
        let videoComments = [];
        for (let i = 0; i < data.data.length; i++){
          videoComments.push(data.data[i]);
        }
        this.setState({ commentList: videoComments });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return(
      <div>
        <textarea className = 'comment-text' onChange = {this.handleTextChange} placeholder = "Add comment here"></textarea>
        <button onClick={this.submitComment}>submit</button>
        <h3 className = 'comments-title'> Comments</h3>
        {this.state.commentList.map((val, index) => {
          return(
            <div>
              <p><b>{val.username[0].toUpperCase() + val.username.slice(1)} </b>: {val.comment}
              <ReplyComments commentIndex={index}/></p>
            </div>
          );
        })}
      </div>
    );
  }
}