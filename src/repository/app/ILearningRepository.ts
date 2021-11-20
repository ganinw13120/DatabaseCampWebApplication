import { ExamResult, ExamAnswer, Exam, ExaminationOverview, Answer, Hint, RoadMap, Lecture, Activity, Overview } from "@model/Learning";

export default interface ILearningRepository {
    fetchExamResult(token: string, exam_id : number) : Promise<ExamResult>;
    submitExam(token: string, result : ExamAnswer): Promise<object>;
    fetchExam(token: string, examId : number) : Promise<Exam>;
    fetchExamOverview(token: string) : Promise<ExaminationOverview>;
    checkMultiple(token: string, activityId : number, result : Answer): Promise<object>;
    checkMatching(token: string, activityId : number, result : Answer): Promise<object>;
    checkCompletion(token: string, activityId : number, result : Answer): Promise<object>;
    getHint(token: string, activityId : number): Promise<Hint>;
    fetchRoadmap(token: string, contentId : number): Promise<RoadMap>;
    fetchLecture(token: string, contentId : number): Promise<Lecture>;
    fetchActivity(token: string, activityId : number): Promise<Activity>;
    fetchOverview(token: string) : Promise<Overview>;
}