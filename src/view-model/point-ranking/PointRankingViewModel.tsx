// PointRankingViewModel.tsx
/**
 * This file contains view-model, related to point ranking page.
*/

import { IPointRanking } from '@view/pointRanking/PointRankingPage';

import IPointRankingViewModel from './IPointRankingViewModel';


export default class PointRankingViewModel implements IPointRankingViewModel {
  private baseView?: IPointRanking;

  /**
   * On user enter point ranking page, fetch point ranking information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private fetchData () : void {
    const baseView = this.baseView;
    if(!baseView) return;
    baseView.props.appStore!.setPercent(40)
    baseView.props.pointRankingStore!.fatchRanking().then(()=>{
      baseView?.props.appStore!.setPercent(100)
    })
  }

  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public attachView = (baseView: IPointRanking): void => {
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
    this.baseView = undefined;
  }

}
