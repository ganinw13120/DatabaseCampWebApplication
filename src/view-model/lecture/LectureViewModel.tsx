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

  public getLectureInfo(): Lecture | null {
    return this.lectureInfo;
  }

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
    baseView.props.learningStore!.FetchRoadmap(contentID, (res : RoadMap | null) => {
      if (!res) {
        baseView.props.history.replace('/overview');
        return;
      }
      baseView?.props.appStore?.addPercent(30);
      const stepper = generateStepper(res, 0, true);
      stepper.onNext = this.onClickNext;
      baseView.props.appStore!.setStepper(stepper)
    })
    baseView.props.learningStore!.FetchLecture(contentID, (res: Lecture) => {
      baseView?.props.appStore?.addPercent(30)
      this.lectureInfo = res;
      this.baseView?.onViewModelChanged()
    })

  }

  public attachView(baseView: ILecturePage): void {
    this.baseView = baseView;
    this.fetchLectureInfo();
  }

  public detachView(): void {
    this.baseView = undefined;
  }

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
