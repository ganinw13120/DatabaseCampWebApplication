import IExamViewModel from './IExamViewModel';
import BaseView from '../../view/BaseView';
import { Answer, Exam } from '../../../domain/entity/model/Learning';
import { Stepper } from '../../../domain/entity/model/App';

export default class ExamViewModel implements IExamViewModel {
  private baseView?: BaseView;
  public currentActivity : number;
  public exam : Exam | null
  public result : Answer[]
  constructor (currentActivity : number) {
    this.exam = null;
    this.currentActivity = currentActivity;
    this.result = [];
  }
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
    baseView?.props.appStore?.setPercent(40)
    const search = baseView.props.location.search
    const examId = new URLSearchParams(search).get('id');
    baseView.props.examinationStore.FetchExam(examId).then((res : Exam) => {
      console.log(res)
      baseView?.props.appStore?.setPercent(100)
      const stepper : Stepper = {
        totalStep : res.activities.length,
        currentStep : this.currentActivity
      } 
      baseView?.props.appStore?.setStepper(stepper)
      this.exam = res;
      baseView.onViewModelChanged();
    })
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };
  
  public updateResult = (key : number, result: Answer): void => {
    this.result[key] = result;
  }

  public obSubmitActivity = () : void => {
    console.log(this.result)
    if (!this.exam) return;
    console.log(this.currentActivity, this.exam?.activities.length - 1)
    if (this.currentActivity < this.exam.activities.length - 1) {
      this.currentActivity++;
      this.baseView?.onViewModelChanged();
    }
    const stepper : Stepper = {
      totalStep : this.exam.activities.length,
      currentStep : this.currentActivity
    } 
    this.baseView?.props.appStore?.setStepper(stepper);
  }

}
