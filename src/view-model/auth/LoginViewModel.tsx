import React from 'react';
import IAuthViewModel from './IAuthViewModel';
import BaseView from '@view/BaseView';
import { FormInstance } from 'antd/es/form';


export default class LoginViewModel implements IAuthViewModel {

  public formRef?: React.RefObject<FormInstance<any>>;
  public displayText: string;
  public isLoading: boolean;

  private baseView?: BaseView;

  public constructor() {
    this.isLoading = false;
    this.displayText = '';
    this.formRef = React.createRef<FormInstance>();
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public OnFinish = async (): Promise<void> => {
    this.isLoading = true;
    this.baseView?.onViewModelChanged();
    await this.baseView?.props.authStore.Login(
      this.formRef?.current?.getFieldValue("email"),
      this.formRef?.current?.getFieldValue("password"),
      async (res: { issuccess: boolean, message: string }) => {
        if (res.issuccess) {
          this.baseView?.props?.history?.push('/overview');
        } else {
          this.isLoading = false;
          this.displayText = res.message;
          this.baseView?.onViewModelChanged();
        }
      }
    )
  }

  public OnClickRegister = (): void => {
    this.baseView?.props?.history?.push('/register');
  }
}
