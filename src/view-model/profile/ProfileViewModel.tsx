import React from 'react';
import IProfileViewModel from './IProfileViewModel';
import BaseView from '../../view/BaseView';
import { FormInstance } from 'antd/es/form';

import { User } from '../../model/User';

export default class ActivityViewModel implements IProfileViewModel {
  private baseView?: BaseView;
  public formRef?: React.RefObject<FormInstance<any>>;
  public profileData : User | null;

  constructor () {
    this.profileData = null;
    this.formRef = React.createRef<FormInstance>();
  }

  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const search = baseView.props.location.search
    const profileId = new URLSearchParams(search).get('id');
    if (!profileId) baseView.props.history.push('/overview');
    baseView?.props.appStore?.setPercent(40)
    baseView.props.profileStore.FetchUserProfile(profileId, (res : User)=>{
      this.profileData = res;
      this.baseView?.props.appStore?.setPercent(100)
      this.baseView?.onViewModelChanged();
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public submitChangeName = () : void => {
    this.baseView?.props.profileStore.UpdateName(this.formRef?.current?.getFieldValue('name'), (res : any) => {
      let temp = this.profileData;
      temp!.name = res.updated_name;
      this.profileData = temp;
      this.baseView?.onViewModelChanged();
    })
    
  }

}