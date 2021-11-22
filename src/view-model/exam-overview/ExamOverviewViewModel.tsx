import IExamOverviewViewModel from './IExamOverviewViewModel';
import { IExamOverviewPage } from '@view/exam-overview/ExamOverviewPage';

export default class ExamOverviewViewModel implements IExamOverviewViewModel {

  private baseView : IExamOverviewPage | null;

  constructor () {
    this.baseView  =null;
  }

  private fetchData () : void {
    const baseView = this.baseView;
    baseView?.props.appStore?.setPercent(40)
    baseView?.props.examinationStore!.FetchExamOverview().then((res : any) => {
      baseView?.props.appStore?.setPercent(100)
    })
  }

  public attachView = (baseView: IExamOverviewPage): void => {
    this.baseView = baseView;
    this.fetchData();
  };
  public detachView = (): void => {};
}
