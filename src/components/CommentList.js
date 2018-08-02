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
    let userName = '';
    axios.get(`${reqURL}/getUsername`)
      .then(data => {
        if (data.data.error) {
          document.getElementById("comment-textarea").disabled = true;
          document.getElementById("comment-textarea").placeholder = 'Please login to comment!';
        } else {
          userName = data.data;
        }
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
            this.setState({ videoID: getVideoID, videoUploader: videoData.data.userName, comment: '', commentUsername: userName });

          })
          .catch((err) => {
            console.log(err);
          })
          })
          .catch(err => {
            throw err;
          })
  }
  //check state after component updates
  componentDidUpdate() {
    if (this.state.comment === '' || this.state.userName === '' ) {
      document.getElementById("comment-button").disabled = true;
      document.getElementById("comment-button").style.backgroundColor = 'lightblue';
    }

  }

  handleTextChange = (event) => {
    const newComment = event.target.value;
    console.log(this.state.comment);
    this.setState({ comment: newComment });

    // only show submit button if comment is written
    if (document.getElementById("comment-button").disabled) {
      document.getElementById("comment-button").disabled = false;
      document.getElementById("comment-button").style.backgroundColor = 'rgb(50, 156, 255)';
    }

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
        <textarea id='comment-textarea' className = 'comment-text text-items ' onChange = {this.handleTextChange} placeholder = "Add comment here"></textarea>
        <button id='comment-button' className='comment-button-item text-items all-buttons' onClick={this.submitComment}>Submit</button>
        <h4 className = 'comments-title text-items'> Comments</h4>
        {this.state.commentList.map((val, index) => {
          return(
            <div className='comments-container' key={val._id}>
              <p className='text-items'><b>{val.username[0].toUpperCase() + val.username.slice(1)} </b>: {val.comment}</p>
              <ReplyComments commentIndex={index} commentUsername={this.state.commentUsername}/>
              <br/>
            </div>
          );
        })}
      </div>
    );
  }
}