import React from 'react';
import DarkLogo from '../../../assets/dark-logo.png';

export default class LandingPage extends React.Component<any, any> {

  public render(): JSX.Element {
    return (
      <>
        <nav className="hidden md:block navbar font-prompt padding-landing">
          <div className='navbar-container h-full w-full flex'  style={{borderBottom:'0.5px solid #BBBFC0'}}>
            <div className='flex-none h-full py-7 w-auto'>
                  <img src={DarkLogo} alt="Logo" className='h-full w-auto' />
            </div>
            <div className='flex-grow'>
            </div>
            <div className='flex-none my-auto w-auto flex'>
              <div className='item-space '>
                <span className='hoverable-text p-2 align-middle text-l text-darkPrimary font-medium tracking-wider'>หน้าหลัก</span>
              </div>
              <div className='item-space'>
                <span className='hoverable-text p-2 align-middle text-l text-darkPrimary font-medium tracking-wider'>เกี่ยวกับ</span>
              </div>
              <div className='item-space'>
                <span className='hoverable-text p-2 align-middle text-l text-darkPrimary font-medium tracking-wider'>เนื้อหา</span>
              </div>
            </div>
            <div className='flex-none my-auto w-auto flex'>
              <div className='ml-20 mr-8'>
                <span className='hoverable-text p-2 align-middle text-l text-darkPrimary font-medium tracking-wider'>เข้าสู่ระบบ</span>
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
