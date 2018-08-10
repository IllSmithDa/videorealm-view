import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReplyComments from './ReplyComments';
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
      commentIndex: 0,
      isCommentEnded: false,
    };
  }

  componentDidMount() {
    let userName = '';
    const { commentIndex, isCommentEnded, commentList } = this.state;
    axios.get(`${reqURL}/getUsername`)
      .then((data) => {
        if (data.data.error) {
          document.getElementById('comment-textarea').disabled = true;
          document.getElementById('comment-textarea').placeholder = 'Please login to comment!';
        } else {
          userName = data.data;
        }
        const getVideoID = (window.location.href).split('/').pop();
        // grabs video url inside current url
        // console.log('videoID', getVideoID);
        const videoReqID = { videoID: getVideoID, index: commentIndex, reachedEnd: isCommentEnded };
        axios
          .post(`${reqURL}/getCommentList`, videoReqID)
          .then((videoData) => {
            // console.log('video data ', videoData.data);
            this.setState({
              videoID: getVideoID,
              videoUploader: videoData.data.userName,
              comment: '',
              commentIndex: commentIndex + 5,
              commentUsername: userName,
              commentList: videoData.data.commentArr,
            });
            if (videoData.data.commentArr.length % 5 === 0 && !videoData.data.commentArr.reachedEnd
              && !commentList.length === 0) {
              document.getElementById('more-comments').style.display = 'block';
            } else {
              document.getElementById('more-comments').style.display = 'none';
            }
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  // check state after component updates
  componentDidUpdate() {
    const { comment, userName } = this.state;
    if (!(/\S/).test(comment) || userName === '' || comment === '') {
      document.getElementById('comment-button').disabled = true;
      document.getElementById('comment-button').style.backgroundColor = 'lightblue';
    }
  }

  handleTextChange = (event) => {
    const newComment = event.target.value;
    this.setState({ comment: newComment });

    // only show submit button if comment is written
    if (document.getElementById('comment-button').disabled) {
      document.getElementById('comment-button').disabled = false;
      document.getElementById('comment-button').style.backgroundColor = 'rgb(50, 156, 255)';
    }
  }

  submitComment = () => {
    const { videoID, commentUsername, comment } = this.state;
    const { videoUploader } = this.props;
    const commentData = ({
      commentUsername,
      videoUploader,
      videoID,
      comment,
    });
    axios
      .post(`${reqURL}/addComment`, commentData)
      .then((data) => {
        // console.log(data);
        const videoComments = [];
        for (let i = 0; i < data.data.length; i += 1) {
          videoComments.push(data.data[i]);
        }
        this.setState({ commentList: videoComments });
      })
      .catch((err) => {
        throw err;
      });
  }

  seeMoreComments = () => {
    const { commentIndex } = this.state;
    const { isCommentEnded } = this.state;
    const getVideoID = (window.location.href).split('/').pop();
    // grabs video url inside current url
    // console.log('videoID', getVideoID);
    const videoReqID = { videoID: getVideoID, index: commentIndex, reachedEnd: isCommentEnded };
    axios
      .post(`${reqURL}/getCommentList`, videoReqID)
      .then((videoData) => {
        // console.log('video data ', videoData.data);
        this.setState({
          videoID: getVideoID,
          videoUploader: videoData.data.userName,
          commentIndex: commentIndex + 5,
          commentList: videoData.data.commentArr,
        });
        if (videoData.data.commentArr.length % 5 === 0 && !videoData.data.commentArr.reachedEnd) {
          document.getElementById('more-comments').style.display = 'block';
        } else {
          document.getElementById('more-comments').style.display = 'none';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { commentList, commentUsername, comment } = this.state;
    return (
      <div>
        <textarea id="comment-textarea" maxLength="350" className="comment-text text-items" onChange={this.handleTextChange} placeholder="Add comment here" />
        <p className="comment-limit">{comment.length}/350 character length</p>
        <button id="comment-button" type="submit" className="comment-button-item text-items all-buttons" onClick={this.submitComment}>Submit</button>
        <h4 id="comment-header" className="comments-title text-items"><br /> Comments</h4>
        {commentList.map((val) => {
          return (
            <div className="comments-container" key={val._id}>
              <p className="text-items"><b>{val.username[0].toUpperCase() + val.username.slice(1)} </b>: {val.comment}</p>
              <ReplyComments commentIndex={val.commentIndex} commentUsername={commentUsername} />
            </div>
          );
        })}
        <p id="more-comments" className="more-videos-item" onClick={this.seeMoreComments}> See More Comments</p>
      </div>
    );
  }
}

CommentList.defaultProps = {
  videoUploader: '',
};

CommentList.propTypes = {
  videoUploader: PropTypes.string,
};
