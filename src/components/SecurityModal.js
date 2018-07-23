import React, { Component } from 'react';
import axios from 'axios';

export default class SecurityModal extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }
  componentDidMount() {

  }
  render() {
    <div id="myModal2" className="modal">
      <div className="modal-content">
        <span className="close" onClick={this.closeModal}>&times;</span>
        <h1>{this.state.videoList[this.state.index].videoName}</h1>
        <video width="800" height="600" controls>
          <source src={post.videoURL} type="video/mp4"/>
        </video>
      </div>
    </div>
  }
} 