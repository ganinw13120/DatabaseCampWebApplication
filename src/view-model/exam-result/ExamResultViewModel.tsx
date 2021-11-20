import IProfileViewModel from './IExamResultViewModel';
import BaseView from '@view/BaseView';

import { ExamResult } from '@model/Learning';

export default class ActivityViewModel implements IProfileViewModel {
  public data : ExamResult | null;

  constructor () {
    this.data = null;
  }

  public attachView = async (baseView: BaseView): Promise<any> => {
    const exam_id = baseView.props.match.params.id;
    if (!exam_id) baseView.props.history.replace('/examination');
    baseView?.props.appStore?.setPercent(40)
    const res = await baseView?.props.examinationStore.FetchResult(exam_id)
    baseView?.props.appStore?.setPercent(100)
    this.data = res;
    baseView?.onViewModelChanged();
  };

  public detachView = (): void => {
  };

}
