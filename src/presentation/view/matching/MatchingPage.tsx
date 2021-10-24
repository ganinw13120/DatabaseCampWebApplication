import React from 'react';
import BaseView from '../BaseView';
export interface MatchingComponentState {

}

export default class MatchingPage extends React.Component<any, MatchingComponentState>
  implements BaseView {

  public constructor(props: any) {
    super(props);

  }

  public componentDidMount(): void {
  }

  public onViewModelChanged(): void {
  }

  onFinishFailed = () => {
  }

  public render(): JSX.Element {
    return (
      <>
        <div className='grid grid-cols-2 w-full h-full bg-bg-dark'>
          <div className='w-full bg-bg' style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)' }}>

          </div>
          <div className='w-full'>

          </div>
        </div>
      </>
    );
  }
}