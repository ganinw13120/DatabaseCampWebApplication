import BaseView from '../../view/BaseView';
import IPointRankingViewModel from './IPointRankingViewModel';


export default class PointRankingModel implements IPointRankingViewModel {
  private baseView?: BaseView;
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView?.props.appStore?.setPercent(40)
    baseView.props.pointRankingStore.fatchRanking().then(()=>{  
      baseView?.props.appStore?.setPercent(100)
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
