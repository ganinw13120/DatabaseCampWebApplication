import { Component } from 'react';
import './App.css';
import LandingPage from "./presentation/view/landing-page";
import LoginPage from "./presentation/view/login";
import OverviewPage from './presentation/view/Overview';
import ProfilePage from './presentation/view/profile';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';

import PreLogged from './presentation/middleware/PreLogged';
import LoggedMiddleware from './presentation/middleware/LoggedMiddleware';

import { Provider } from 'mobx-react';

import RootStore  from '../src/domain/entity/state/Rootstore';

const _RootStore = new RootStore();

const store = {
  rootStore: _RootStore,
  authStore : _RootStore.authStore
};

export default class App extends Component {

  render(): JSX.Element  {
    return (
      <Provider {...store}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <LandingPage/>
            </Route>
            <Route path="/login" exact>
              <PreLogged>
                <LoginPage/>
              </PreLogged>
            </Route>
            <Route path="/overview" exact>
              <LoggedMiddleware>
                <OverviewPage/>
              </LoggedMiddleware>
            </Route>
            <Route path="/profile" exact>
              <LoggedMiddleware>
                <ProfilePage/>
              </LoggedMiddleware>
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}
