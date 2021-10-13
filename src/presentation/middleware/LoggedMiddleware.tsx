import { inject, observer } from "mobx-react"
import React from "react"
import { withRouter } from 'react-router-dom';

@inject('authStore')
  
@observer
class PreLogged extends React.Component<any> {
  render(): JSX.Element {
    if (!this.props.authStore.isAuthenticated) {
      this.props.history?.push('/login');
    }
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

export default withRouter(PreLogged);