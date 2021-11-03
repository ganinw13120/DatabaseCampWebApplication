import React from 'react';
import bulb from '../../../assets/bulb.png';
export default class Hintbox extends React.Component <any, any> {
  public render(): JSX.Element {
    return (<>
      <div className='rounded-lg bg-bg w-30 h-auto pb-10 p-4 w-5/6 mx-auto'  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
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
        <HintText />
      </div>
      
    </>)
  }
}

class HintText extends React.Component<any, any> {
  public render(): JSX.Element {
    return (<>
        <div className='font-sarabun text-base text-wrap tracking-wider'>
          <span>- เนื่องจากสมชาย ต้องกาองจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมย่างงี้ </span>
        </div>
    </>)
  }
}