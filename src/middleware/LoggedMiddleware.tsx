// LoggedMiddleware.tsx
/**
 * This file used be middleware for checking authentication state.
*/
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

  /**
   * Check user authentication state, validating user's authentication
   * push back to login if user is not logged in
   */
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