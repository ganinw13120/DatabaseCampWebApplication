import { inject, observer  } from "mobx-react"
import { observe  } from "mobx"
import React from "react"
import { withRouter } from 'react-router-dom';
import AppLayout from "../view/layout/app/AppLayout";
// import AppLayout from "../view/layout/app/AppLayout";

@inject('authStore')
  
@observer 
class LoggedMiddleware extends React.Component<any> {
  componentDidMount() {
    this.checkUser();
    observe(this.props.authStore.store, (data : any) => {
      this.checkUser();
    })
  }
  checkUser() {
    const { isLoading, userData, token } = this.props.authStore.store;
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