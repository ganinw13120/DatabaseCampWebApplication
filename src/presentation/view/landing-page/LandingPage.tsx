import React from 'react';
import BaseView from '../BaseView';

import './landing.css';

import Navbar from './components/Navbar';
import Title from './components/Title';
import About from './components/About';
import Example from './components/Example';
import Content from './components/Content';
import Footer from './components/Footer';
import { inject, observer } from 'mobx-react';

import {AppStore}  from '../../../store/stores/AppStore';

export interface LandingComponentProps {
  appStore ?: AppStore
}

export interface LandingComponentState {

}

@inject('appStore')
@observer
export default class LandingPage extends React.Component<LandingComponentProps, LandingComponentState>
  implements BaseView {
  public constructor(props: LandingComponentState) {
    super(props);
    this.props.appStore?.setPercent(0)
  }
  public onViewModelChanged(): void {
    
  }

  componentDidMount() {
    this.props.appStore?.setPercent(100)
  }

  public render(): JSX.Element {
    return (
      <>
        <div className=''>
          <Navbar />
          <Title />
          <About />
          <Example />
          <Content />
          <Footer />
        </div>
      </>
    );
  }
}
