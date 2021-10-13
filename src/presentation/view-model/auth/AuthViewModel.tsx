import React from 'react';
import IAuthViewModel from './IAuthViewModel';
import BaseView from '../../view/BaseView';
import { FormInstance } from 'antd/es/form';
import LoginUseCase from '../../../domain/interactors/auth/LoginUseCase';

export default class AuthViewModel implements IAuthViewModel {

  public formRef?: React.RefObject<FormInstance<any>>;
  public displayText: string;
  public isLoading: boolean;

  private baseView?: BaseView;
  private loginUseCase?: LoginUseCase;

  public constructor(loginUserCase : LoginUseCase) {
    this.isLoading = false;
    this.displayText = '';
    this.formRef = React.createRef<FormInstance>();
    this.loginUseCase = loginUserCase;
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
    const { issuccess, message } = await this.loginUseCase?.Login(this.formRef?.current?.getFieldValue("email"), this.formRef?.current?.getFieldValue("password")) as {issuccess : boolean, message? : string};
    this.isLoading = false;
    this.displayText = message as string;
    this.baseView?.onViewModelChanged();
    if (issuccess) {
      this.baseView?.props?.history?.push('/overview');
    }
  }
}
