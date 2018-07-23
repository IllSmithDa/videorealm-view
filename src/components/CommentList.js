import React, { Component } from 'react';
import axios from 'axios';
import ReplyComments from '../components/ReplyComments';
import reqURL from './RequestURL';
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
        this.setState({ videoID: getVideoID, videoUploader: videoData.data.userName });
        
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
        <textarea onChange = {this.handleTextChange} placeholder = "Add comment here"></textarea>
        <button onClick={this.submitComment}>submit</button>
        {this.state.commentList.map((val, index) => {
          return(
            <div>
              <p>{val.username}: {val.comment} </p>
              <ReplyComments commentIndex={index}/>
            </div>
          );
        })}
      </div>
    );
  }
}