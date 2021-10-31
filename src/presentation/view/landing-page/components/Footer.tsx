import React from 'react';

import FullLogo from "../../../assets/full-logo.png";
import Kmutt from "../../../assets/kmutt-logo.svg";
import { CopyrightOutlined } from '@ant-design/icons';

export default class Footer extends React.Component<any, any> {

  public render(): JSX.Element {
    return (
      <>
        <div className='w-full pb-10 bg-primary landing-container pt-16  font-prompt'>
          <div className='md:grid md:grid-cols-4 py-10'  style={{borderBottom:'2px solid #BBBFC0'}}>
            <div className='col-span-1'>
              <img src={FullLogo} alt="Database Camp" className='w-3/4 mx-auto' />
            </div>
            <div className='col-span-1'>
              <div className='w-3/4 mx-auto  mt-16 md:mt-0'>
                <p className='w-auto text-xl md:text-3xl text-white font-normal'>Content</p>
                <p className='mt-5 w-auto text-xl md:text-2xl text-white font-extralight'>หน้าหลัก</p>
                <p className='w-auto text-xl md:text-2xl text-white font-extralight'>เกี่ยวกับ</p>
                <p className='w-auto text-xl md:text-2xl text-white font-extralight'>เนื้อหา</p>
              </div>
            </div>
            <div className='col-span-2 pb-16 mt-16 md:mt-0'>
              <div className='w-3/4 mx-auto  '>
                <p className='w-auto text-xl md:text-3xl text-white font-normal'>Contact</p>
                <p className='mt-5 w-auto text-xl md:text-2xl text-white font-extralight'>อาคารวิศววัฒนะ (Witsawawatthana Building) แขวงบางมด เขตทุ่งครุ กรุงเทพมหานคร 10140</p>
                <p className='w-auto text-xl md:text-2xl text-white font-extralight'>Email : support@databasecamp.io</p>
                <p className='w-auto text-xl md:text-2xl text-white font-extralight'>Facebook : Database Camp</p>
              </div>
            </div>
          </div>
          <div className='md:grid md:grid-cols-4'>
            <div className='col-span-2 ml-16 md:ml-20 my-10 flex'>
              <img src={Kmutt} alt="Database Camp" className='w-16 md:w-28' />
              <div className='block my-auto pt-10 ml-10'>
                  <p className='md:text-2xl text-white font-light'>King mongkut's university of technology thonburi</p>
                  <p className='md:text-2xl text-white font-light'>Computer engineering</p>
              </div>
            </div>
            <div className='col-span-2 pt-10 md:pt-0 my-10 flex w-3/4 mx-auto my-auto '>
              <CopyrightOutlined className='md:text-2xl text-white pt-1' style={{color : '#FFFFFF'}} />
              <p className=' ml-4 md:text-2xl text-white font-light'>2021 DataBase Camp</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
