import React from 'react';
import Person from '@assets/personwithlaptop.png';
import Bulb from '@assets/landing-bulb.png';
import { withRouter } from 'react-router-dom';

class Title extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      offSetY : 0
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll () :void {
    this.setState({ offSetY: window.pageYOffset });
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }
  loadPage(url: string) {
    this.props.history.replace('/' + url);
  }
  public render(): JSX.Element {
    const { offSetY } = this.state;
    return (
      <>
        <div id='title' className='wavediv w-full h-screen -mt-2'>
          <div className=' w-full h-full padding-landing grid grid-cols-1 md:grid-cols-2 font-prompt'>
            <div className='my-auto z-10'>
              <div className=''>
                <div className='title-text landing-container'>
                  <div>
                    <span className='shadow-text text-3xl md:text-6xl text-black font-light tracking-wider'>เรียน</span>
                    <span className='shadow-text text-3xl md:text-6xl text-darkPrimary font-normal tracking-wider ml-4'>Database Design</span>
                  </div>
                  <div className='mt-10'>
                    <span className='shadow-text text-xl md:text-5xl text-black font-light tracking-wider'>เริ่มต้นได้เลยที่นี่!</span>
                  </div>
                  <button aria-label='Register' className='hoverable mt-10 w-44 cursor-pointer bg-primary py-4 px-5 rounded-2xl text-center' style={{boxShadow:  '0 4px 4px rgba(0, 0, 0, 0.25)' }} onClick={()=>this.loadPage('register')}>
                    <span className='align-middle text-xl text-white font-normal tracking-wider'>สมัครสมาชิก</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='my-auto absolute md:relative opacity-50 md:opacity-100'>
              <div className='mt-10 absolute right-0 bulb'>
                <div className='bulb-container'>
                  <img src={Bulb} alt="Logo" className=' mx-auto' style={{ transform: `translateY(${offSetY * .3}px)`, transition : 'transform 0.5s' }} />
                </div>
              </div>
              <div className='mt-10'>
                <img src={Person} alt="Logo" className='mx-auto' />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Title);