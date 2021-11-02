import React from 'react';
import BaseView from '../BaseView';
import bulb from '../../assets/bulb.png';
// import bulb2 from '../../assets/bulb2.png';
// import check from '../../assets/check.png';
import './matching.css';
export interface MatchingComponentState {
  width: number
}

export default class MatchingPage extends React.Component<any, MatchingComponentState>
  implements BaseView {
  public onViewModelChanged(): void {
  }
  public render(): JSX.Element {
    return (
      <>
        <div className='grid grid-cols-2 w-full h-full bg-bg-dark'>
          <Requirement />
          <div className='py-12'>
            <div className='flex h-auto'>
              <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
                <span className='w-full h-full bg-darkPrimary'>..</span>
              </div>
              <div className='w-96 py-6 -mx-4'>
                <span className=' text-3xl text-darkPrimary font-semibold tracking-wider'>กิจกรรม (1/5)</span> <span className=' text-lg text-success font-semibold tracking-wider'> + 15 Points</span>
              </div>
            </div>
            <div className='text-xl text-black font-sarabun tracking-wider mx-14 my-8'>
                <span>จงจับคู่คำต่อไปนี้</span>
            </div>
            <div className='text-xl text-Redwrong font-semibold font-prompt tracking-wider mx-14 my-8'>
                <span>จงจับคู่คำต่อไปนี้</span>
            </div>
            <HintBox />
          </div>
        </div>

      </>
    );
  }
}

class HintBox extends React.Component <any, any> {
  public render(): JSX.Element {
    return (<>
      <div className='rounded-lg bg-bg w-30 h-1/4 p-4 w-3/4 mx-auto'  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
        <div className='flex h-auto'>
          <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='w-96 py-6 -mx-4 flex'>
            <span className=' text-xl text-darkPrimary font-semibold tracking-wider'>คำใบ้ </span>
              <img src={bulb} alt="Logo4" className='-m-4 pl-4 pr-8' style={{ marginLeft: 3 }} />
            <span className=' text-lg text-Redwrong font-semibold tracking-wider'> -50 Points  (-30%)</span>
          </div>
        </div>
      </div>
      
    </>)
  }
}

class Requirement extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);

    this.state = { width: 0 };
  }
  componentDidMount() {
    this.getDimensions();
    window.addEventListener('resize', this.getDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions);
  }

  getDimensions = () => {
    this.setState({ width: window.innerWidth });
  }
  public render(): JSX.Element {
    const { width } = this.state;
    return (<>
      <div className='bg-white py-4' style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)' }}>
        <div className='text-lg text-darkPrimary w-96 font-semibold tracking-wider pt-4 px-10'>
          <span>เนื้อหา - Database Entity</span>
        </div>
        <div className='flex h-auto'>
          <div className='w-10 text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
            <span className='w-full h-full bg-darkPrimary'>..</span>
          </div>
          <div className='w-96 text-3xl text-darkPrimary font-semibold tracking-wider py-6 -mx-4'>
            <span>ความต้องการของระบบ</span>
          </div>
        </div>
        <div className='font-sarabun text-xl text-wrap mx-auto mt-10 tracking-wider' style={{ width: width * 0.8 * 0.5 * 0.8 }}>
          <span>เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ </span>
          <span>เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ </span>
        </div>
      </div>
    </>)
  }
}