import React from 'react';
import axios from 'axios';
import HomePage from './components/HomePage';
import './CSS/App.css';

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
