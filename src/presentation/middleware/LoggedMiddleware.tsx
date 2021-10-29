import { inject, observer } from "mobx-react"
import React from "react"
import { withRouter } from 'react-router-dom';
import AppLayout from "../view/layout/app/AppLayout";

@inject('authStore')
  
@observer
class LoggedMiddleware extends React.Component<any> {
  constructor(props : any) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.authStore.isAuthenticated) {
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