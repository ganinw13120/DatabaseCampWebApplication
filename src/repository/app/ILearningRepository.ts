// ILearningRepository.ts
/**
 * This file used to be a interface of learning repository.
*/
import { ExamResult, ExamAnswer, Exam, ExaminationOverview, Answer, Hint, RoadMap, Lecture, Activity, Overview, PeerAnswer, Recommend } from "@model/Learning";

export default interface ILearningRepository {

    /**
     * Fetch `Examination Result` data on examination result page.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param exam_id for target examination
     *
     * @return ExamResult
     */
    fetchExamResult(token: string, exam_id: number): Promise<ExamResult>
    fetchRecommend(token: string) : Promise<Recommend>

    /**
     * Submit `Examination` result.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param result answer of examination
     *
     * @return Result including lead to result page
     */
    submitExam(token: string, result: ExamAnswer): Promise<object>

    /**
     * Fetch `Examination` information shown on examination flow.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param examId identifier for target examination
     *
     * @return Exam information
     */
    fetchExam(token: string, examId: number): Promise<Exam>

    /**
     * Fetch `Overview Examination` information shown on examination overview page.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @return Examinations information
     */
    fetchExamOverview(token: string): Promise<ExaminationOverview>

    checkActiivty(token: string, activityId : number, activityTypeId : number, result : Answer): Promise<object>

    checkPeer(token: string, er_id : number, result : string[]): Promise<object>

    /**
     * Submit `Answer` of multiple choice activity and check for result.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param activityId identifier of target activity
     *
     * @param result result of activity
     *
     * @return Result of submittion
     */
    checkMultiple(token: string, activityId: number, result: Answer): Promise<object>

    /**
     * Submit `Answer` of matching choice activity and check for result.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param activityId identifier of target activity
     *
     * @param result result of activity
     *
     * @return Result of submittion
     */
    checkMatching(token: string, activityId: number, result: Answer): Promise<object>

    /**
     * Submit `Answer` of completion choice activity and check for result.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param activityId identifier of target activity
     *
     * @param result result of activity
     *
     * @return Result of submittion
     */
    checkCompletion(token: string, activityId: number, result: Answer): Promise<object>

    /**
     * Fetch `Hint` information of target activity.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param activityId identifier of target activity
     *
     * @return Hint information
     */
    getHint(token: string, activityId: number): Promise<{hint : Hint}>

    /**
     * Fetch `Roadmap` information of target content.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param contentId identifier of target content
     *
     * @return Roadmap information
     */
    fetchRoadmap(token: string, contentId: number): Promise<RoadMap>

    /**
     * Fetch `Lecture` information of target content shown on lecture page.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param contentId identifier of target content
     *
     * @return Lecture information shown on lecture page
     */
    fetchLecture(token: string, contentId: number): Promise<Lecture>

    /**
     * Fetch `Activity` information of target activity on activity page.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @param activityId identifier of target activity
     *
     * @return Activity information shown on activity page
     */
    fetchActivity(token: string, activityId: number): Promise<Activity>

    /**
     * Fetch `Overview` information of current user shown on overview page.
     *
     * @remarks
     * This method is part of repository, connect to backend service.
     *
     * @param token for authentication
     *
     * @return Overview information shown on overview page
     */
    fetchOverview(token: string): Promise<Overview>
}