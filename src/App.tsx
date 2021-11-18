import { Component, ReactElement } from 'react';
import './App.css';
import LandingPage from "./view/landing-page";
import LoginPage from "./view/login";
import RegisterPage from "./view/register";

import OverviewPage from './view/overview';
import ExamPage from './view/exam';
import ExamOverviewPage from './view/exam-overview';
import ProfilePage from './view/profile';
import Activity from './view/activity';
import LecturePage from './view/lecture';
import PointRankingPage from './view/pointRanking';
import ExamResultPage from './view/exam-result';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';

import PreLogged from './middleware/PreLogged';
import LoggedMiddleware from './middleware/LoggedMiddleware';

import { Provider } from 'mobx-react';

import RootStore  from './store/Rootstore';

import Progress from './view/layout/ProgressBar';
import NotFoundPage from './view/error';

const _RootStore = new RootStore();

const store = {
  rootStore: _RootStore,
  authStore: _RootStore.authStore,
  overviewStore : _RootStore.overviewStore,
  appStore : _RootStore.appStore,
  pointRankingStore: _RootStore.pointRankingStore,
  learningStore: _RootStore.learningStore,
  profileStore : _RootStore.profileStore,
  examinationStore : _RootStore.examinationStore,
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
    url: '/examination-overview',
    page : <ExamOverviewPage/>
  },
  {
    url: '/examination',
    page : <ExamPage/>
  },
  {
    url: '/profile',
    page : <ProfilePage/>
  },
  {
    url: '/activity',
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
    url: '/result',
    page : <ExamResultPage/>
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
            <Route>
              <NotFoundPage />              
            </Route>
          </Switch>
        </Router>
        <Progress />
      </Provider>
    );
  }
}
