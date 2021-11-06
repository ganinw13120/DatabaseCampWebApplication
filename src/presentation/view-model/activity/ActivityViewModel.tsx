import IActivityViewModel from './IActivityViewModel';
import { notification } from 'antd';
import BaseView from '../../view/BaseView';

export default class ActivityViewModel implements IActivityViewModel {
  private baseView?: BaseView;
  public lectureInfo : any;

  private result: any;

  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const { id: activityID } = baseView.props.match.params
    this.result = null;
    baseView.props.learningStore.FetchActivity(activityID, (res: any) => {
      if (!res) return
      if (!this.baseView?.props.learningStore.store.roadMap) {
        const {content_id : contentId} = res.activity;
        baseView.props.learningStore.FetchRoadmap(contentId)
      }
      this.lectureInfo = res;
      this.baseView?.onViewModelChanged()
    })
  };
  public onSubmit = (): void => {
    if (!this.baseView) return;
    const {isLoading} = this.baseView.props.learningStore.store;
    if (isLoading) return;
    this.baseView.props.learningStore.SubmitActivity(this.result, (res: any) => {
      if (res) {
        const nextActivity = this.getNextActivityId();
        this.baseView?.props.learningStore.clearActivity();
        if (nextActivity) {
          this.baseView?.props.history.push(`/activity/${nextActivity}`)
        } else {
          this.baseView?.props.history.push('/overview')
        }
      }
    })
  }

  private  getNextActivityId = (): number | null => {
    const { roadMap, activityInfo } = this.baseView?.props.learningStore.store;
    const currentActivityId = activityInfo.activity.activity_id;
    const currentOrder = roadMap.items.find((e : any) => e.activity_id === currentActivityId).order;
    const nextActivity = roadMap.items.find((e: any) => e.order === currentOrder + 1);
    if (!nextActivity) {
        notification['success']({
          message: "จบเเล้ว",
          description:
            'ไม่มีกิจกรรมเเล้ววว',
          onClick: () => {
          },
        });
      return null;
    }
    else {
      return nextActivity.activity_id;
    }
  }


  public onHint = async (): Promise<any> => {
    if (!this.baseView) return;
    const {isLoading} = this.baseView.props.learningStore.store;
    if (isLoading) return;
    const result = await this.baseView?.props.learningStore.getHint()
    if (result) {
      notification['error']({
        message: "พบข้อผิดพลาด",
        description:
          result,
        onClick: () => {
        },
      });
    }
  }

  public updateResult = (result: any): void => {
    this.result = result;
  }

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
