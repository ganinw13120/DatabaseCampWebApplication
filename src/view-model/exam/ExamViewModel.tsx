// ExamViewModel.tsx
/**
 * This file contains view-model, related to examination page.
*/

import IExamViewModel from './IExamViewModel';
import { ActivityAlert, Answer, CompletionAnswer, Exam } from '@model/Learning';
import { Step, Stepper } from '@model/App';

import { IExamPage } from '@view/exam/ExamPage';

import { validateCompletion, validateMultiple, validateMatching } from '@util/validateActvitiy';

export default class ExamViewModel implements IExamViewModel {
  private baseView?: IExamPage;
  private currentActivity: number;
  private exam: Exam | null;
  private result: Answer[];
  private alert: ActivityAlert | null;
  private isLoading: boolean;
  constructor(currentActivity: number) {
    this.exam = null;
    this.currentActivity = currentActivity;
    this.result = [];
    this.alert = null;
    this.isLoading = false;
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }

  /**
   * Get form examination alert
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Alert information
   */
  public getAlert(): ActivityAlert | null {
    return this.alert;
  }

  /**
   * Get is application is loaind
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Is loading data
   */
  public getIsLoading(): boolean {
    return this.isLoading;
  }

  /**
   * Get examination information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns examination information
   */
  public getExam(): Exam | null {
    return this.exam;
  }

  /**
   * Get current activity index
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Current activity index
   */
  public getCurrentActivity(): number {
    return this.currentActivity;
  }

  /**
   * On user enter examination page, fetch examination information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private fetchExam(): void {
    const baseView = this.baseView;
    if (!baseView) return;

    baseView?.props.appStore?.setPercent(40);
    const examId = parseInt(baseView.props.match.params?.id);
    if (!examId) {
      baseView.props.history.replace('/examination/overview');
      return;
    }
    baseView.props.examinationStore!.FetchExam(examId).then((res: Exam | null) => {
      if (!this.baseView) return;
      if (!res) {
        baseView.props.history.replace('/examination/overview');
        return;
      }
      this.exam = res;
      baseView.onViewModelChanged();
      baseView?.props.appStore?.setPercent(100)
      this.setStepper();
    })
  }

  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public attachView = (baseView: IExamPage): void => {
    this.baseView = baseView;
    this.fetchExam();
  }

  /**
   * Set stepper
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private setStepper (): void  {
    if (!this.exam) return;
    const stepper: Stepper = this.generateExamStepper(this.exam)
    stepper.onNext = this.moveNext;
    stepper.onPrev = this.movePrev;
    this.baseView?.props.appStore!.setStepper(stepper)
  }

  /**
   * Generate examination stepper from examination information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @param res Examination information
   *
   * @returns Stepper information
   */
  private generateExamStepper (res: Exam): Stepper {
    const stepper: Stepper = {
      currentStep: this.currentActivity,
      steps: []
    }
    res.activities.forEach((e, key: number) => {
      stepper.steps.push(this.validateResult(key) ? Step.Activity : Step.UnCompleteActivity)
    })
    return stepper;
  }

  /**
   * On view detach, remove view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public detachView = (): void => {
    this.baseView = undefined;
  }

  /**
   * Update result on user activity result
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @param key target examination identifier
   *
   * @param result Answer of activity
   */
  public updateResult = (key: number, result: Answer | null): void => {
    this.result[key] = result;
  }

  /**
   * On user submit activity, validate answer and submit answer
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public SubmitActivity = (): void => {
    if (!this.exam) return;
    if (this.currentActivity < this.exam.activities.length - 1) {
      this.currentActivity++;
      this.baseView?.onViewModelChanged();
    } else {
      let isPassed = true;
      this.exam.activities.forEach((_, key: number) => {
        const temp = this.validateResult(key);
        if (!temp) isPassed = false;
      })
      if (!isPassed) {
        const alert: ActivityAlert = {
          isSuccess: false,
          feedback: '????????????????????????????????????????????????????????????????????????????????????'
        }
        this.alert = alert;
        this.baseView?.onViewModelChanged();

        return;
      }
      this.isLoading = true;
      this.baseView?.onViewModelChanged();
      this.baseView?.props.examinationStore!.submitExam(this.result, this.exam, (res) => {
        this.baseView?.props.history.push('/examination/result/' + res.exam_result_id);
      }, () => {
        this.baseView?.props.history.push('/overview');
      })
    }
    this.setStepper();
  }

  /**
   * Move to next activity
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public moveNext = (): void => {
    if (this.currentActivity < this.exam!.activities.length - 1) {
      this.currentActivity++;
      this.baseView?.onViewModelChanged();
    }
    this.alert = null;
    this.baseView?.onViewModelChanged();
    this.setStepper();
  }
  
  /**
   * Move to previous activity
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public movePrev = (): void => {
    if (this.currentActivity !== 0) {
      this.currentActivity--;
      this.baseView?.onViewModelChanged();
    }
    this.alert = null;
    this.baseView?.onViewModelChanged();
    this.setStepper();
  }

  /**
   * validate activity result
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @param key target activity index
   */
  private validateResult(key: number): boolean {
    const result = this.result[key];
    if (!this.exam?.activities[key] || !result) return false;
    const { activity_type_id } = this.exam?.activities[key].activity;
    if (activity_type_id === 1) {
      return validateMatching(result as string[][])
    }
    if (activity_type_id === 2) {
      return validateMultiple(result as number)
    }
    if (activity_type_id === 3) {
      return validateCompletion(result as CompletionAnswer[])
    }
    return false;
  }
}


