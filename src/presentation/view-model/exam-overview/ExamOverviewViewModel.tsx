import IExamOverviewViewModel from './IExamOverviewViewModel';
import BaseView from '../../view/BaseView';

export default class ExamOverviewViewModel implements IExamOverviewViewModel {
  private baseView?: BaseView;
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView?.props.appStore?.setPercent(40)
    baseView.props.examinationStore.FetchExamOverview().then((res : any) => {
      baseView?.props.appStore?.setPercent(100)
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
