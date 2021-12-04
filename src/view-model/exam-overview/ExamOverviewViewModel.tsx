// ExamOverviewViewModel.tsx
/**
 * This file contains view-model, related to examination overview page.
*/

import IExamOverviewViewModel from './IExamOverviewViewModel';
import { IExamOverviewPage } from '@root/view/exam-overview/ExamOverviewPage';

export default class ExamOverviewViewModel implements IExamOverviewViewModel {

  private baseView : IExamOverviewPage | null;

  constructor () {
    this.baseView  =null;
  }

  /**
   * On user enter examination overview page, fetch examination overview information, update to view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private fetchData () : void {
    const baseView = this.baseView;
    baseView?.props.appStore?.setPercent(40)
    baseView?.props.examinationStore!.FetchExamOverview().then((res : any) => {
      baseView?.props.appStore?.setPercent(100)
    })
  }

  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public attachView = (baseView: IExamOverviewPage): void => {
    this.baseView = baseView;
    this.fetchData();
  }
  
  /**
   * On view detach, remove view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public detachView = (): void => {
    this.baseView = null;
  }
}
