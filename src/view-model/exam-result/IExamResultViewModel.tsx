import { ExamResult } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface IProfileViewModel extends BaseViewModel {

    /**
     * Get examination result data
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Examination result data
     */
    getData () : ExamResult | null
}
