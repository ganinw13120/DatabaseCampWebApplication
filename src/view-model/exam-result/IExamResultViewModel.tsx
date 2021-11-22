import { ExamResult } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface IProfileViewModel extends BaseViewModel {
    data : ExamResult | null
}
