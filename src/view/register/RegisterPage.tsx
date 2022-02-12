// RegisterPage.tsx
/**
 * This file contains components, relaed to register page.
*/

import { Component } from 'react';
import BaseView from '@view/BaseView';
import FullLogo from '@assets/high-res-full-logo.png';
import RegisterViewModel from '@view-model/auth/RegisterViewModel';
import { Form, Input, Button  } from 'antd';
import { KeyOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import validateName from '@util/validateName';
import validateEmail from '@util/validateEmail';
import validatePassword from '@util/validatePassword';
import { AppStore } from '@store/stores/AppStore/AppStore';
import { AuthStore } from '@store/stores/AuthStore/AuthStore';
import IAuthViewModel from '@view-model/auth/IAuthViewModel';

export interface IRegisterPage extends BaseView {
  props : RegisterProps
}

interface RegisterProps extends RouteComponentProps {
  appStore ?: AppStore,
  authStore ?: AuthStore
}

interface RegisterComponentState {
  isLoading: boolean
  displayText : string
}

@inject('appStore')
@inject('authStore')
@observer
class RegisterPage extends Component<RegisterProps, RegisterComponentState>
  implements IRegisterPage {
  
  private viewModel: IAuthViewModel;
  
  public constructor(props: RegisterProps) {
    super(props);
    this.props.appStore?.setPercent(0)

    const viewModel = new RegisterViewModel();
    
    this.viewModel = viewModel;

    this.state = {
      displayText : viewModel.getDisplayText(),
      isLoading : viewModel.getIsLoadng(),
    }
  }
  

  /**
   * On component did mount, set application store, and attach view-model
   *
   * @remarks
   * This is a part of view component.
   *
   */
  public componentDidMount(): void {
    this.viewModel.attachView(this);
    this.props.appStore?.setPercent(100)
  }

  /**
   * On view-model changes, update view states.
   *
   * @remarks
   * This is a part of view component.
   *
   */
  public onViewModelChanged(): void {
    this.setState({
      displayText : this.viewModel.getDisplayText(),
      isLoading : this.viewModel.getIsLoadng()
    })
  }

  public render(): JSX.Element {
    const { isLoading, displayText } = this.state
    return (
      <>
        <Form
          ref={this.viewModel.getFormRef()}
          name="basic"
          onFinish={this.viewModel.OnFinish}
          autoComplete="off"
        >
            <div className="grid  md:grid-cols-2 h-screen font-prompt bg-bg">
              <div className='md:flex hidden flex bg-primary text-white text-center align-middle justify-center ' style={{boxShadow:'0 4px 4px #000'}}>
                <img src={FullLogo} alt="Logo" className='w-3/6 mx-auto my-auto text-center' />
              </div>
              <div className='flex text-center align-middle justify-center pt-10'>
                <div className="w-5/6 md:w-4/6 lg:w-3/6 text-left mx-auto my-auto">
                  <div className='flex space-x-4'>
                    <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                      <span className='w-10 bg-darkPrimary'>..</span>
                    </div>
                    <div className='text-3xl text-darkPrimary font-semibold tracking-wider'>
                      <span>สมัครสมาชิก</span>
                    </div>
                  </div>
                  <div className='text-base text-darkPrimary font-normal tracking-wider pt-7'>
                    <span>กรุณากรอกข้อมูลเพื่อสมัครสมาชิก</span>
                  </div>
                  <div className='text-base text-darkPrimary font-normal tracking-wider pt-7'>
                  <div>
                    <span >ชื่อ :</span>
                  </div>
                  <div>
                    <Form.Item name="name" rules={[{validator : validateName}]}>
                      <Input className='mt-3 h-12 w-full' size="large" placeholder="ชื่อ" prefix={<UserOutlined className='mr-3'/>} />
                    </Form.Item>
                  </div>
                </div>
                  <div className='text-base text-darkPrimary font-normal tracking-wider '>
                    <div>
                      <span >อีเมล :</span>
                    </div>
                    <div>
                      <Form.Item name="email" rules={[{validator : validateEmail}]}>
                        <Input className='mt-3 h-12 w-full' size="large" placeholder="อีเมล" prefix={<UserOutlined className='mr-3'/>} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='text-base font-normal tracking-wider  w-full mb-8'>
                    <div>
                      <span >รหัสผ่าน :</span>
                    </div>
                    <div className='w-full'>
                      <Form.Item name="password" rules={[{validator : validatePassword}]} className='w-full'>
                        <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} className='mt-3 h-12 ' size="large" placeholder="รหัสผ่าน" prefix={<KeyOutlined className='mr-3'/>}  />
                      </Form.Item>
                    </div>
                </div>
                <div className='text-base font-normal tracking-wider  w-full mb'>
                <div>
                  <span >ยีนยันรหัสผ่าน :</span>
                </div>
                <div className='w-full'>
                  <Form.Item
                    name="password_comfirmation"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: 'กรุณากรอกยืนยันรหัสผ่าน',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน'));
                        },
                      }),
                    ]}
                    className='w-full'>
                    <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} className='mt-3 h-12 ' size="large" placeholder="รหัสผ่าน" prefix={<KeyOutlined className='mr-3'/>}  />
                  </Form.Item>
                </div>
                </div>
                  <p className='no-underline text-red-500 h-8'>{displayText || ' '}</p>
                  <div className={`bg-${isLoading ? 'gray' : 'primary'} h-14 rounded-xl mt-4`}>
                    <Button disabled={isLoading} htmlType="submit" className='w-full h-24 bg-primary' style={{height: '100%'}} ghost size='large'><span className='text-base text-white font-light tracking-wider '>สมัครสมาชิก</span></Button>
                  </div>
                  <div className="mt-5 h-14 text-center cursor-pointer">
                    <span onClick={this.viewModel.onChangePage} className='text-base text-darkPrimary font-light tracking-wider '>เข้าสู่ระบบ</span>
                  </div>
                </div>
              </div>
            </div>
        </Form>
      </>
    );
  }
}

export default withRouter(RegisterPage);