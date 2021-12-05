// LectureViewModel.tsx
/**
 * This file contains view-model, related to lecture page.
*/

import ILectureViewModel from './ILectureViewModel';
import { ILecturePage } from '@view/lecture/LecturePage';
import { notification } from 'antd';
import { Lecture, RoadMap } from '@model/Learning';
import generateStepper, { generateEmptyStepper } from '@util/generateStepper';

export default class LectureViewModel implements ILectureViewModel {
  private baseView?: ILecturePage;
  private lectureInfo: Lecture | null;

  constructor() {
    this.onClickNext = this.onClickNext.bind(this);
    this.lectureInfo = null;
  }

  /**
   * Get lecture data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   * 
   * @returns Lecture data
   */
  public getLectureInfo(): Lecture | null {
    return this.lectureInfo;
  }

  /**
   * On user enter lecture page, fetch lecture information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private async fetchLectureInfo(): Promise<void> {
    const baseView = this.baseView;
    if (!baseView) return;
    const contentID = parseInt(baseView.props.match.params.id);
    if (!contentID) {
      baseView.props.history.replace('/overview');
      return;
    }
    baseView.props.appStore!.setStepper(generateEmptyStepper())
    baseView?.props.appStore!.setPercent(40)
    baseView.props.learningStore!.FetchRoadmap(contentID, (res : RoadMap) => {
      if (!this.baseView) return;
      this.baseView?.props.appStore?.addPercent(30);
      const stepper = generateStepper(res, 0, true);
      stepper.onNext = this.onClickNext;
      this.baseView.props.appStore!.setStepper(stepper)
    }, () => {
      baseView.props.history.replace('/overview');
      return;
    })
    baseView.props.learningStore!.FetchLecture(contentID, (res: Lecture) => {
      baseView?.props.appStore?.addPercent(30)
      this.lectureInfo = res;
      this.baseView?.onViewModelChanged()
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
  public attachView(baseView: ILecturePage): void {
    this.baseView = baseView;
    this.fetchLectureInfo();
  }

  /**
   * On view detach, remove view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public detachView(): void {
    this.baseView = undefined;
  }

  /**
   * On user click next, load next activity from roadmap in store
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public onClickNext (): void  {
    if (!this.baseView) return;
    const { roadMap } = this.baseView.props.learningStore!.store;
    if (!roadMap) return;
    if (roadMap.items.length !== 0) {
      const nextActivity = roadMap.items.sort((a: any, b: any) => a.order - b.order)[0];
      this.baseView?.props.history.push('/learning/activity/' + nextActivity.activity_id);
    } else {
      notification['error']({
        message: "โอ้ววว ไม่นะ",
        description:
          'ไม่มีกิจกรรมเเล้ววว',
        onClick: () => {
        },
      });
    }
  }
}
