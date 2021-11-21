import { inject, observer } from "mobx-react"
import React from "react"
import { observe  } from "mobx"
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthStore } from '@store/stores/AuthStore/AuthStore';

interface LoggedMiddlewareProps extends RouteComponentProps {
  authStore ?: AuthStore
}

@inject('authStore')
@observer
class PreLogged extends React.Component<LoggedMiddlewareProps, {}> {
  componentDidMount() {
    observe(this.props.authStore!.store, (change) => {
      if (change.name === 'userData') {
        this.checkUser();
      }
    })
  }
  checkUser() {
    const { userData } = this.props.authStore!.store;
    if (userData) {
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