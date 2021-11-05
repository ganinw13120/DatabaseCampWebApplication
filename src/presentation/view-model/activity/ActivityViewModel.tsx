import IActivityViewModel from './IActivityViewModel';
import BaseView from '../../view/BaseView';

export default class ActivityViewModel implements IActivityViewModel {
  private baseView?: BaseView;
  public lectureInfo : any;
  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const { id : contentID } = baseView.props.match.params
    baseView.props.learningStore.FetchRoadmap(contentID)
    baseView.props.learningStore.FetchLecture(contentID, (res: any) => {
      this.lectureInfo = res;
      this.baseView?.onViewModelChanged()
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
