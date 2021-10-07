import React, { Component } from 'react';
import './App.css';
import LandingPage from "./presentation/view/landing-page/LandingPage";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() : JSX.Element  {
    return (
      <Router>
        <Route path="/" exact component={LandingPage} />
      </Router>
    );
  }
}
