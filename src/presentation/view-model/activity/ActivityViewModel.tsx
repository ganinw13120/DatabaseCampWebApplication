import IActivityViewModel from './IActivityViewModel';
import BaseView from '../../view/BaseView';

export default class ActivityViewModel implements IActivityViewModel {
  private baseView?: BaseView;
  public lectureInfo : any;
  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const { id: activityID } = baseView.props.match.params
    // baseView.props.learningStore.FetchRoadmap(activityID)
    baseView.props.learningStore.FetchActivity(activityID, (res: any) => {
      // console.log(res)
      // const {activity_id : activityID}
      this.lectureInfo = res;
      this.baseView?.onViewModelChanged()
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
