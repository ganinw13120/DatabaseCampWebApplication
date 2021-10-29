import { inject, observer } from "mobx-react"
import React from "react"
import { withRouter } from 'react-router-dom';
import AppLayout from "../view/layout/app/AppLayout";

@inject('authStore')
  
@observer class LoggedMiddleware extends React.Component<any> {

  checkUser(isLoading : boolean, isAuthenticated : boolean) {
    if (!isLoading && !isAuthenticated) {
      this.props.history?.push('/login');
    }
  }

  render(): JSX.Element {
    const { isLoading, isAuthenticated } = this.props.authStore.store;
    this.checkUser(isLoading, isAuthenticated);
    return (
      <>
        <AppLayout>
          {this.props.children}
        </AppLayout>
      </>
    )
  }
}

export default withRouter(LoggedMiddleware);