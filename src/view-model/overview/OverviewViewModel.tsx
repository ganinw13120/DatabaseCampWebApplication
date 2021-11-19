import IOverviewViewModel from './IOverviewViewModel';
import BaseView from '@view/BaseView';
import { Overview } from '@root/model/Learning';

export default class OverviewViewModel implements IOverviewViewModel {
  public data : Overview | null;
  private baseView?: BaseView;
  constructor () {
    this.data = null;  
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView?.props.appStore?.setPercent(40)
    baseView.props.overviewStore.FetchOverview().then((res : Overview | null) => {
      this.data = res;
      this.baseView?.onViewModelChanged();
      baseView?.props.appStore?.setPercent(100)
    })
  };

  public detachView = (): void => {
  };

}
