import React from 'react';
import BaseView from '../BaseView';

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
        <div className="App">
          <header className="App-header">
            <p className="title">
              COMING SOON
            </p>
            <p className="description font-extralight">
              DatabaseCamp.io
            </p>
          </header>
        </div>
      </>
    );
  }
}
