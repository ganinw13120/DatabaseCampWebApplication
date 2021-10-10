import React from 'react';
import BaseView from '../BaseView';

export interface AuthComponentProps {

}

export interface AuthComponentState {

}

export default class LandingPage extends React.Component<AuthComponentProps, AuthComponentState>
  implements BaseView {
  public constructor(props: AuthComponentProps) {
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
