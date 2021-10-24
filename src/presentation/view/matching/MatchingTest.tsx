import React from 'react';
import BaseView from '../BaseView';
import 'semantic-ui-css/semantic.min.css'
import { Progress } from 'semantic-ui-react'
export interface matchingComponentState {

}

export default class OverviewPage extends React.Component<any, matchingComponentState>
  implements BaseView {

  public constructor(props: any) {
    super(props);

  }

  public componentDidMount(): void {
  }

  public onViewModelChanged(): void {
  }

  onFinishFailed = () => {
  }

  public render(): JSX.Element {
    return (
      <>
      <div className='text-lg text-darkPrimary font-semibold tracking-wider pt-4 px-10'>
              <span>เนื้อหา - Database Entity</span>
            </div>
        <div className="font-prompt w-4/6 p-6 px-10">
       
          <div className='flex h-auto space-x-4'>
            <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
              <span className='w-full bg-darkPrimary'>..</span>
            </div>
          
          </div>
         
        </div>
        
        <div className="font-prompt  ">
          <div className='flex h-full space-x-4'>
           
          </div>
          <div className='w-4/6 h-auto text-center align-auto mt-10'>
            <div className='bg-primary w-3/6 h-full flex align-auto' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className="font-prompt w-full p-6 px-10">
       
       <div className='flex h-auto w-full space-x-4'>
         <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
           <span className='w-full h-full bg-darkPrimary'>..</span>
         </div>
         <div className='text-3xl text-darkPrimary font-semibold tracking-wider w-full'>
           <span>ความต้องการของระบบ</span>
         </div>
       </div>
       <div className='mt-10 w-3/6'>
         <span>เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย </span>
       </div>
       <br></br>
       <div className = 'w-3/6'>
       <span>เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ </span>
         </div>
     </div>
              <div className='flex-none bg-white h-3/6 w-36 align-middle my-auto ml-7 rounded'>
                <div className=' font-semibold' style={{marginTop:8}}>
                  เรียนต่อ
                </div>
              </div>
              <div className='flex-none my-auto ml-5 text-white text-xl tracking-wider'>
                <span>Database Relationship</span>
              </div>
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
                <span>( ER Model )</span>
              </div>
              <div className='flex-none w-auto xl:w-2/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
                <div className='hidden xl:flex flex-grow mr-10 my-auto align-middle'>
                  <div className='mt-5 w-full'>
                  <Progress percent={30} color='green' size='small'/>
                  </div>
                </div>
                <div className='flex-grow xl:flex-none my-auto'>
                  <span className=''>30%</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        

      </>
    );
  }
}