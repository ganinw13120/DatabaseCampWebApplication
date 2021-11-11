import React from 'react';

export default class Title extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <>
        <div id='title' className='wavediv w-full font-prompt h-screen'>
          <div className='pt-44'>
             <h1 className='text-center font-semibold  font-prompt text-8xl'>404</h1> 
             <h2 className='text-center font-normal text-darkPrimary font-prompt text-3xl'>ขออภัย ไม่พบหน้าเว็บที่คุณต้องการ</h2> 
             <h2 className='mt-16 text-center font-normal text-darkPrimary font-prompt text-xl'>หน้าเว็บไซต์ดังกล่าวอาจมีการเปลี่ยนที่อยู่ เปลี่ยนชื่อ หรือ URL ไม่ถูกต้อง</h2> 
             <h2 className='text-center font-normal text-darkPrimary font-prompt text-xl'>กรุณาตรวจสอบอีกครั้ง</h2> 
          </div>
        </div>
      </>
    );
  }
}
