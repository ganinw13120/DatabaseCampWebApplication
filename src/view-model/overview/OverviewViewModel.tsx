import IOverviewViewModel from './IOverviewViewModel';
import BaseView from '../../view/BaseView';

export default class OverviewViewModel implements IOverviewViewModel {
  private baseView?: BaseView;
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView?.props.appStore?.setPercent(40)
    baseView.props.overviewStore.FetchOverview().then((res : any) => {
      baseView?.props.appStore?.setPercent(100)
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
