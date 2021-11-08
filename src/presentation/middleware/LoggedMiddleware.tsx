import { inject, observer  } from "mobx-react"
import { observe  } from "mobx"
import React from "react"
import { withRouter } from 'react-router-dom';
import AppLayout from "../view/layout/app/AppLayout";

@inject('authStore')
  
@observer class LoggedMiddleware extends React.Component<any> {

  componentDidMount() {
    observe(this.props.authStore.store, () => {
      this.checkUser();
    })
  }
  checkUser() {
    const { isLoading, isAuthenticated } = this.props.authStore.store;
    if (!isLoading && !isAuthenticated) {
      this.props.history?.push('/login');
    }
  }

  render(): JSX.Element {
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