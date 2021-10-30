import React from 'react';
import Wave from '../../../assets/wave.svg';

export default class About extends React.Component<any, any> {

  public render(): JSX.Element {
    return (
      <>
        <div className='font-prompt'>
          <div className='h-auto relative'>
            <div className='absolute inset-x-0 top-44 z-10 w-full text-center'>
              <span className='mx-auto shadow-text text-5xl text-white font-light tracking-wider'>เกี่ยวกับ</span>
            </div>
            <div className='flip'>
              <img src={Wave} alt="Logo" className='w-full'/>
            </div>
          </div>
        </div>
      </>
    );
  }
}
