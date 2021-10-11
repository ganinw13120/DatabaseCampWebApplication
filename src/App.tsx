import { Component } from 'react';
import './App.css';
import LandingPage from "./presentation/view/landing-page";
import LoginPage from "./presentation/view/login";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';

export default class App extends Component {
  render(): JSX.Element  {
    return (
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={LoginPage} />
      </Router>
    );
  }
}
