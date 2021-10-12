import React from 'react';
import BaseView from '../BaseView';
import FullLogo from '../../assets/full-logo.png';
import AuthViewModel from '../../view-model/auth/AuthViewModel';
import { Form, Input, Button  } from 'antd';
import { KeyOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export interface LoginComponentState {
  isLoading: boolean
  displayText : string
}

export default class LoginPage extends React.Component<any, LoginComponentState>
  implements BaseView {
  
  private authViewModel: AuthViewModel;
  
  public constructor(props: any) {
    super(props);
    const authViewModel = new AuthViewModel();
    this.authViewModel = authViewModel;
    
    this.state = {
      displayText : authViewModel.displayText,
      isLoading : authViewModel.isLoading
    }
  }
  
  public componentDidMount(): void {
    this.authViewModel.attachView(this);
  }

  public onViewModelChanged(): void {
    this.setState({
      displayText : this.authViewModel.displayText,
      isLoading : this.authViewModel.isLoading
    })
  }

  onFinishFailed = () => {

  }

  public render(): JSX.Element {
    const { isLoading, displayText } = this.state
    return (
      <>
        <Form
          ref={this.authViewModel.formRef}
          name="basic"
          onFinish={this.authViewModel.OnFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
            <div className="grid  md:grid-cols-2 h-screen font-prompt bg-bg">
              <div className='md:flex hidden flex bg-primary text-white text-center align-middle justify-center ' style={{boxShadow:'0 4px 4px #000'}}>
                <img src={FullLogo} alt="Logo" className='w-3/6 mx-auto my-auto text-center' />
              </div>
              <div className='text-center align-middle justify-center pt-32'>
                <div className="w-5/6 md:w-4/6 lg:w-3/6 text-left mx-auto my-auto">
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
                    <div>
                      <span >อีเมล :</span>
                    </div>
                    <div>
                      <Form.Item name="email" rules={[{ required: true, message: 'กรุณากรอกอีเมล'}]}>
                        <Input className='mt-5 h-14 w-full' size="large" placeholder="  อีเมล" prefix={<UserOutlined />} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='text-base font-normal tracking-wider pt-10 w-full mb-8'>
                    <div>
                      <span >รหัสผ่าน :</span>
                    </div>
                    <div className='w-full'>
                      <Form.Item name="password" rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]} className='w-full'>
                        <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} className='mt-5 h-14 ' size="large" placeholder="  รหัสผ่าน" prefix={<KeyOutlined />}  />
                      </Form.Item>
                    </div>
                </div>
                  <p className='no-underline text-red-500 h-8'>{displayText || ' '}</p>
                  <div className={`bg-${isLoading ? 'gray' : 'primary'} h-14 rounded-xl mt-4`}>
                    <Button disabled={isLoading} htmlType="submit" className='w-full h-24 bg-primary' style={{height: '100%'}} ghost size='large'><span className='text-base text-white font-light tracking-wider '>เข้าสู่ระบบ</span></Button>
                  </div>
                  <div className="mt-5 h-14 text-center">
                    <span className='text-base text-darkPrimary font-light tracking-wider '>สมัครสมาชิก</span>
                  </div>
                </div>
              </div>
            </div>
        </Form>
      </>
    );
  }
}
