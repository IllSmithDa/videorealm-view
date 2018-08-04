import React from 'react';
import Navbar from './Navbar';
import '../CSS/PageLayout.css';

export default class HomePage {
  render() {
    return (
      <div>
        <Navbar />
        <div className="Page-Container">
          <br /><h1 className="app-title-item"> 404: Page does not Exist</h1>
        </div>
      </div>
    );
  }
}
