import IOverviewViewModel from './IOverviewViewModel';
import BaseView from '@view/BaseView';
import { Overview } from '@root/model/Learning';

import { IOverview } from '@view/overview/OverviewPage';

export default class OverviewViewModel implements IOverviewViewModel {
  private data: Overview | null;
  private baseView?: BaseView;
  constructor() {
    this.data = null;
  }

  public getData(): Overview | null {
    return this.data;
  }

  private fetchData(): void {
    const baseView = this.baseView;
    if (!baseView) return;
    baseView.props.appStore?.setPercent(40)
    baseView.props.overviewStore?.FetchOverview().then((res: Overview | null) => {
      this.data = res;
      this.baseView?.onViewModelChanged();
      baseView?.props.appStore?.setPercent(100)
    })
  }

  public attachView = (baseView: IOverview): void => {
    this.baseView = baseView;
    this.fetchData();
  };

  public detachView = (): void => {
  };

}
