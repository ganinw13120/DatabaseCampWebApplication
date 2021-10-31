import React from 'react';
import DarkLogo from '../../../assets/dark-logo.png';

export default class LandingPage extends React.Component<any, any> {

  public constructor(props: any) {
    super(props);
    this.state = {
      offsetY : 0
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.setState({ offSetY: window.pageYOffset });
    });
  }
  public render(): JSX.Element {
    const { offSetY } = this.state;
    return (
      <>
        <nav className={`z-20 hidden md:block md:sticky md:inset-x-0 md:top-0 navbar font-prompt padding-landing`} style={{backgroundColor : offSetY ? '#BBBFC0' : '', transition : 'all 0.5s'}}>
          <div className='navbar-container h-full w-full flex'  style={{borderBottom: `0.5px solid #BBBFC0`}}>
            <div className='flex-none h-full py-7 w-auto'>
                  <img src={DarkLogo} alt="Logo" className='h-full w-auto' />
            </div>
            <div className='flex-grow'>
            </div>
            <div className='flex-none my-auto w-auto flex'>
              <div className='item-space '>
                <span className='cursor-pointer p-2 align-middle text-l text-darkPrimary font-medium tracking-wider'>หน้าหลัก</span>
              </div>
              <div className='item-space'>
                <span className='cursor-pointer p-2 align-middle text-l text-darkPrimary font-medium tracking-wider'>เกี่ยวกับ</span>
              </div>
              <div className='item-space'>
                <span className='cursor-pointer p-2 align-middle text-l text-darkPrimary font-medium tracking-wider'>เนื้อหา</span>
              </div>
            </div>
            <div className='flex-none my-auto w-auto flex'>
              <div className='ml-20 mr-8'>
                <span className='cursor-pointer p-2 align-middle text-l text-darkPrimary font-medium tracking-wider'>เข้าสู่ระบบ</span>
              </div>
            </div>
            <div className='flex-none my-auto w-auto flex'>
              <div className='cursor-pointer bg-primary py-3 px-5 rounded-2xl'>
                <span className='align-middle text-l text-white font-light tracking-wider'>สมัครสมาชิก</span>
              </div>
            </div>
          </div>
          
        </nav>
      </>
    );
  }
}
