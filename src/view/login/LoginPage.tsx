import { Component } from 'react';
import BaseView from '@view/BaseView';
import FullLogo from '@assets/high-res-full-logo.png';
import LoginViewModel from '@view-model/auth/LoginViewModel';
import { Form, Input, Button  } from 'antd';
import { KeyOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import validateEmail from '@util/validateEmail';
import IAppStore from '@store/stores/AppStore/IAppStore';
import IAuthStore from '@store/stores/AuthStore/IAuthStore';
import IAuthViewModel from '@view-model/auth/IAuthViewModel';

export interface ILoginPage extends BaseView {
  props : LoginProps
}

interface LoginProps extends RouteComponentProps {
  appStore ?: IAppStore
  authStore ?: IAuthStore
}

interface LoginComponentState {
  isLoading: boolean
  displayText : string
}

@inject('appStore')
@inject('authStore')

@observer
class LoginPage extends Component<LoginProps, LoginComponentState>
  implements ILoginPage {
  
  private loginViewModel: IAuthViewModel;
  
  public constructor(props: LoginProps) {
    super(props);
    this.props.appStore?.setPercent(0)

    const loginViewModel = new LoginViewModel();
    
    this.loginViewModel = loginViewModel;

    
    this.state = {
      displayText : loginViewModel.getDisplayText(),
      isLoading : loginViewModel.getIsLoadng()
    }
  }
  
  public componentDidMount(): void {
    this.loginViewModel.attachView(this);
    this.props.appStore?.setPercent(100)
  }

  public onViewModelChanged(): void {
    this.setState({
      displayText : this.loginViewModel.getDisplayText(),
      isLoading : this.loginViewModel.getIsLoadng()
    })
  }

  public render(): JSX.Element {
    const { isLoading, displayText } = this.state
    return (
      <>
        <Form
          ref={this.loginViewModel.getFormRef()}
          name="basic"
          onFinish={this.loginViewModel.OnFinish}
          autoComplete="off"
        >
            <div className="grid  md:grid-cols-2 h-screen font-prompt bg-bg">
              <div className='md:flex hidden flex bg-primary text-white text-center align-middle justify-center ' style={{boxShadow:'0 0px 4px #000'}}>
                <img src={FullLogo} alt="Logo" className='w-3/6 mx-auto my-auto text-center' />
              </div>
              <div className='text-center align-middle justify-center my-auto'>
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
                      <Form.Item name="email" rules={[{validator : validateEmail}] }>
                        <Input className='mt-3 h-12 w-full' size="large" placeholder="อีเมล" prefix={<UserOutlined  className='mr-3'/>} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='text-base font-normal tracking-wider pt-10 w-full mb-8'>
                    <div>
                      <span >รหัสผ่าน :</span>
                    </div>
                    <div className='w-full'>
                    <Form.Item name="password" rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน'}]} className='w-full'>
                        <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} className='mt-3 h-12 ' size="large" placeholder="รหัสผ่าน" prefix={<KeyOutlined  className='mr-3'/>}  />
                      </Form.Item>
                    </div>
                </div>
                  <p className='no-underline text-red-500 h-8'>{displayText || ' '}</p>
                  <div className={`bg-${isLoading ? 'gray' : 'primary'} h-14 rounded-xl mt-4`}>
                    <Button disabled={isLoading} htmlType="submit" className='w-full h-24 bg-primary' style={{height: '100%'}} ghost size='large'><span className='text-base text-white font-light tracking-wider '>เข้าสู่ระบบ</span></Button>
                  </div>
                  <div className="mt-5 h-14 text-center cursor-pointer" onClick={this.loginViewModel.onChangePage}>
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

export default withRouter(LoginPage);