import React from 'react';
import '../CSS/LoadingAnimation.css';

export default function LoadingAnimation() {
  return (
    <div>
      <ul id="animation-load" className="dot-containers">
        <li className="dot-item" />
        <li className="dot-item" />
        <li className="dot-item" />
        <li className="dot-item" />
        <li className="dot-item" />
      </ul>
    </div>
  );
}
