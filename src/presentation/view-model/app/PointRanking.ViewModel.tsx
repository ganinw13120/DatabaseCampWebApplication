import BaseView from '../../view/BaseView';
import IPointRankingViewModel from './IPointRankingViewModel';


export default class PointRankingModel implements IPointRankingViewModel {
  private baseView?: BaseView;
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView.props.pointRankingStore.fatchRanking()
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
