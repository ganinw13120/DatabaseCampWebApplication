import React from 'react';
import BaseView from '../BaseView';

import './landing.css';

import Navbar from './components/Navbar';
import Title from './components/Title';
import About from './components/About';
import Example from './components/Example';
import Content from './components/Content';
import Footer from './components/Footer';



export interface LandingComponentProps {

}

export interface LandingComponentState {

}

export default class LandingPage extends React.Component<LandingComponentProps, LandingComponentState>
  implements BaseView {
  public constructor(props: LandingComponentState) {
    super(props);
    // window.addEventListener("scroll", this.handleScroll);
  }
  public onViewModelChanged(): void {
    
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
