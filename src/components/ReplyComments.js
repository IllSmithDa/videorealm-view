import React, { Component } from 'react';
import axios from 'axios';
import reqURL from './RequestURL';
import '../CSS/VideoLayout.css';

// add credentials or else the session will not be saved
axios.defaults.withCredentials = true;

export default class ReplyComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReplyClicked: false,
      isRepliesHidden: true,
      replyStatement: '',
      videoUploader:'',
      replyList: [],
      replyUsername: this.props.commentUsername,
      commentIndex: this.props.commentIndex
    }
  }
  handleReplyChange = (event) => {
    this.setState({ replyStatement: event.target.value });
   
  }
  onReplyClick = () => {
    this.setState({ isReplyClicked: true });
  }
  onReplyCancel = () => {
    this.setState({ isReplyClicked: false });
  }
  onRepliesHide = () => {
    this.setState({ isRepliesHidden: true });
  }
  onRepliesShow = () => {
    this.setState({ isRepliesHidden: false })
  }
  handleReplyChange = (event) => {
    this.setState({ replyStatement: event.target.value });
  }
  componentDidMount() {
    // grabs video url inside current url 
    let getID = (window.location.href).split("/").pop();
    let reqVideoID = { videoID: getID };
    axios.post(`${reqURL}/getVideo`, reqVideoID)
      .then((videoData) => {
        // console.log('replies', videoData.data.comments[this.state.commentIndex].replies);
        this.setState({videoUploader: videoData.data.userName, 
          replyList: videoData.data.comments[this.state.commentIndex].replies });
        // console.log('uploader', this.state.videoUploader)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidUpdate() {
    if (this.state.replyUsername === '' && this.state.isReplyClicked) {
      document.getElementById('reply-text').disabled = true;
      document.getElementById('reply-text').placeholder = 
      'Please login to reply to comments!';
    }
    if (this.state.isReplyClicked && this.state.replyStatement === '') {
      document.getElementById('reply-submit').disabled = true;
      document.getElementById("reply-submit").style.backgroundColor = 'lightblue';
    }
    if (this.state.replyStatement !== '') {
      document.getElementById('reply-submit').disabled = false;
      document.getElementById("reply-submit").style.backgroundColor = 'rgb(50, 156, 255)';
    }
  }
  onReplySubmit = () => {
    // grabs video url inside current url 
    let getID = (window.location.href).split("/").pop();
    // console.log(this.state.commentIndex);
    const replyData = { videoID: getID, videoUploader: this.state.videoUploader, 
      replyStatement: this.state.replyStatement, commentIndex: this.state.commentIndex};
    axios.post(`${reqURL}/addReplies`, replyData)
      .then((data) => {
        // console.log('mydata', data)
        this.setState({replyList: data.data, isReplyClicked: false, isRepliesHidden: false,
          replyStatement:'' });
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    if ( this.state.isRepliesHidden && !this.state.isReplyClicked) {
      return(
        <div>
          <button className='text-items reply-buttons' onClick={this.onRepliesShow}>Show Replies </button>
          <button className='reply-buttons' onClick={this.onReplyClick}> Reply </button>
        </div>
      )
    }
    if ((!this.state.isRepliesHidden && this.state.isReplyClicked) || 
    (this.state.isRepliesHidden && this.state.isReplyClicked)) {
      return(
        <div>
          <div>
            <div className='reply-container'>
              {this.state.replyList.map((props) => {
                return(
                  <div key={props.id}>
                      <p className='text-reply'> <b>{props.username[0].toUpperCase() + props.username.slice(1)}</b>: {props.comment} </p>
                  </div>
                )
              })}
            </div>
            <textarea id='reply-text' className='reply-area' placeholder='Add reply here' onChange={this.handleReplyChange}/>
          </div>
          <div>
            <button className='reply-button-cancel reply-buttons' onClick={this.onReplyCancel}>Cancel</button>
            <button id='reply-submit' className='reply-submit-button reply-buttons' onClick={this.onReplySubmit} >Submit</button>
          </div>
        </div>
      )
    } 
    if(!this.state.isReplyClicked && !this.state.isRepliesHidden) {
      return (
        <div>
          <div>
            {this.state.replyList.map((props, index) => {
              return(
                <div key={props.id}>
                  <p className='text-reply'> <b>{props.username[0].toUpperCase() + props.username.slice(1)}</b>: {props.comment} </p>
                </div>
              )
            })}
          </div>
          <button className='reply-button-cancel reply-buttons' onClick={this.onRepliesHide}>Hide Replies</button>
          <button className='reply-buttons' onClick={this.onReplyClick}>Reply</button>
        </div>
      )
    }
  }
}