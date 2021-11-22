import IProfileViewModel from './IExamResultViewModel';
import {IExamResultPage} from '@view/exam-result/ExamResult';

import { ExamResult } from '@model/Learning';

export default class ActivityViewModel implements IProfileViewModel {
  private data : ExamResult | null;

  private baseView : IExamResultPage | null;

  constructor () {
    this.data = null;
    this.baseView = null;
  }

  private async fetchData () : Promise<void> {
    const baseView = this.baseView;
    if (!baseView) return;
    const exam_id = parseInt(baseView.props.match.params.id);
    if (!exam_id) baseView.props.history.replace('/examination');
    baseView?.props.appStore?.setPercent(40)
    const res = await baseView?.props.examinationStore!.FetchResult(exam_id)
    baseView?.props.appStore?.setPercent(100)
    this.data = res;
    baseView?.onViewModelChanged();

  }

  public getData () : ExamResult | null {
    return this.data;
  }

  public async attachView  (baseView: IExamResultPage): Promise<any> {
    this.baseView = baseView;
    this.fetchData();
  };

  public detachView (): void {
    this.baseView = null;
  };

}
