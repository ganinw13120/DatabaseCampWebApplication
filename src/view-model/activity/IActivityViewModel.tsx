import { Answer } from '../../model/Learning';
import BaseViewModel from '../BaseViewModel';

export default interface IOverviewViewModel extends BaseViewModel {
    onSubmit () : void;
    moveNext () : void;
    onHint () : Promise<any>;
    updateResult (result : Answer) : void;
}
