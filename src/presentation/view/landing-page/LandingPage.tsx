import React from 'react';
import BaseView from '../BaseView';

import './landing.css';

import Navbar from './components/Navbar';
import Title from './components/Title';
import About from './components/About';


export interface LandingComponentProps {

}

export interface LandingComponentState {

}

export default class LandingPage extends React.Component<LandingComponentProps, LandingComponentState>
  implements BaseView {
  public constructor(props: LandingComponentState) {
    super(props);
    
  }

  public onViewModelChanged(): void {
    
  }

  public render(): JSX.Element {
    return (
      <>
        <div className='h-screen'>
          {/* <Navbar /> */}
          <Title />
          <About />
        </div>
      </>
    );
  }
}
