import IProfileViewModel from './IProfileViewModel';
import BaseView from '../../view/BaseView';

import { User } from '../../../domain/entity/model/User';

export default class ActivityViewModel implements IProfileViewModel {
  private baseView?: BaseView;
  public profileData : User | null;

  constructor () {
    this.profileData = null;
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

}
