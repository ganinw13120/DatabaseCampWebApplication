import React from 'react';
import bulb from '../../assets/bulb.png';
import Hintbox from './Hintbox';
import Skeleton from '@mui/material/Skeleton';

import { inject, observer } from 'mobx-react';

@inject('learningStore')
@observer
export default class Requirement extends React.Component<any, any> {
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
    const { activityInfo } = this.props.learningStore.store;
    return (<>
      <div className='col-span-4 bg-white py-4 h-auto flex flex-col' style={{ boxShadow: '0 0px 4px rgba(0, 0, 0, 0.25)' }}>
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
        <div className='font-sarabun text-xl text-wrap mx-auto mt-10 tracking-wider' style={{ width: width * 0.8 * 0.4 * 0.85 }}>
          <p>
            {activityInfo ? <>{activityInfo.activity.story}</> : <Skeleton variant='text' className='w-full' />}
          </p>
        </div>
        
        <div className='text-lg text-Redwrong font-semibold font-prompt tracking-wider mx-14 my-8'>
          {/* <span>มันผิดนะ มันผิด ก็มันผิดอ่ะ</span> */}
        </div>
        <div className='mx-auto flex mb-10'>
          <div className='mx-4 bg-Orange text-darkPrimary text-lg font-normal py-4 px-10 pr-16 tracking-wider rounded-xl cursor-pointer flex'  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <span>คำใบ้</span>
            <div>
              <img src={bulb} alt="Logo4" className='h-12 absolute' style={{ marginTop: -7 }} />
            </div>
          </div>
          <div className='mx-4 bg-primary text-white text-lg font-normal py-4 px-10 tracking-wider rounded-xl cursor-pointer'  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'}}>
            ตรวจคำตอบ
          </div>
        </div>
        <div className='mt-auto'>
          {activityInfo && activityInfo.hint.used_hints?.length !== 0 ? <Hintbox /> : ''}
        </div>
      </div>
    </>)
  }
}