import React from 'react';
import Circle from '@assets/circle.svg';
import About1 from '@assets/about-1.png';
import About2 from '@assets/about-2.png';

export default class About extends React.Component<any, any> {

  public constructor(props: any) {
    super(props);
    this.state = {
      offsetY : 0
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
  public render(): JSX.Element {
    const { offSetY } = this.state;
    return (
      <>
        <div id='about' className='font-prompt flip-wavediv w-full -mt-1 mb-10 z-10'>
          <div className='h-auto w-full md:pt-16 lg:pt-32 '>
            <div className='w-full text-center' >
              <span className='border-white mx-auto shadow-text text-3xl md:text-4xl lg:text-5xl text-white font-semibold tracking-wider'  style={{borderBottom:'0.7px solid #FFFFFF'}}>เกี่ยวกับเรา</span>
            </div>
          </div>
          <div className='mt-32'>
            <div className='float-right margin-circle'>
              <img  style={{ transform: `translateY(${offSetY * .1}px)`, transition : 'transform 0.5s' }} src={Circle} alt="Logo" className='z-0 w-2/3  opacity-50' />
            </div>
            <div  className='float-right pt-10'>
              <img  style={{ transform: `translateY(${offSetY * .15}px)`, transition : 'transform 0.5s' }} src={Circle} alt="Logo" className='z-0' />
            </div>
          </div>
          <div className='md:grid md:grid-cols-2 w-full'>
            <div className='landing-container p-4 w-full'>            
              <img src={About1} alt="Logo"/>
            </div>
            <div className='landing-container p-4 w-full my-auto'>
              <div className='pl-10'>
                <span className='text-2xl md:text-2xl lg:text-4xl text-darkPrimary font-light tracking-wider'>สอนเกี่ยวกับ</span>
              </div>
              <div className='flex space-x-4 mt-10'>
                <div className='text-4xl md:text-5xl text-darkPrimary font-semibold tracking-wider'>
                  <span className='w-10 bg-darkPrimary'>..</span>
                </div>
                <div className='text-4xl md:text-5xl text-darkPrimary font-semibold tracking-wider'>
                  <span>Database Design</span>
                </div>
              </div>
              <div className='mt-10 pl-10'>
                <span className='text-lg md:text-xl lg:text-2xl text-darkPrimary font-light tracking-wider z-10'>
                  รู้ที่จะออกแบบฐานข้อมูลอย่างถูกต้อง
                  ช่วยให้งานของคุณราบรื่น
                </span>
              </div>
            </div>
          </div>
          <div className='md:grid md:grid-cols-2 w-screen mt-16 bg-bg'>
            <div className='md:order-2 landing-container p-4 w-full'>            
              <img src={About2} alt="Logo"/>
            </div>
            <div className='text-right landing-container p-4 w-full my-auto '>
              <div className='pl-10 pr-20'>
                <span className='text-2xl md:text-2xl lg:text-4xl text-darkPrimary font-light tracking-wider'>เรียนไปทำไป</span>
              </div>
              <div className='ml-auto flex space-x-4 mt-10 pr-10'>
                <div className='flex-grow'></div>
                <div className='text-4xl md:text-5xl text-darkPrimary font-semibold tracking-wider'>
                  <span>Learning By Doing</span>
                </div>
                <div className='text-4xl md:text-5xl text-darkPrimary font-semibold tracking-wider'>
                  <span className='w-10 bg-darkPrimary'>..</span>
                </div>
              </div>
              <div className='mt-10 pl-10 pr-20'>
                <span className='text-lg md:text-xl lg:text-2xl text-darkPrimary font-light tracking-wider'>
                เรียนรู้ผ่านการทำกิจกรรม
                เพื่อสร้างความชำนาญ
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
