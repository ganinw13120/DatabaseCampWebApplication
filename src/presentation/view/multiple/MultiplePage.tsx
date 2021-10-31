import React from 'react';
import BaseView from '../BaseView';
import bulb from '../../assets/bulb.png';
// import bulb2 from '../../assets/bulb2.png';
// import check from '../../assets/check.png';
export interface MultipleComponentState {

}

export default class MultiplePage extends React.Component<any, MultipleComponentState>
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
           <span>กิจกรรม (2/5)</span>
         </div>
         <br></br>
         <div className='text-xl bg-red-500 text-black font-sarabun tracking-wider w-68 py-6  pt-32 -mx-80 px-24'>
           <span>สมชายควรจะ</span>
         </div>
         <br></br><br></br><br></br>
         <div className=''>
         <div className='flex'>
           <div className='text-normal text-black font-semibold tracking-wider w-68 py-6 mx-20 pt-48 inline flex'style={{marginLeft:100}}>
             <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray  mx-12  "></div>
               <div className='pt-2'>
                <span>สมชายต้องจ้างนายคนนั้น และนายคนนี้มาบริหาร</span>
                </div>
          </div>
         </div>
         <div className='flex'>
           <div className='text-normal text-black font-semibold tracking-wider w-68 py-6 mx-20 inline flex'style={{marginLeft:100}}>
             <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray  mx-12  "></div>
               <div className='pt-2'>
                <span>สมชายต้องจ้างนายคนนั้น และนายคนนี้มาบริหาร</span>
                </div>
          </div>
         </div>
         <div className='flex'>
           <div className='text-normal text-black font-semibold tracking-wider w-68 py-6 mx-20 inline flex'style={{marginLeft:100}}>
             <div className="rounded-full h-9 w-9 flex items-center justify-center bg-darkPrimary  mx-12 "></div>
              <div className='pt-2'>
                <span>สมชายต้องจ้างนายคนนั้น และนายคนนี้มาบริหาร</span>
             </div>
          </div>
         </div>
          <div className='flex'>
           <div className='text-normal text-black font-semibold tracking-wider w-68 py-6 mx-20 inline flex'style={{marginLeft:100}}>
             <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray  mx-12 "></div>
             <div className='pt-2'>
                <span>สมชายต้องจ้างนายคนนั้น และนายคนนี้มาบริหาร</span>
            </div>
           </div>
          </div>
         </div>
         
         
         
         
       </div>
       <div className='flex'>
       <div className='flex-none bg-Orange h-14 w-36 align-center my-auto ml-7 rounded-xl   'style={{marginLeft:250}}>
                <div className=' font-semibold text-darkPrimary text-center ' style={{marginTop:2}}>
                  คำใบ้
                  { <img src={bulb} alt="Logo4" className='inline -mx-9' style={{marginLeft:3}} /> }
                </div>
                
              </div>
              <div className='flex-none bg-Green h-14 w-36 align-center my-auto  rounded-xl   'style={{marginLeft:40}}>
                <div className=' font-semibold text-darkPrimary text-center pt-2' style={{marginTop:3}}>
                  ตรวจคำตอบ
                  {/* <img src={check} alt="Logo4" className='inline -mx-5' style={{marginLeft:1}} /> */}
                </div>
                
              </div>
              </div>

             

        
             
          </div>
        </div>
        
      </>
    );
  }
}