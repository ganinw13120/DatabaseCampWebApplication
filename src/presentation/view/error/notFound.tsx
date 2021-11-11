import React from 'react';
import BaseView from '../BaseView';
import Navbar from './components/Navbar';
import Title from './components/Title';

import './notfound.css';

export interface LandingComponentProps {
}

export interface LandingComponentState {

}

export default class NotFoundPage extends React.Component<LandingComponentProps, LandingComponentState>
  implements BaseView {
  public constructor(props: LandingComponentState) {
    super(props);
  }
  public onViewModelChanged(): void {
    
  }
  componentDidMount() {
  }
  public render(): JSX.Element {
    return (
      <>
        <div className='w-screen'>
          <Navbar />
          <Title />
        </div>
      </>
    );
  }
}
