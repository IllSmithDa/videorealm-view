import axios from 'axios';
import React, { Component } from 'react';
import '../CSS/Navbar.css';
axios.defaults.withCredentials = true;
class SearchBar extends Component {

	constructor () {
		super();
		this.state = {
			searchItem : ''
		}
		this.handleSearchTerm = this.handleSearchTerm.bind(this);
		this.searchForVideos = this.searchForVideos.bind(this);
	}
	
	handleSearchTerm(event) {
		this.setState({searchItem: event.target.value})
	}

	searchForVideos() {
		if (this.state.searchItem !== '') {
			setTimeout(() => {
				console.log()
				window.location = `/video_search/${this.state.searchItem}`;
			})
		}
	}
	render() {
		return (
			<div>
				<input className="SearchBar-field" type="text" onChange={this.handleSearchTerm} placeholder="Search for videos"></input> 
				<button onClick={this.searchForVideos}>Search</button>
			</div>
		);
	}
};

export default SearchBar;