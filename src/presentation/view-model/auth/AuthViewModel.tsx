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

  public constructor() {
    this.isLoading = false;
    this.displayText = '';
    this.loginUseCase = new LoginUseCase();
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
    const loginResult = await this.loginUseCase?.Login(this.formRef?.current?.getFieldValue("email"), this.formRef?.current?.getFieldValue("password"));
    this.isLoading = false;
    this.displayText = loginResult as string;

    console.log(typeof loginResult)
    this.baseView?.onViewModelChanged();
    console.log(loginResult)
  }
}
