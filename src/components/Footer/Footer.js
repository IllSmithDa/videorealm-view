import React from 'react';

import './Footer.css';

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-grid">
        <div className="footer-section">
          <h1>About</h1>
          <ul>
            <li><a href="/wonderlandcustom/s/">Infinte</a></li>
            <li><a href="/wonderlandcustom/s/news">News</a></li>
            <li><a href="/wonderlandcustom/s/support">Help</a></li>
            <li><a href="/">Company</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h1>Products</h1>
          <ul>
            <li><a href="/wonderlandcustom/s/store">Electronics</a></li>
            <li><a href="/wonderlandcustom/s/store">Software</a></li>
            <li><a href="/wonderlandcustom/s/store">Subscriptions</a></li>
            <li><a href="/wonderlandcustom/s/store">Other Products</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h1>Support</h1>
          <ul>
            <li><a href="/wonderlandcustom/s/support">Product support</a></li>
            <li><a href="/">Forums</a></li>
            <li><a href="/">Order Status</a></li>
            <li><a href="/wonderlandcustom/s/contact-us">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h1>Legal</h1>
          <ul>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms of Service</a></li>
            <li><a href="/">End User License Agreements</a></li>
            <li><a href="/">Legal Information</a></li>
            <li><a href="/">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="trademark-set">
        <p>© 2020 Infinite Softworks Co. All Rights Reserved. Infinite Softworks co. logo are trademarks of Infinite Softworks co. in the U.S. and/or other countries.</p>
        <a target="_blank" href="https://icons8.com/icons/set/low-volume">Low Volume icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </div>
    </div>
  );
}
