import IActivityViewModel from './IActivityViewModel';
import { notification } from 'antd';

import { IActivityPage } from '@root/view/activity/ActivityPage';

import { Activity, ActivityAlert, Answer, RoadMap } from '@model/Learning';
import generateStepper, { generateEmptyStepper } from '@util/generateStepper';

export default class ActivityViewModel implements IActivityViewModel {
  private baseView?: IActivityPage;
  private activityInfo: Activity | null;
  private result: Answer | null;
  private alert: ActivityAlert | null;

  constructor() {
    this.activityInfo = null;
    this.result = null;
    this.alert = null;
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }

  public getActivityInfo(): Activity | null {
    return this.activityInfo;
  }

  public getAlert(): ActivityAlert | null {
    return this.alert;
  }

  private fetchActivity(): void {
    const baseView = this.baseView;
    if (!baseView) return;
    const activityID = parseInt(baseView.props.match.params?.id);
    if (!activityID) {
      baseView.props.history.replace('/overview');
      return;
    }
    if (!baseView.props.learningStore!.store.roadMap) baseView.props.appStore!.setStepper(generateEmptyStepper())
    else {
      this.generateStepperFromStore();
    }

    this.activityInfo = null;
    this.result = null;
    this.alert = null;
    baseView?.onViewModelChanged();

    baseView.props.appStore!.setPercent(40)
    baseView.props.learningStore!.FetchActivity(activityID, (res: Activity) => {
      this.activityInfo = res;
      baseView?.onViewModelChanged()
      baseView?.props.appStore?.setPercent(70)
      if (!res) return
      if (!baseView.props.learningStore!.store.roadMap) {
        const { content_id: contentId } = res.activity;
        baseView.props.learningStore!.FetchRoadmap(contentId, (res: RoadMap | null) => {
          if (!res) {
            baseView.props.history.replace('/overview');
            return;
          }
          baseView?.props.appStore?.setPercent(100)
          const stepper = generateStepper(res, this.getCurrentActivityOrder(res), true);
          stepper.onNext = this.moveNext;
          stepper.onPrev = this.movePrev;
          baseView.props.appStore!.setStepper(stepper)
        })
      } else {
        baseView?.props.appStore?.setPercent(100)
        this.generateStepperFromStore();
      }
    })
  }

  public attachView = async (baseView: IActivityPage): Promise<any> => {
    this.baseView = baseView;
    this.fetchActivity();
  };

  private generateStepperFromStore(): void {
    const roadMap = this.baseView!.props.learningStore!.store.roadMap;
    if (!roadMap) return;
    const stepper = generateStepper(roadMap, this.getCurrentActivityOrder(roadMap), true);
    stepper.onNext = this.moveNext;
    stepper.onPrev = this.movePrev;
    this.baseView?.props.appStore!.setStepper(stepper)
  }

  public onSubmit = (): void => {
    if (!this.baseView) return;
    const { isLoading } = this.baseView.props.learningStore!.store;
    if (isLoading) return;
    this.baseView.props.learningStore!.SubmitActivity(this.result, (res: ActivityAlert) => {
      this.generateStepperFromStore();
      this.alert = res;
      this.baseView?.onViewModelChanged();
    })
  }

  private getCurrentActivityOrder(roadMap: RoadMap): number {
    const activiyId = this.activityInfo?.activity.activity_id;
    return roadMap.items.find(e => e.activity_id === activiyId) ? roadMap.items.find(e => e.activity_id === activiyId)!.order : 1;
  }

  public moveNext(): void {
    if (!this.activityInfo) return;
    this.result = null;
    this.alert = null;
    this.baseView?.onViewModelChanged();
    this.baseView?.props.learningStore!.clearActivity();
    const next = this.getNextActivityId();
    if (!next) {
      this.baseView?.props.history.push('/overview')
    } else {
      this.baseView?.props.history.push(`/learning/activity/${next}`)
    }
  }
  private movePrev(): void {
    if (!this.activityInfo) return;
    this.result = null;
    this.alert = null;
    this.baseView?.onViewModelChanged();
    this.baseView?.props.learningStore!.clearActivity();
    const prev = this.getPrevActivityId();
    if (!prev) {
      const content_id = this.activityInfo?.activity.content_id;
      if (!content_id)
        this.baseView?.props.history.push('/overview')
      else
        this.baseView?.props.history.push('/learning/content/' + content_id)
    } else {
      this.baseView?.props.history.push(`/learning/activity/${prev}`)
    }
  }

  private getNextActivityId(): number | null {
    if (!this.activityInfo) return null;
    const { roadMap } = this.baseView?.props.learningStore!.store!;
    if (!roadMap) return null;
    const currentActivityId = this.activityInfo!.activity.activity_id;
    const currentOrder = roadMap.items.find((e: any) => e.activity_id === currentActivityId)?.order;
    if (!currentOrder) return null;
    const nextActivity = roadMap.items.find((e: any) => e.order === currentOrder + 1);
    if (!nextActivity) {
      return null;
    }
    else {
      return nextActivity.activity_id;
    }
  }

  private getPrevActivityId(): number | null {
    if (!this.activityInfo) return null;
    const { roadMap } = this.baseView?.props.learningStore!.store!;
    if (!roadMap) return null;
    const currentActivityId = this.activityInfo!.activity.activity_id;
    const currentOrder = roadMap.items.find((e: any) => e.activity_id === currentActivityId)?.order;
    if (!currentOrder) return null;
    const nextActivity = roadMap.items.find((e: any) => e.order === currentOrder - 1);
    if (!nextActivity) {
      return null;
    }
    else {
      return nextActivity.activity_id;
    }
  }


  public async onHint(): Promise<any> {
    if (!this.baseView) return;
    const { isLoading } = this.baseView.props.learningStore!.store;
    if (isLoading) return;
    const result = await this.baseView?.props.learningStore!.getHint()
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
