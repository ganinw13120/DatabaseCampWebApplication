// ProfileviewModel.tsx
/**
 * This file contains view-model, related to profile page.
*/

import React from 'react';
import IProfileViewModel from './IProfileViewModel';

import { IProfilePage } from '@view/profile/ProfilePage';

import { FormInstance } from 'antd/es/form';

import { User } from '@model/User';

export default class ProfileviewModel implements IProfileViewModel {
  private baseView?: IProfilePage;
  private formRef?: React.RefObject<FormInstance<any>>;
  private profileData : User | null;
  private alertText : string;

  /**
   * Get profile data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Profile data
   */
  public getProfileData () : User | null {
    return this.profileData;
  }

  /**
   * Get input form reference data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Input form reference data
   */
  public getFormRef () : React.RefObject<FormInstance<any>> | undefined {
    return this.formRef;
  }

  /**
   * Get alert data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Alert data
   */
  public getAlertText () : string {
    return this.alertText;
  }

  constructor () {
    this.profileData = null;
    this.alertText = '';
    this.formRef = React.createRef<FormInstance>();
  }

  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public attachView = async (baseView: IProfilePage): Promise<any> => {
    this.baseView = baseView;
    const profileId = parseInt(baseView.props.match.params?.id);
    if (!profileId) {
      baseView.props.history.replace('/overview');
      return;
    }
    baseView?.props.appStore?.setPercent(40)
    baseView.props.profileStore!.FetchUserProfile(profileId, (res : User)=>{
      this.profileData = res;
      this.baseView?.props.appStore?.setPercent(100)
      this.baseView?.onViewModelChanged();
    }, ()=>{
      baseView.props.history.replace('/overview');
      return;
    })
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
   * On user submit name changing input form, submitting new display name
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public submitChangeName = () : void => {
    const newName = this.formRef?.current?.getFieldValue('name');
    if (!newName) {
      this.alertText = 'กรุณากรอกชื่อ';
      this.baseView?.onViewModelChanged();
      return;
    }
    else if (newName===this.profileData?.name) {
      this.alertText = 'กรุณากรอกชื่อใหม่';
      this.baseView?.onViewModelChanged();
      return;
    }
    this.alertText = '';
    this.baseView?.onViewModelChanged();
    this.baseView?.props.profileStore!.UpdateName(this.formRef?.current?.getFieldValue('name'), (res : any) => {
      let temp = this.profileData;
      temp!.name = res.updated_name;
      this.profileData = temp;
      this.baseView?.onViewModelChanged();
    })
    
  }

}
