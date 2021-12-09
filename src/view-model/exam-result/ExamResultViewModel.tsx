// ExaminationResultViewModel.tsx
/**
 * This file contains view-model, related to examination result page.
*/

import IProfileViewModel from './IExamResultViewModel';
import {IExamResultPage} from '@root/view/exam-result/ExamResultPage';

import { ExamResult } from '@model/Learning';

export default class ExaminationResultViewModel implements IProfileViewModel {
  private data : ExamResult | null;

  private baseView : IExamResultPage | null;

  constructor () {
    this.data = null;
    this.baseView = null;
  }

  /**
   * On user enter examination result page, fetch examination result information, update to view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private async fetchData () : Promise<void> {
    const baseView = this.baseView;
    if (!baseView) return;
    const exam_id = parseInt(baseView.props.match.params.id);
    if (!exam_id) {
      baseView.props.history.replace('/examination');
      return;
    }
    baseView?.props.appStore?.setPercent(40)
    const res = await baseView?.props.examinationStore!.FetchResult(exam_id)
    baseView?.props.appStore?.setPercent(100)
    this.data = res;
    baseView?.onViewModelChanged();

  }

  /**
   * Get examination result data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Examination result data
   */
  public getData () : ExamResult | null {
    return this.data;
  }

  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public async attachView  (baseView: IExamResultPage): Promise<any> {
    this.baseView = baseView;
    this.fetchData();
  }

  /**
   * On view detach, remove view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public detachView (): void {
    this.baseView = null;
  }

}
