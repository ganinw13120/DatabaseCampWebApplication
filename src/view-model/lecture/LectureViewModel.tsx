import ILectureViewModel from './ILectureViewModel';
import BaseView from '@view/BaseView';
import { notification } from 'antd';
import { RoadMap } from '@model/Learning';
import generateStepper, { generateEmptyStepper } from '@util/generateStepper';

export default class LectureViewModel implements ILectureViewModel {
  private baseView?: BaseView;
  public lectureInfo: any;
  constructor () {
    this.onClickNext = this.onClickNext.bind(this);
  }
  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const search = baseView.props.location.search
    const contentID = new URLSearchParams(search).get('id');
    if (!contentID) baseView.props.history.push('/overview')
    baseView.props.appStore.setStepper(generateEmptyStepper())
    baseView?.props.appStore?.setPercent(40)
    baseView.props.learningStore.FetchRoadmap(contentID,(res : RoadMap)=>{  
      baseView?.props.appStore?.addPercent(30);
      const stepper = generateStepper(res, 0, true);
      stepper.onNext = this.onClickNext ;
      baseView.props.appStore.setStepper(stepper)
    })
    baseView.props.learningStore.FetchLecture(contentID, (res: any) => {
      baseView?.props.appStore?.addPercent(30)
      this.lectureInfo = res;
      this.baseView?.onViewModelChanged()
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };
  public onClickNext = (): void => {
    const { roadMap } = this.baseView?.props.learningStore.store;
    if (roadMap.items.length !== 0) {
      const nextActivity = roadMap.items.sort((a: any, b: any) => a.order - b.order)[0];
      this.baseView?.props.history.push('/activity?id=' + nextActivity.activity_id);
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
