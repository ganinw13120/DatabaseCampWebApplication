import { inject, observer } from "mobx-react"
import React from "react"
import { withRouter } from 'react-router-dom';
import AppLayout from "../view/layout/app/AppLayout";

@inject('authStore')
  
@observer
class PreLogged extends React.Component<any> {
  render(): JSX.Element {
    if (!this.props.authStore.isAuthenticated) {
      this.props.history?.push('/login');
    }
    return (
      <>
        <AppLayout>
          {this.props.children}
        </AppLayout>
      </>
    )
  }
}

export default withRouter(PreLogged);