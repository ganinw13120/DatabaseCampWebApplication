import React from 'react';
import BaseView from '../BaseView';
import FullLogo from '../../assets/full-logo.png';
import { Input, Button  } from 'antd';
import { KeyOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export interface LoginComponentProps {

}

export interface LoginComponentState {

}

export default class LoginPage extends React.Component<LoginComponentProps, LoginComponentState>
  implements BaseView {
  public constructor(props: LoginComponentState) {
    super(props);
    
  }

  public onViewModelChanged(): void {
    
  }

  public render(): JSX.Element {
    return (
      <>
        <div className="grid  md:grid-cols-2 h-screen font-prompt bg-bg">
          <div className='md:flex hidden flex bg-primary h-full  text-white text-center align-middle justify-center ' style={{boxShadow:'0 4px 4px #000'}}>
            <img src={FullLogo} alt="some example image " className='w-3/6 mx-auto my-auto text-center' />
          </div>
          <div className='h-full text-center align-middle justify-center pt-32'>
            <div className="w-3/6 text-left mx-auto my-auto">
              <div className='flex space-x-4'>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                  <span className='w-10 bg-darkPrimary'>..</span>
                </div>
                <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                  <span>เข้าสู่ระบบ</span>
                </div>
              </div>
              <div className='text-base text-darkPrimary font-normal tracking-wider pt-10'>
                <span>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</span>
              </div>
              <div className='text-base text-darkPrimary font-normal tracking-wider pt-16'>
                <span >อีเมล :</span>
                <Input className='mt-5 h-14 w-3/6' size="large" placeholder="  อีเมล" prefix={<UserOutlined />} />
              </div>
              <div className='text-base font-normal tracking-wider pt-10'>
                <span >รหัสผ่าน :</span>
                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} className='mt-5 h-14 w-3/6' size="large" placeholder="  รหัสผ่าน" prefix={<KeyOutlined />}  />
              </div>
              <div className="bg-primary mt-16 h-14 rounded-xl">
                <Button className='w-full h-24 bg-primary' style={{height: '100%'}} ghost size='large'><span className='text-base text-white font-light tracking-wider '>เข้าสู่ระบบ</span></Button>
              </div>
              <div className="mt-5 h-14 text-center">
                <span className='text-base text-darkPrimary font-light tracking-wider '>สมัครสมาชิก</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
