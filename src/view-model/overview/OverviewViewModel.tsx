// OverviewViewModel.tsx
/**
 * This file contains view-model, related to overview page.
*/

import IOverviewViewModel from './IOverviewViewModel';
import BaseView from '@view/BaseView';
import { Overview, Recommend } from '@root/model/Learning';

import { IOverview } from '@view/overview/OverviewPage';

export default class OverviewViewModel implements IOverviewViewModel {
  private data: Overview | null;
  private recommend : Recommend | null;
  private baseView?: IOverview;
  constructor() {
    this.data = null;
    this.recommend = null;
  }

  /**
   * Get overview data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Overview data
   */
  public getData(): Overview | null {
    return this.data;
  }
  public getRecommend(): Recommend | null {
    return this.recommend;
  }

  /**
   * On user enter overview page, fetch overview information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private fetchData(): void {
    const baseView = this.baseView;
    if (!baseView) return;
    baseView.props.appStore?.setPercent(40)
    baseView.props.overviewStore?.FetchOverview().then((res: Overview | null) => {
      if (res?.pre_exam_id) {
        this.baseView?.props.history.push('/examination/' + res.pre_exam_id);
      }
      this.data = res;
      this.baseView?.onViewModelChanged();
      baseView?.props.appStore?.setPercent(90);
      this.fetchRecommend();
    })
  }

  async fetchRecommend () { 
    const recommend = await this.baseView!.props.overviewStore!.FetchRecommend();
    this.recommend = recommend;
    this.baseView?.onViewModelChanged();
    this.baseView!.props.appStore?.setPercent(100)
  }

  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public attachView = (baseView: IOverview): void => {
    this.baseView = baseView;
    this.fetchData();
  }

  /**
   * On view detach, remove view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public detachView = (): void => {
  }

}
