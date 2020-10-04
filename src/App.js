import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/Landing/LandingPage';
import RegisterPage from './components/User/RegisterPage';
import LoginPage from './components/User/LoginPage'

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
              <Link className="link" to="/main">About</Link>
            </li>
          </ul>
        </div>
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
