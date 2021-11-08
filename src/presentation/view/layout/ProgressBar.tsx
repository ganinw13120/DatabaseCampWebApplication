import {Component} from "react";

export default class Sidebar extends Component<any, any>{
  onLogout() {
    this.props.authStore.Logout();
    this.props.history.push('/login');
  }
  onClickPage(url : string): void {
    this.props.history.push('/' + url);
  }
  render(): JSX.Element {
    const speed = 1;
    const percent = 90;
    const hideDelay = 1;
    const height = 3;
    const background = '#005FB7';
	  const containerStyle = {
	    opacity: percent < 100 ? 1 : 0,
	    WebkitTransition: speed + 's opacity',
	    transition: speed + 's opacity',
	    WebkitTransitionDelay: (percent < 100 ? 0 : hideDelay) + 's',
	    transitionDelay: (percent < 100 ? 0 : hideDelay) + 's'
	  };

    return (<>
      <div style={containerStyle}>
        <div style={{
          display: 'inline-block',
          position: 'fixed',
          top: 0,
          left: 0,
          width: percent + '%',
          maxWidth: '100% !important',
          height: height + 'px',
          boxShadow: '1px 1px 1px rgba(0,0,0,0.1)',
          borderRadius: '0 1px 1px 0',
          WebkitTransition: speed + 's width, ' + speed + 's background-color',
          transition: speed + 's width, ' + speed + 's background-color',
          backgroundColor : background
        }}></div>
      </div>
    </>)
  }
}