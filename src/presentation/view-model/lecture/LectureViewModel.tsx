import ILectureViewModel from './ILectureViewModel';
import BaseView from '../../view/BaseView';
import { notification } from 'antd';

export default class LectureViewModel implements ILectureViewModel {
  private baseView?: BaseView;
  public lectureInfo: any;
  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const search = baseView.props.location.search
    const contentID = new URLSearchParams(search).get('id');
    if (!contentID) baseView.props.history.push('/overview')
    baseView.props.learningStore.FetchRoadmap(contentID)
    baseView.props.learningStore.FetchLecture(contentID, (res: any) => {
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
      this.baseView?.props.history.push('/activity/' + nextActivity.activity_id);
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
