import IOverviewViewModel from './IOverviewViewModel';
import BaseView from '../../view/BaseView';

export default class OverviewViewModel implements IOverviewViewModel {
  private baseView?: BaseView;
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView.props.overviewStore.FetchOverview().then((res : any) => {
      // const { data } = this.baseView?.props.overviewStore.store;
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
