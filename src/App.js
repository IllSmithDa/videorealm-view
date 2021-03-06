import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/Profile/Profile';
import Account from './components/Account';
import Login from './components/LoginPage/Login';
import CreateUser from './components/CreateUserPage/CreateUser';
import AdminPage from './components/AdminPage';
import VideoPlayer from './components/VideoPage/VideoPlayer';
import SearchPage from './components/SearchPage/SearchPage';
import ErrorPage from './components/Errorpage/Errorpage';
import LostPassword from './components/LostPassword/LostPassword';
import LostUsername from './components/LostUsername/LostUsername';
import RequestKey from './components/RequestKey/RequestKey';
import './CSS/App.css';

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/profile/:username" component={Profile} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/createUser" component={CreateUser} />
        <Route exact path="/adminpage" component={AdminPage} />
        <Route exact path="/video/:videoID" component={VideoPlayer} />
        <Route exact path="/video_search/:searchterm" component={SearchPage} />
        <Route exact path="/lostpassword" component={LostPassword} />
        <Route exact path="/lostusername" component={LostUsername} />
        <Route exact path="/requestkey" component={RequestKey} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}
