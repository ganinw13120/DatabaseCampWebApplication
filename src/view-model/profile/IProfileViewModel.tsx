import { User } from '@model/User';
import BaseViewModel from '@view-model/BaseViewModel';
import { FormInstance } from 'antd/es/form';

export default interface IProfileViewModel extends BaseViewModel {
    formRef?: React.RefObject<FormInstance<any>>
    profileData : User | null
    submitChangeName() : void
    alertText : string
}
