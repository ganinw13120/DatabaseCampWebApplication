import { ActivityAlert, Answer, Exam } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface IExamViewModel extends BaseViewModel {
    getAlert () : ActivityAlert | null
    getIsLoading () : boolean 
    getExam () : Exam | null
    getCurrentActivity () : number
    updateResult(key : number, result : Answer | null) : void
    SubmitActivity () : void
    moveNext () : void
    movePrev () : void
}
