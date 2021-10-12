import React from 'react';
import BaseView from '../BaseView';

export interface OverviewComponentState {

}

export default class OverviewPage extends React.Component<any, OverviewComponentState>
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
        
      </>
    );
  }
}
