// Navbar.tsx
/**
 * This file contains components, related navigation bar on error page.
*/
import { Component } from 'react';
import DarkLogo from '@assets/dark-logo.png';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type NavbarState = {
  offSetY : number
}

class Navbar extends Component<RouteComponentProps, NavbarState> {

  public constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      offSetY : 0
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  /**
   * On user scroll, update state.
   *
   * @remarks
   * This is a part of view component.
  */
  handleScroll () :void {
    this.setState({ offSetY: window.pageYOffset });
  }

  /**
   * On component did mount, add event lister to get user's scroll action
   *
   * @remarks
   * This is a part of view component.
  */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  /**
   * On component did mount, remove event lister
   *
   * @remarks
   * This is a part of view component.
  */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  /**
   * On user select navigation bar item, load target page
   *
   * @remarks
   * This is a part of view component.
   *
   * @param url target page url
  */
  loadPage(url: string) {
    this.props.history.push('/' + url);
  }
  public render(): JSX.Element {
    const { offSetY } = this.state;
    return (
      <>
        <nav className={`z-20 hidden md:block md:sticky md:inset-x-0 md:top-0 navbar font-prompt padding-landing`} style={{backgroundColor : offSetY ? '#FEFCF4' : '', transition : 'all 0.5s', boxShadow: offSetY ? '0 4px 4px rgba(0, 0, 0, 0.25)' : ''}}>
          <div className='navbar-container h-full w-full flex'  style={{borderBottom: offSetY ? '0.5px solid #FEFCF4' : `0.5px solid #BBBFC0`}}>
            <div className='flex-none h-full py-7 w-auto'>
                  <img src={DarkLogo} alt="Logo" className='h-full w-auto' />
            </div>
            <div className='flex-grow'>
            </div>
            <div className='flex-none my-auto w-auto flex'>
              <div className='item-space '>
                <span className='text-hoverable cursor-pointer p-2 align-middle text-xl text-darkPrimary font-medium tracking-wider' onClick={()=>this.loadPage('')}>????????????????????????</span>
              </div>
              <div className='item-space'>
                <span className='text-hoverable cursor-pointer p-2 align-middle text-xl text-darkPrimary font-medium tracking-wider' onClick={()=>this.loadPage('')}>???????????????????????????</span>
              </div>
              <div className='item-space'>
                <span className='text-hoverable cursor-pointer p-2 align-middle text-xl text-darkPrimary font-medium tracking-wider' onClick={()=>this.loadPage('')}>?????????????????????</span>
              </div>
            </div>
            <div className='flex-none my-auto w-auto flex'>
              <div className='ml-20 mr-8'>
                <span className='text-hoverable cursor-pointer p-2 align-middle text-xl text-darkPrimary font-medium tracking-wider' onClick={()=>this.loadPage('login')}>?????????????????????????????????</span>
              </div>
            </div>
            <div className='flex-none my-auto w-auto flex'>
              <div className='hoverable cursor-pointer bg-primary py-3 px-5 rounded-2xl'  onClick={()=>this.loadPage('register')}>
                <span className='align-middle text-xl text-white font-light tracking-wider'>?????????????????????????????????</span>
              </div>
            </div>
          </div>
          
        </nav>
      </>
    );
  }
}
export default withRouter(Navbar);
