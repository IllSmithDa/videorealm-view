import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      videoUploader: '',
      replyList: [],
      replyUsername: '',
      commentIndex: null,
    };
  }

  componentDidMount() {
    const { commentIndex, commentUsername } = this.props;
    this.setState({ commentIndex, replyUsername: commentUsername });
    // grabs video url inside current url
    const getID = (window.location.href).split('/').pop();
    const reqVideoID = { videoID: getID };
    axios.post(`${reqURL}/getVideo`, reqVideoID)
      .then((videoData) => {
        // console.log('replies', videoData.data.comments[this.state.commentIndex].replies);
        this.setState({
          videoUploader: videoData.data.userName,
          replyList: videoData.data.comments[commentIndex].replies,
        });
        // console.log('uploader', this.state.videoUploader)
      })
      .catch((err) => {
        throw err;
      });
  }

  componentDidUpdate() {
    const { replyUsername, isReplyClicked, replyStatement, commentIndex } = this.state;
    if (replyUsername === '' && isReplyClicked) {
      document.getElementsByClassName('reply-submit-button')[commentIndex].disabled = true;
      document.getElementsByClassName('reply-submit-button')[commentIndex].style.backgroundColor = 'lightblue';
      document.getElementsByClassName('reply-area')[commentIndex].disabled = true;
      document.getElementsByClassName('reply-area')[commentIndex].placeholder = 'Please login to reply to comments!';
    }
    if (isReplyClicked && replyStatement === '') {
      document.getElementsByClassName('reply-submit-button')[commentIndex].disabled = true;
      document.getElementsByClassName('reply-submit-button')[commentIndex].style.backgroundColor = 'lightblue';
    }
    if (replyStatement !== '' && replyUsername !== '') {
      document.getElementsByClassName('reply-submit-button')[commentIndex].disabled = false;
      document.getElementsByClassName('reply-submit-button')[commentIndex].style.backgroundColor = 'rgb(50, 156, 255)';
    }
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
    this.setState({ isRepliesHidden: false });
  }

  onReplySubmit = () => {
    const { videoUploader, replyStatement, commentIndex } = this.state;
    // grabs video url inside current url
    const getID = (window.location.href).split('/').pop();
    // console.log(this.state.commentIndex);
    const replyData = {
      videoID: getID,
      videoUploader,
      replyStatement,
      commentIndex,
    };
    axios.post(`${reqURL}/addReplies`, replyData)
      .then((data) => {
        // console.log('mydata', data)
        this.setState({
          replyList: data.data,
          isReplyClicked: false,
          isRepliesHidden: false,
          replyStatement: '',
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleReplyChange = (event) => {
    this.setState({ replyStatement: event.target.value });
  }

  render() {
    const { isRepliesHidden, isReplyClicked, replyList } = this.state;
    if (isRepliesHidden && !isReplyClicked) {
      return (
        <div>
          <button type="submit" className="text-items reply-buttons" onClick={this.onRepliesShow}>Show Replies </button>
          <button type="submit" className="reply-buttons" onClick={this.onReplyClick}> Reply </button>
        </div>
      );
    }
    if ((!isRepliesHidden && isReplyClicked)
    || (isRepliesHidden && isReplyClicked)) {
      return (
        <div>
          <div>
            <div className="reply-container">
              {replyList.map((props) => {
                return (
                  <div key={props.id}>
                    <p className="text-reply"> <b>{props.username[0].toUpperCase() + props.username.slice(1)}</b>: {props.comment} </p>
                  </div>
                );
              })}
            </div>
            <textarea id="reply-text" className="reply-area" placeholder="Add reply here" onChange={this.handleReplyChange} />
          </div>
          <div>
            <button type="button" className="reply-button-cancel reply-buttons" onClick={this.onReplyCancel}>Cancel</button>
            <button id="reply-submit" type="submit" className="reply-submit-button reply-buttons" onClick={this.onReplySubmit}>Submit</button>
          </div>
        </div>
      );
    }
    if (!isReplyClicked && !isRepliesHidden) {
      return (
        <div>
          <div>
            {replyList.map((props) => {
              return (
                <div key={props.id}>
                  <p className="text-reply"> <b>{props.username[0].toUpperCase() + props.username.slice(1)}</b>: {props.comment} </p>
                </div>
              );
            })}
          </div>
          <button type="submit" className="reply-button-cancel reply-buttons" onClick={this.onRepliesHide}>Hide Replies</button>
          <button type="submit" className="reply-buttons" onClick={this.onReplyClick}>Reply</button>
        </div>
      );
    }
    return (
      <div>
        <h1>500 Error: Replies not found</h1>
      </div>
    );
  }
}

ReplyComments.defaultProps = {
  commentIndex: null,
  commentUsername: '',
};

ReplyComments.propTypes = {
  commentIndex: PropTypes.number,
  commentUsername: PropTypes.string,
};
