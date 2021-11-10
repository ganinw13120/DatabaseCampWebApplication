import IActivityViewModel from './IActivityViewModel';
import { notification } from 'antd';
import BaseView from '../../view/BaseView';

import {Activity, Answer} from '../../../domain/entity/model/Learning';

export default class ActivityViewModel implements IActivityViewModel {
  private baseView?: BaseView;
  public activityInfo : Activity | null;
  private result: Answer | null;

  constructor () {
    this.activityInfo = null;
    this.result = null
  }

  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const search = baseView.props.location.search
    const activityID = new URLSearchParams(search).get('id');
    if (!activityID) baseView.props.history.push('/overview')
    this.result = null;
    baseView?.props.appStore?.setPercent(40)
    baseView.props.learningStore.FetchActivity(activityID, (res : Activity) => {
      
      baseView?.props.appStore?.setPercent(70)
      if (!res) return
      if (!this.baseView?.props.learningStore.store.roadMap) {
        const {content_id : contentId} = res.activity;
        baseView.props.learningStore.FetchRoadmap(contentId).then(()=>{
          baseView?.props.appStore?.setPercent(100)
        })
      } else {
        baseView?.props.appStore?.setPercent(100)
      }
      this.activityInfo = res;
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
          this.baseView?.props.history.push(`/activity?id=${nextActivity}`)
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

  public updateResult = (result: Answer): void => {
    this.result = result;
  }

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
