import React, { Component } from 'react';
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
    };
  }

  componentDidMount() {
    let userName = '';
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
        const videoReqID = { videoID: getVideoID };

        axios
          .post(`${reqURL}/getVideo`, videoReqID)
          .then((videoData) => {
            // console.log('video data ', videoData.data);
            const { commentList } = this.state;

            for (let i = 0; i < videoData.data.comments.length; i += 1) {
              commentList.push(videoData.data.comments[i]);
            }
            /*
            for (let i = videoData.data.comments.length - 1; i >= 0; i -= 1) {
              commentList.push(videoData.data.comments[i]);
            }
            */
            this.setState({
              videoID: getVideoID,
              videoUploader: videoData.data.userName,
              comment: '',
              commentUsername: userName,
            });
            // console.log(commentList);
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
    const { comment } = this.state;
    const { userName } = this.state;
    if (!(/\S/).test(comment) || userName === '' || comment === '') {
      document.getElementById('comment-button').disabled = true;
      document.getElementById('comment-button').style.backgroundColor = 'lightblue';
    } else {
      const eventEnter = document.getElementById('comment-textarea');
      eventEnter.addEventListener('keypress', (event) => {
      // console.log(`first keydown event. key property value is '${event.key}'`);
        if (event.key === 'Enter') {
          this.submitComment();
        }
      });
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
    const { videoID, commentUsername, videoUploader, comment } = this.state;

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

  render() {
    const { commentList } = this.state;
    const { commentUsername } = this.state;
    return (
      <div>
        <textarea id="comment-textarea" className="comment-text text-items" onChange={this.handleTextChange} placeholder="Add comment here" />
        <button id="comment-button" type="submit" className="comment-button-item text-items all-buttons" onClick={this.submitComment}>Submit</button>
        <h4 className="comments-title text-items"><br /> Comments</h4>
        {commentList.map((val) => {
          return (
            <div className="comments-container" key={val._id}>
              <p className="text-items"><b>{val.username[0].toUpperCase() + val.username.slice(1)} </b>: {val.comment}</p>
              <ReplyComments commentIndex={val.commentIndex} commentUsername={commentUsername} />
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}
