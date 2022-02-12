// LandingPage.tsx
/**
 * This file contains components, relaed to landing page.
*/

import { Component } from 'react';
import './landing.css';
import Navbar from './components/Navbar';
import Title from './components/Title';
import About from './components/About';
import Example from './components/Example';
import Content from './components/Content';
import Footer from './components/Footer';
import { inject, observer } from 'mobx-react';

import { AppStore } from '@store/stores/AppStore/AppStore';

interface LandingComponentProps {
  appStore?: AppStore
}

@inject('appStore')
@observer
export default class LandingPage extends Component<LandingComponentProps, {}> {
  public constructor(props: LandingComponentProps) {
    super(props);
    this.props.appStore?.setPercent(0)
  }

  /**
   * On component did mount, set application store, and attach view-model
   *
   * @remarks
   * This is a part of view component.
   *
   */
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
