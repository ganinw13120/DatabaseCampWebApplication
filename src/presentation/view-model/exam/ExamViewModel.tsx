import IExamViewModel from './IExamViewModel';
import BaseView from '../../view/BaseView';
import { Answer, Exam } from '../../../domain/entity/model/Learning';
import { Step, Stepper } from '../../../domain/entity/model/App';

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
    res.activities.forEach(e=>{
      stepper.steps.push(Step.Activity)
    })
    return stepper;
  }

  public detachView = (): void => {
    this.baseView = undefined;
  };
  
  public updateResult = (key : number, result: Answer): void => {
    this.result[key] = result;
  }

  public obSubmitActivity = () : void => {
    if (!this.exam) return;
    if (this.currentActivity < this.exam.activities.length - 1) {
      this.currentActivity++;
      this.baseView?.onViewModelChanged();
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

}
