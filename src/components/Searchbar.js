import axios from 'axios';
import React, { Component } from 'react';
import '../CSS/Navbar.css';

axios.defaults.withCredentials = true;

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchItem: '',
    };
  }

  handleSearchTerm = (event) => {
    this.setState({ searchItem: event.target.value });
  }

  searchForVideos = () => {
    const { searchItem } = this.state;
    if (searchItem !== '') {
      window.location = `/video_search/${searchItem}`;
    }
  }

  render() {
    return (
      <div>
        <input className="SearchBar-field" type="text" onChange={this.handleSearchTerm} placeholder="Search for videos" />
        <button type="submit" onClick={this.searchForVideos}>Search</button>
      </div>
    );
  }
}
