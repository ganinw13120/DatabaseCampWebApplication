import React from 'react';
import Person from '../../../assets/personwithlaptop.png';
import Bulb from '../../../assets/landing-bulb.png';

export default class Title extends React.Component<any, any> {
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
        <div className='wavediv w-full h-screen -mt-2'>
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
                  <div className='mt-10 w-44 cursor-pointer bg-primary py-4 px-5 rounded-2xl text-center'>
                    <span className='align-middle text-xl text-white font-normal tracking-wider'>สมัครสมาชิก</span>
                  </div>
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
