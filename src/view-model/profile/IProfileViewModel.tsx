import BaseViewModel from '@view-model/BaseViewModel';

export default interface IProfileViewModel extends BaseViewModel {
    submitChangeName() : void;
    alertText : string;
}
