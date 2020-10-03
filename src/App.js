import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/user/LoginPage';
import RegisterPage from './components/user/RegisterPage';

function App() {
  return (
    <Router>
      <div className="main">
        <nav className="navBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/main">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/main" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
