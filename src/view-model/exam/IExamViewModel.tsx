import { ActivityAlert, Answer, Exam } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface IExamViewModel extends BaseViewModel {
    currentActivity : number;
    exam : Exam | null;
    alert : ActivityAlert | null;
    isLoading : boolean;
    updateResult(key : number, result : Answer | null) : void;
    obSubmitActivity () : void;
    moveNext () : void;
    movePrev () : void;
}
