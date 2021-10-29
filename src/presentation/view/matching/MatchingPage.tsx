import React from 'react';
import BaseView from '../BaseView';
import bulb from '../../assets/bulb.png';
import bulb2 from '../../assets/bulb2.png';
import check from '../../assets/check.png';
export interface MatchingComponentState {

}

export default class MatchingPage extends React.Component<any, MatchingComponentState>
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
    
        <div className='grid grid-cols-2 w-full h-full bg-bg-dark'>
          <div className='w-full bg-bg' style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)' }}>
          <div className='text-lg text-darkPrimary font-semibold tracking-wider pt-4 px-10'>
              <span>เนื้อหา - Database Entity</span>
            </div>
            <div className='flex h-auto w-full '>
         <div className='text-3xl text-darkPrimary font-semibold tracking-wider p-6 px-10'>
           <span className='w-full h-full bg-darkPrimary'>..</span>
         </div>
         <div className='text-3xl text-darkPrimary font-semibold tracking-wider w-full py-6 -mx-4'>
           <span>ความต้องการของระบบ</span>
         </div>
       </div>
       <div className='mt-5 w-5/6 px-10'>
         <span>เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย </span>
       </div>
       <br></br>
       <div className = 'w-5/6 px-10'>
       <span>เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ  เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ ทำให้สมชาย ต้องทำระบบ อย่างโง้น อย่างงี้ เนื่องจากสมชาย ต้องการอย่างโง้น ต้องการอย่างงี้ </span>
         </div>
          </div>

          <div className='w-full'>
          <div className='flex h-auto w-full '>
         <div className='text-3xl text-darkPrimary font-semibold tracking-wider pt-16 px-10'>
           <span className='w-full h-full bg-darkPrimary'>..</span>
         </div>
         <div className='text-3xl text-darkPrimary font-semibold tracking-wider w-68 py-6 -mx-4 pt-16 '>
           <span>กิจกรรม (1/5)</span>
         </div>
         <br></br>
         <div className='text-xl text-black font-sarabun tracking-wider w-68 py-6  pt-32 -mx-80 px-24'>
           <span>จงจับคู่คำต่อไปนี้</span>
         </div>
         <br></br><br></br><br></br>
         <div className='text-normal text-Redwrong font-semibold tracking-wider w-68 py-6 mx-20 pt-72 'style={{marginLeft:135}}>
           <span>ข้อนี้มันผิดยังงี้นะ ยังงี้นะ แล้วก็ยังงี้นะจ๊ะ ข้อนี้มันผิดยังงี้นะ ยังงี้นะ แล้วก็ยังงี้นะจ๊ะ</span>
         </div>
         
       </div>
       <div className='flex'>
       <div className='flex-none bg-Orange h-14 w-36 align-center my-auto ml-7 rounded-xl   'style={{marginLeft:250}}>
                <div className=' font-semibold text-darkPrimary text-center pt-2' style={{marginTop:3}}>
                  คำใบ้
                  <img src={bulb} alt="Logo4" className='inline -mx-9' style={{marginLeft:3}} />
                </div>
                
              </div>
              <div className='flex-none bg-Green h-14 w-36 align-center my-auto  rounded-xl   'style={{marginLeft:40}}>
                <div className=' font-semibold text-darkPrimary text-center pt-2' style={{marginTop:3}}>
                  ตรวจคำตอบ
                  <img src={check} alt="Logo4" className='inline -mx-5' style={{marginLeft:1}} />
                </div>
                
              </div>
              </div>

              <div className='w-full h-auto text-center align-middle mt-10'>
            <div className='bg-bg w-5/6 h-18 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            
            <div className='text-3xl text-darkPrimary font-semibold tracking-wider pt-7 px-10'>
           <span className='w-full h-full bg-darkPrimary'>..</span>
         </div>
              <div className='flex-none my-auto pt-3 -mx-4 text-darkPrimary text-xl font-bold tracking-wider'>
                <span>คำใบ้</span>
              </div>
              
              <div className='hidden md:flex flex-grow text-left my-auto ml-5 text-white tracking-wider'>
              <img src={bulb2} alt="Logo4" className='inline -mx-9' style={{marginLeft:3}} />
              </div>

              <div className='flex-none w-auto xl:w-4/6 text-xl text-right my-auto mr-8 text-white tracking-widest hidden lg:flex h-full'>
             
                <div className='flex-grow xl:flex-none my-auto text-Redwrong font-bold'>
                  <span className=''> -50 Points  (-30 %)</span>
                </div>
              </div>
            </div>
            <div className='bg-bg w-5/6 h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
             <div className=' text-black mx-16 font-medium' style={{marginTop:16}}>
             - หากสมชายต้องการอย่างที่ว่า สมชายควรจะทำอย่างไรเพื่อให้สมชายได้อย่างงี้
                </div>
               
               
            </div>
            <div className='bg-bg w-5/6 h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className=' text-black mx-16 font-medium' style={{marginTop:16}}>
             - หากสมชายต้องการอย่างที่ว่า สมชายควรจะทำอย่างไรเพื่อให้สมชายได้อย่างงี้
                </div>
               
               
            </div>
            <div className='bg-bg w-5/6 h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <div className=' text-black mx-16 font-medium w-6/6' style={{marginTop:16}}>
             - หากสมชายต้องการอย่างที่ว่า สมชายควรจะทำอย่างไรเพื่อให้สมชายได้อย่างงี้
                </div>
            
           
            </div>
            <div className='bg-bg w-5/6 h-20 mx-auto flex align-middle' style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
           
            
            </div>

          </div>
             
          </div>
        </div>
        
      </>
    );
  }
}