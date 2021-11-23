import { IPointRanking } from '@view/pointRanking/PointRankingPage';

import IPointRankingViewModel from './IPointRankingViewModel';


export default class PointRankingViewModel implements IPointRankingViewModel {
  private baseView?: IPointRanking;

  private fetchData () : void {
    const baseView = this.baseView;
    if(!baseView) return;
    baseView.props.appStore!.setPercent(40)
    baseView.props.pointRankingStore!.fatchRanking().then(()=>{
      baseView?.props.appStore!.setPercent(100)
    })
  }

  public attachView = (baseView: IPointRanking): void => {
    this.baseView = baseView;
    this.fetchData();
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
