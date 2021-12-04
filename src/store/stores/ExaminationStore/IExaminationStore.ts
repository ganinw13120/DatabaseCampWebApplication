import { Exam, ExamResult, Answer, ExaminationOverview } from "@model/Learning";

export default interface IExaminationStore {
    FetchExam(examId: number): Promise<Exam | null>
    FetchResult(examId: number): Promise<ExamResult | null>
    FetchExamOverview(): Promise<any>
    submitExam(result: Answer[], exam: Exam, cb: any): void
    store: Store
}

export type Store = {
    data: ExaminationOverview | null
}
