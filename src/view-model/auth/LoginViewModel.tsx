import React from 'react';
import IAuthViewModel from './IAuthViewModel';
import { ILoginPage } from '@view/login/LoginPage';
import { FormInstance } from 'antd/es/form';


export default class LoginViewModel implements IAuthViewModel {

  private formRef: React.RefObject<FormInstance<any>>;
  private displayText: string;
  private isLoading: boolean;

  private baseView?: ILoginPage;

  public constructor() {
    this.isLoading = false;
    this.displayText = '';
    this.formRef = React.createRef<FormInstance>();
  }

  public getFormRef(): React.RefObject<FormInstance<any>> {
    return this.formRef
  }

  public getDisplayText(): string {
    return this.displayText;
  }

  public getIsLoadng(): boolean {
    return this.isLoading;
  }

  public attachView = (baseView: ILoginPage): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public OnFinish = async (): Promise<void> => {
    this.isLoading = true;
    this.baseView?.onViewModelChanged();
    await this.baseView!.props.authStore!.Login(
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

  public onChangePage = (): void => {
    this.baseView?.props?.history?.push('/register');
  }
}
