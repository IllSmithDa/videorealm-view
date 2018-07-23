import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Profile from './components/Profile';
import News from './components/News';
import Account from './components/Account';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import VideoPlayer from './components/VideoPlayer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Router>
  <div>
    <Route exact path = '/' component={App} />
    <Route path = '/profile' component={Profile} />
    <Route path = '/news' component={News} />
    <Route path = '/account' component={Account} />
    <Route path = '/login' component={Login} />
    <Route path = '/adminpage' component={AdminPage}/>
    <Route path = '/video/:videoID' component={VideoPlayer}/>
  </div>
</Router>, document.getElementById('root'));
registerServiceWorker();
