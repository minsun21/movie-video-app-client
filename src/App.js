import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import VideoLandingPage from './components/Video/VideoLandingPage';
import RegisterPage from './components/User/RegisterPage';
import LoginPage from './components/User/LoginPage'
import MovieLandingPage from './components/Movie/MovieLandingPage';
import VideoUploadPage from './components/Video/Upload/VideoUploadPage';


function App() {
  return (
    <Router>
      <div>
        <div className="header">
          <ul className="nav">
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/movie">Movie</Link>
            </li>
            <li>
              <Link className="link" to="/video">Video</Link>
            </li>
            <li>
              <Link className="link" to="/video/upload">Video Upload</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/movie" component={MovieLandingPage} />
          <Route exact path="/video" component={VideoLandingPage} />
          <Route exact path="/video/upload" component={VideoUploadPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
