import { ActivityAlert, Answer, Exam } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface IExamViewModel extends BaseViewModel {

    /**
     * Get form examination alert
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Alert information
     */
    getAlert(): ActivityAlert | null

    /**
     * Get is application is loaind
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Is loading data
     */
    getIsLoading(): boolean

    /**
     * Get examination information
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns examination information
     */
    getExam(): Exam | null

    /**
     * Get current activity index
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     *
     * @returns Current activity index
     */
    getCurrentActivity(): number

    /**
     * Update result on user activity result
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     * 
     * @param key target examination identifier
     * 
     * @param result Answer of activity
     */
    updateResult(key: number, result: Answer | null): void

    /**
     * On user submit activity, validate answer and submit answer
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    SubmitActivity(): void

    /**
     * Move to next activity
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    moveNext(): void

    /**
     * Move to previous activity
     *
     * @remarks
     * This method is part of view-model, application logic parts, manipulating view.
     */
    movePrev(): void
}
