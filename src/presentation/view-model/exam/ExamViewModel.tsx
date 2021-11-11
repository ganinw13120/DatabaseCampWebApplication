import IExamViewModel from './IExamViewModel';
import BaseView from '../../view/BaseView';
import { Answer, CompletionAnswer, Exam } from '../../../domain/entity/model/Learning';
import { Step, Stepper } from '../../../domain/entity/model/App';

import { validateCompletion, validateMultiple, validateMatching } from '../../util/validateActvitiy';

export default class ExamViewModel implements IExamViewModel {
  private baseView?: BaseView;
  public currentActivity : number;
  public exam : Exam | null
  public result : Answer[]
  constructor (currentActivity : number) {
    this.exam = null;
    this.currentActivity = currentActivity;
    this.result = [];
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView?.props.appStore?.setPercent(40)
    const search = baseView.props.location.search
    const examId = new URLSearchParams(search).get('id');
    baseView.props.examinationStore.FetchExam(examId).then((res : Exam) => {
      this.exam = res;
      baseView.onViewModelChanged();
      baseView?.props.appStore?.setPercent(100)
      this.setStepper();
    })
  };

  public setStepper = () : void => {
    if (!this.exam) return;
    const stepper : Stepper = this.generateExamStepper(this.exam)
    stepper.onNext = this.moveNext;
    stepper.onPrev = this.movePrev;
    this.baseView!.props.appStore.setStepper(stepper)
  }

  private generateExamStepper = (res : Exam) : Stepper => { 
    const stepper : Stepper = {
      currentStep : this.currentActivity,
      steps : []
    } 
    res.activities.forEach((e, key : number)=>{
      stepper.steps.push(this.validateResult(key) ? Step.Activity : Step.UnCompleteActivity)
    })
    return stepper;
  }

  public detachView = (): void => {
    this.baseView = undefined;
  };
  
  public updateResult = (key : number, result: Answer | null): void => {
    this.result[key] = result;
  }

  public obSubmitActivity = () : void => {
    if (!this.exam) return;
    if (this.currentActivity < this.exam.activities.length - 1) {
      this.currentActivity++;
      this.baseView?.onViewModelChanged();
    } else {
      let isPassed = true;
      this.exam.activities.forEach((_, key : number) => {
        const temp = this.validateResult(key);
        if (!temp) isPassed = false;
      })
      if (!isPassed) return;
      this.baseView!.props.examinationStore.submitExam(this.result, this.exam)
    }
    this.setStepper();
  }

  public moveNext = () : void => {
    if (this.currentActivity < this.exam!.activities.length - 1) {
      this.currentActivity++;
      this.baseView?.onViewModelChanged();
    }
    this.setStepper();
  }
  public movePrev = () : void => {
    if (this.currentActivity !== 0) {
      this.currentActivity--;
      this.baseView?.onViewModelChanged();
    }
    this.setStepper();
  }

  private validateResult = (key : number) : boolean => {
    const result = this.result[key];
    if (!this.exam?.activities[key] || !result) return false;
    const {activity_type_id} = this.exam?.activities[key].info;
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


