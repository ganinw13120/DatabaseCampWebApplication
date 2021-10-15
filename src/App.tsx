import { Component } from 'react';
import './App.css';
import LandingPage from "./presentation/view/landing-page";
import LoginPage from "./presentation/view/login";
import OverviewPage from './presentation/view/Overview';
import ProfilePage from './presentation/view/ProfilePage';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';

import { Provider } from 'mobx-react';

import RootStore  from '../src/domain/entity/state/Rootstore';

const _RootStore = new RootStore();

const store = {
	rootStore: _RootStore, 
};

export default class App extends Component {

  render(): JSX.Element  {
    return (
      <Provider {...store}>
        <Router>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/overview" exact component={OverviewPage} />
          <Route path="/profile" exact component={ProfilePage} />
        </Router>
      </Provider>
    );
  }
}
