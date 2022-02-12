import { Activity, ActivityAlert, Answer } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface IActivityViewModel extends BaseViewModel {
    /**
     * Get activity alert
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Activity alert information
     */
    getAlert(): ActivityAlert | null


    /**
     * Get activity information
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Activity information
     */
    getActivityInfo(): Activity | null

    /**
     * On user submit activity
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    onSubmit(): void

    /**
     * Move to next activity
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    moveNext(): void

    /**
     * Get user request for hint
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    onHint(): Promise<any>

    /**
     * On user update activity's answer, update answer data
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @param result activity's answer
     */
    updateResult(result: Answer): void
}
