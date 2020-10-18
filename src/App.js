import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import VideoLandingPage from './components/Video/VideoLandingPage';
import RegisterPage from './components/User/RegisterPage';
import LoginPage from './components/User/LoginPage'
import MovieLandingPage from './components/Movie/MovieLandingPage';
import VideoUploadPage from './components/Video/Upload/VideoUploadPage';
import VideoDetailPage from './components/Video/DetailPage/VideoDetailPage';
import Nav from './components/Header/Nav';
import SubscriptionPage from './components/Subsription/SubscriptionPage';

function App() {
  return (
    <Router>
      <div>
        <div className="header">
          <Nav />
        </div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/movie" component={MovieLandingPage} />
          <Route exact path="/video" component={VideoLandingPage} />
          <Route exact path="/video/upload" component={VideoUploadPage} />
          <Route exact path="/video/subscriptoin" component={SubscriptionPage} />
          <Route exact path="/video/:videoId" component={VideoDetailPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
