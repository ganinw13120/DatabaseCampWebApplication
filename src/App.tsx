import { Component, ReactElement } from 'react';
import './App.css';
import LandingPage from "./presentation/view/landing-page";
import LoginPage from "./presentation/view/login";
import RegisterPage from "./presentation/view/register";

import OverviewPage from './presentation/view/overview';
import ProfilePage from './presentation/view/profile';
import MatchingPage from './presentation/view/matching';
import MultiplePage from './presentation/view/multiple';
import Activity from './presentation/view/activity';
import LecturePage from './presentation/view/lecture';
import PointRankingPage from './presentation/view/pointRanking';

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
  authStore: _RootStore.authStore,
  overviewStore : _RootStore.overviewStore,
  appStore : _RootStore.appStore,
  pointRankingStore: _RootStore.pointRankingStore,
  learningStore: _RootStore.learningStore
};

interface route {
  url: string,
  page : ReactElement,
}

const appRouteList : route[] = [
  {
    url: '/overview',
    page : <OverviewPage/>
  },
  {
    url: '/profile',
    page : <ProfilePage/>
  },
  {
    url: '/activity/matching',
    page : <MatchingPage/>
  },
  {
    url: '/activity/:id',
    page : <Activity/>
  },
  {
    url: '/content',
    page: <LecturePage />
  },
  {
    url: '/ranking',
    page : <PointRankingPage/>
  },
  {
    url: '/multiple',
    page : <MultiplePage/>
  },
];

export default class App extends Component {

  render(): JSX.Element  {
    const appRouterendered : ReactElement[] = [];
    appRouteList.forEach((e, key) => {
      appRouterendered.push(
        <Route path={e.url} exact key={key}>
          <LoggedMiddleware>
            {e.page}
          </LoggedMiddleware>
        </Route>
      )
    })
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
            <Route path="/register" exact>
              <RegisterPage>
                <RegisterPage/>
              </RegisterPage>
            </Route>
            {appRouterendered}
          </Switch>
        </Router>
      </Provider>
    );
  }
}
