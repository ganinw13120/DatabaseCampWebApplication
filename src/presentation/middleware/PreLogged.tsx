import { inject, observer } from "mobx-react"
import React from "react"
import { withRouter } from 'react-router-dom';

@inject('authStore')
  
@observer
class PreLogged extends React.Component<any> {
  componentDidMount() {
    if (this.props.authStore.store.isAuthenticated) {
      this.props.history?.push('/overview');
    }
  }
  render(): JSX.Element {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

export default withRouter(PreLogged);