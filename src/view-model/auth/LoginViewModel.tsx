// LoginViewModel.tsx
/**
 * This file contains view-model, related to login page.
*/

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

  /**
   * Get form input reference
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Form input reference
   */
  public getFormRef(): React.RefObject<FormInstance<any>> {
    return this.formRef
  }

  /**
   * Get display text
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Activity information
   */
  public getDisplayText(): string {
    return this.displayText;
  }

  /**
   * Get is application loading
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Is loading data
   */
  public getIsLoadng(): boolean {
    return this.isLoading;
  }


  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public attachView = (baseView: ILoginPage): void => {
    this.baseView = baseView;
  }

  /**
   * On view detach, remove view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public detachView = (): void => {
    this.baseView = undefined;
  }

  /**
   * On user submit input form, submitting information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
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

  /**
   * On user select register page, take user to register page
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public onChangePage = (): void => {
    this.baseView?.props?.history?.push('/register');
  }
}
