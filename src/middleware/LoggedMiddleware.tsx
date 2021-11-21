import { inject, observer  } from "mobx-react"
import { observe  } from "mobx"
import { Component } from "react"
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AppLayout from "@view/layout/app/AppLayout";
import { AuthStore } from '@store/stores/AuthStore/AuthStore';

interface LoggedMiddlewareProps extends RouteComponentProps {
  authStore ?: AuthStore
}

@inject('authStore')
@observer
class LoggedMiddleware extends Component<LoggedMiddlewareProps, {}> {
  componentDidMount() {
    this.checkUser();
    observe(this.props.authStore!.store, () => {
      this.checkUser();
    })
  }
  checkUser() {
    const { isLoading, userData, token } = this.props.authStore!.store;
    if ((!isLoading && !userData) || (!isLoading && !token)) {
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