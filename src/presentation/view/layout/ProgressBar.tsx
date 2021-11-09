import {Component} from "react";
import { inject, observer } from 'mobx-react';


@inject('appStore')
@observer
export default class Sidebar extends Component<any, any>{
  constructor (props : any) {
    super (props)
    this.state = {
      isWaiting : true,
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isWaiting : false
      })
    }, 10);
  }
  render(): JSX.Element {
    const speed = 1.2;
    const { isWaiting} = this.state;
    const percent = isWaiting ? 0 : this.props.appStore.store.progressPercent
    const hideDelay = 1;
    const height = 5;
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