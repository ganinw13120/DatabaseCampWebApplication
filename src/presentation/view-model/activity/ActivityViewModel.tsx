import IActivityViewModel from './IActivityViewModel';
import { notification } from 'antd';
import BaseView from '../../view/BaseView';

import {Activity, Answer, RoadMap} from '../../../domain/entity/model/Learning';
import generateStepper, { generateEmptyStepper } from '../../util/generateStepper';

export default class ActivityViewModel implements IActivityViewModel {
  private baseView?: BaseView;
  public activityInfo : Activity | null;
  private result: Answer | null;

  constructor () {
    this.activityInfo = null;
    this.result = null;
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }

  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const search = baseView.props.location.search
    const activityID = new URLSearchParams(search).get('id');
    if (!activityID) baseView.props.history.push('/overview')
    this.result = null;

    baseView.props.appStore.setStepper(generateEmptyStepper())
    
    baseView?.props.appStore?.setPercent(40)
    baseView.props.learningStore.FetchActivity(activityID, (res : Activity) => {
      this.activityInfo = res;
      this.baseView?.onViewModelChanged()
      baseView?.props.appStore?.setPercent(70)
      if (!res) return
      if (!this.baseView?.props.learningStore.store.roadMap) {
        const {content_id : contentId} = res.activity;
        baseView.props.learningStore.FetchRoadmap(contentId, (res : RoadMap)=>{
          baseView?.props.appStore?.setPercent(100)
          const stepper = generateStepper(res, this.getCurrentActivityOrder(res), true);
          stepper.onPrev = this.movePrev;
          baseView.props.appStore.setStepper(stepper)
        })
      } else {
        baseView?.props.appStore?.setPercent(100)
        const stepper = generateStepper(this.baseView?.props.learningStore.store.roadMap, this.getCurrentActivityOrder(this.baseView?.props.learningStore.store.roadMap), true);
        // stepper.onNext = this.moveNext;
        stepper.onPrev = this.movePrev;
        baseView.props.appStore.setStepper(stepper)
      }
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
          notification['success']({
            message: "จบเเล้ว",
            description:
              'ไม่มีกิจกรรมเเล้ววว',
            onClick: () => {
            },
          });
          this.baseView?.props.history.push('/overview')
        }
      }
    })
  }

  private getCurrentActivityOrder = (roadMap : RoadMap) : number => {
    const activiyId = this.activityInfo?.activity.activity_id;
    console.log(activiyId)
    console.log(roadMap.items.find(e=>e.activity_id===activiyId))
    return roadMap.items.find(e=>e.activity_id===activiyId) ? roadMap.items.find(e=>e.activity_id===activiyId)!.order : 1;
  }

  private moveNext = () : void => {
    const next = this.getNextActivityId();
    if (!next) {
      this.baseView?.props.history.push('/overview')
    } else {
      this.baseView?.props.history.push(`/activity?id=${next}`)
    }
  }
  private movePrev = () : void => {
    const prev = this.getPrevActivityId();
    if (!prev) {
      const content_id = this.activityInfo?.activity.content_id;
      if (!content_id)
        this.baseView?.props.history.push('/overview')
      else 
        this.baseView?.props.history.push('/content?id=' + content_id)  
    } else {
      this.baseView?.props.history.push(`/activity?id=${prev}`)
    }
  }

  private  getNextActivityId = (): number | null => {
    const { roadMap, activityInfo } = this.baseView?.props.learningStore.store;
    const currentActivityId = activityInfo.activity.activity_id;
    const currentOrder = roadMap.items.find((e : any) => e.activity_id === currentActivityId).order;
    const nextActivity = roadMap.items.find((e: any) => e.order === currentOrder + 1);
    if (!nextActivity) {
      return null;
    }
    else {
      return nextActivity.activity_id;
    }
  }

  private  getPrevActivityId = (): number | null => {
    const { roadMap, activityInfo } = this.baseView?.props.learningStore.store;
    const currentActivityId = activityInfo.activity.activity_id;
    const currentOrder = roadMap.items.find((e : any) => e.activity_id === currentActivityId).order;
    const nextActivity = roadMap.items.find((e: any) => e.order === currentOrder - 1);
    if (!nextActivity) {
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
