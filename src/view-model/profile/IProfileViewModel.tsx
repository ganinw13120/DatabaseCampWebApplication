import { User } from '@model/User';
import BaseViewModel from '@view-model/BaseViewModel';
import { FormInstance } from 'antd/es/form';

export default interface IProfileViewModel extends BaseViewModel {


    /**
     * Get profile data
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     * 
     * @returns Profile data
     */
    getProfileData(): User | null

    /**
     * Get input form reference data
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     * 
     * @returns Input form reference data
     */
    getFormRef(): React.RefObject<FormInstance<any>> | undefined

    /**
     * Get alert data
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     * 
     * @returns Alert data
     */
    getAlertText(): string

    /**
     * On user submit name changing input form, submitting new display name
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    submitChangeName(): void
}
