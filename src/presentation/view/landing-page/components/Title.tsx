import React from 'react';
import Person from '../../../assets/personwithlaptop.png';
import Bulb from '../../../assets/landing-bulb.png';
import Wave from '../../../assets/wave.svg';

export default class Title extends React.Component<any, any> {

  public render(): JSX.Element {
    return (
      <>
        <div>
          <div className='w-full h-full padding-landing grid grid-cols-2 font-prompt'>
            <div className='my-auto'>
              <div className=''>
                <div className='title-text landing-container absolute'>
                  <div>
                    <span className='shadow-text text-6xl text-black font-light tracking-wider'>เรียน</span>
                    <span className='shadow-text text-6xl text-darkPrimary font-normal tracking-wider ml-4'>Database Design</span>
                  </div>
                  <div className='mt-10'>
                    <span className='shadow-text text-5xl text-black font-light tracking-wider'>เริ่มต้นได้เลยที่นี่!</span>
                  </div>
                  <div className='mt-10 w-44 cursor-pointer bg-primary py-4 px-5 rounded-2xl text-center'>
                    <span className='align-middle text-xl text-white font-normal tracking-wider'>สมัครสมาชิก</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full h-full my-auto  landing-container '>
              <div className='mt-10 absolute right-0 bulb'>
                <div className='bulb-container'>
                  <img src={Bulb} alt="Logo" className=' mx-auto' />
                </div>
              </div>
              <div className='mt-10'>
                <img src={Person} alt="Logo" className='mx-auto' />
              </div>
            </div>
          </div>
          <div className='absolute inset-x-0 -bottom-16'>
            <img src={Wave} alt="Logo" className='w-full'/>
          </div>
        </div>
      </>
    );
  }
}
