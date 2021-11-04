import IActivityViewModel from './IActivityViewModel';
import BaseView from '../../view/BaseView';

export default class ActivityViewModel implements IActivityViewModel {
  private baseView?: BaseView;
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
