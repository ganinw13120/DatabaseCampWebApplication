import React from 'react';
import IProfileViewModel from './IProfileViewModel';

import { IProfilePage } from '@view/profile/ProfilePage';

import { FormInstance } from 'antd/es/form';

import { User } from '@model/User';

export default class ActivityViewModel implements IProfileViewModel {
  private baseView?: IProfilePage;
  public formRef?: React.RefObject<FormInstance<any>>;
  public profileData : User | null;
  public alertText : string;

  constructor () {
    this.profileData = null;
    this.alertText = '';
    this.formRef = React.createRef<FormInstance>();
  }

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
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

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
