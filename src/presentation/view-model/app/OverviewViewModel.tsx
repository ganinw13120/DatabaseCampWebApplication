import IOverviewViewModel from './IOverviewViewModel';
import BaseView from '../../view/BaseView';

export default class OverviewViewModel implements IOverviewViewModel {

  private baseView?: BaseView;
  public constructor() {

  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView.props.overviewStore.FetchOverview().then((res : any) => {
      const { data } = this.baseView?.props.overviewStore.store;
      console.log({...data})
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
