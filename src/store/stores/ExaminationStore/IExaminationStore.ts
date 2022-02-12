// IExaminationStore.ts
/**
 * This file used to be a interface of examination store.
*/
import { Exam, ExamResult, Answer, ExaminationOverview, Recommend } from "@model/Learning";

export default interface IExaminationStore {

    /**
     * On user enter examination page, start fetching examination
     *
     * @remarks
     * This method is part of examination store, manipulating examination and examination'data.
     *
     * @param examId exam's identifier
     *
     * @return Examination information
     */
    FetchExam(examId: number): Promise<Exam | null>

    /**
     * On user enter examination result page, fetching examination'result
     *
     * @remarks
     * This method is part of examination store, manipulating examination and examination'data.
     *
     * @param examId exam's identifier
     *
     * @return Examination result information
     */
    FetchResult(examId: number): Promise<ExamResult | null>
    
    FetchRecommend() : Promise<Recommend | null>

    /**
     * On user enter examination overview page, start fetching examination overview from repository
     *
     * @remarks
     * This method is part of examination store, manipulating examination and examination'data.
     */
    FetchExamOverview(): Promise<any>

    /**
     * On user submit examination, submitting information to repository.
     *
     * @remarks
     * This method is part of examination store, manipulating examination and examination'data.
     *
     * @param result exam's result
     *
     * @param exam examination information
     *
     * @param cb callback function
     *
     * @return Examination information
     */
    submitExam(result: Answer[], exam: Exam, onSuccess : (res : { exam_result_id : string }) => void, onError : () => void): void
    
    /**
     * Store for storing datas
     *
     * @remarks
     * This method is part of examination store, manipulating examination and examination'data.
     */
    store: Store
}

export type Store = {
    data: ExaminationOverview | null
}
