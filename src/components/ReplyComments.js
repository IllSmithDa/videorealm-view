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
        console.log('replies', videoData.data.comments[this.state.commentIndex].replies);
        this.setState({videoUploader: videoData.data.userName, 
          replyList: videoData.data.comments[this.state.commentIndex].replies });
        console.log('uploader', this.state.videoUploader)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  onReplySubmit = () => {
    // grabs video url inside current url 
    let getID = (window.location.href).split("/").pop();
    console.log(this.state.commentIndex);
    const replyData = { videoID: getID, videoUploader: this.state.videoUploader, 
      replyStatement: this.state.replyStatement, commentIndex: this.state.commentIndex};
    axios.post(`${reqURL}/addReplies`, replyData)
      .then((data) => {
        console.log('mydata', data)
        this.setState({replyList: data.data, isReplyClicked: false, isRepliesHidden: false});
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    if ( this.state.isRepliesHidden && !this.state.isReplyClicked) {
      return(
        <div>
          <button onClick={this.onRepliesShow}>Show Replies </button> <tab/>
          <button onClick={this.onReplyClick}> Reply </button>
        </div>
      )
    }
    if ((!this.state.isRepliesHidden && this.state.isReplyClicked) || 
    (this.state.isRepliesHidden && this.state.isReplyClicked)) {
      return(
        <div>
          <div>
            <div>
              {this.state.replyList.map((props) => {
                return(
                  <div>
                      <p className='text-reply'> <b>{props.username[0].toUpperCase() + props.username.slice(1)}</b>: {props.comment} </p>
                  </div>
                )
              })}
            </div>
            <textarea className = 'reply-area' placeholder = 'Add reply here' onChange = {this.handleReplyChange}/>
          </div>
          <div>
            <button className ='replay-button' onClick = {this.onReplyCancel}>Cancel</button> <tab/>
            <button onClick = {this.onReplySubmit}>Submit</button>
          </div>
        </div>
      )
    } 
    if(!this.state.isReplyClicked && !this.state.isRepliesHidden) {
      return (
        <div>
          <div>
              {this.state.replyList.map((props) => {
                return(
                  <div >
                    <p className='text-reply '> <b>{props.username[0].toUpperCase() + props.username.slice(1)}</b>: {props.comment} </p>
                  </div>
                )
              })}
          </div>
          <button className ='replay-button' onClick = {this.onRepliesHide}> Hide Replies </button> <tab/>
          <button onClick = {this.onReplyClick}>Reply</button>
        </div>
      )
    }
  }
}