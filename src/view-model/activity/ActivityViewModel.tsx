// ActivityViewModel.tsx
/**
 * This file contains view-model, related to activity page.
*/

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

  /**
   * Get activity information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Activity information
   */
  public getActivityInfo(): Activity | null {
    return this.activityInfo;
  }

  /**
   * Get activity alert
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Activity alert information
   */
  public getAlert(): ActivityAlert | null {
    return this.alert;
  }

  /**
   * fetch activity information, then update to view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
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
      if (!res || !this.baseView) return
      if (!baseView.props.learningStore!.store.roadMap) {
        const { content_id: contentId } = res.activity;
        baseView.props.learningStore!.FetchRoadmap(contentId, (res: RoadMap) => {
          if (!this.baseView) return;
          console.log(this.baseView)
          this.baseView.props.appStore?.setPercent(100)
          const stepper = generateStepper(res, this.getCurrentActivityOrder(res), true);
          stepper.onNext = this.moveNext;
          stepper.onPrev = this.movePrev;
          this.baseView.props.appStore!.setStepper(stepper)
        }, () => {
          this.baseView?.props.history.replace('/overview');
          return;
        })
      } else {
        baseView?.props.appStore?.setPercent(100)
        this.generateStepperFromStore();
      }
    }, () => {
      baseView.props.history.replace('/overview');
      return;
    })
  }

  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public attachView = async (baseView: IActivityPage): Promise<any> => {
    this.baseView = baseView;
    this.fetchActivity();
  }

  /**
   * Generate stepper from roadmap data in store
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private generateStepperFromStore(): void {
    const roadMap = this.baseView!.props.learningStore!.store.roadMap;
    if (!roadMap) return;
    const stepper = generateStepper(roadMap, this.getCurrentActivityOrder(roadMap), true);
    stepper.onNext = this.moveNext;
    stepper.onPrev = this.movePrev;
    this.baseView?.props.appStore!.setStepper(stepper)
  }

  /**
   * On user submit activity
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
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

  /**
   * Get current activity order
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   * 
   * @param roadMap Roadmap information
   * 
   * @returns Current activity index in roadmap
   */
  private getCurrentActivityOrder(roadMap: RoadMap): number {
    const activiyId = this.activityInfo?.activity.activity_id;
    return roadMap.items.find(e => e.activity_id === activiyId) ? roadMap.items.find(e => e.activity_id === activiyId)!.order : 1;
  }

  /**
   * Move to next activity
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
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

  /**
   * Move to previous activity
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
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

  /**
   * Get next activity id from roadmap in store
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private getNextActivityId(): number | null {
    const { roadMap } = this.baseView?.props.learningStore!.store!;
    if (!roadMap || !this.activityInfo) return null;
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

  /**
   * Get previous activity id from roadmap in store
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private getPrevActivityId(): number | null {
    const { roadMap } = this.baseView?.props.learningStore!.store!;
    if (!roadMap || !this.activityInfo) return null;
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

  /**
   * Get user request for hint
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
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

  /**
   * On user update activity's answer, update answer data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   * 
   * @param result activity's answer
   */
  public updateResult = (result: Answer): void => {
    this.result = result;
  }

  /**
   * On view detach, remove view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public detachView = (): void => {
    this.baseView = undefined;
  };

}
