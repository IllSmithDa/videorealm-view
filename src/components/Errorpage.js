import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import LoadingAnimation from './LoadingAnimation';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="Page-Container">
        <br /><h1 className="app-title-item"> 404: Page does not Exist</h1>
        <LoadingAnimation />
      </div><br /><br /><br />
      <Footer />
    </div>
  );
}
