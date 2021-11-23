import { Activity, ActivityAlert, Answer } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface IActivityViewModel extends BaseViewModel {
    getAlert () : ActivityAlert | null
    getActivityInfo() : Activity | null

    onSubmit () : void
    moveNext () : void
    onHint () : Promise<any>
    updateResult (result : Answer) : void
}
