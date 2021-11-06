import { inject, observer } from "mobx-react"
import React from "react"
import { observe  } from "mobx"
import { withRouter } from 'react-router-dom';

@inject('authStore')
  
@observer
class PreLogged extends React.Component<any> {
  componentDidMount() {
    observe(this.props.authStore.store, (change : any) => {
      if (change.name === 'isAuthenticated') {
        this.checkUser();
      }
    })
  }
  checkUser() {
    const { isAuthenticated } = this.props.authStore.store;
    if (isAuthenticated) {
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