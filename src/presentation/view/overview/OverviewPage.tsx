import React from 'react';
import BaseView from '../BaseView';
import AuthViewModel from '../../view-model/auth/AuthViewModel';

export interface OverviewComponentState {

}

export default class OverviewPage extends React.Component<any, OverviewComponentState>
  implements BaseView {
  
  private authViewModel: AuthViewModel;
  
  public constructor(props: any) {
    super(props);
    const authViewModel = new AuthViewModel();
    this.authViewModel = authViewModel;
    
  }
  
  public componentDidMount(): void {
    this.authViewModel.attachView(this);
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
