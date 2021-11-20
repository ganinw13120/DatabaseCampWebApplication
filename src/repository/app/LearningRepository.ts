import axios from 'axios';
import { API_BASE_URL } from '../../constant/constant';

import {Overview, Lecture, RoadMap, Activity, Hint, Answer, ExaminationOverview, Exam, ExamAnswer, ExamResult} from '@model/Learning';

import ILearningRepository from './ILearningRepository';

export default class LearningRepository implements ILearningRepository {
  
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
  public async fetchExamResult(token: string, exam_id : number) : Promise<ExamResult> {
    return new Promise((resolve, reject) => {
      axios.get<ExamResult>(`${API_BASE_URL}/exam/result/${exam_id}` , {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  }
  
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
  public async submitExam(token: string, result : ExamAnswer): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.post(`${API_BASE_URL}/exam/check`, result, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  } 
  
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
  public async fetchExam(token: string, examId : number) : Promise<Exam> {
    return new Promise((resolve, reject) => {
      axios.get<Exam>(`${API_BASE_URL}/exam/proposition/${examId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  }
  
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
  public async fetchExamOverview(token: string) : Promise<ExaminationOverview> {
    return new Promise((resolve, reject) => {
      axios.get<ExaminationOverview>(`${API_BASE_URL}/exam/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  }
  
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
  public async checkMultiple(token: string, activityId : number, result : Answer): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.post(`${API_BASE_URL}/learning/activity/multiple/check-answer`, {
        activity_id: activityId,
        answer : result
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  } 
  
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
  public async checkMatching(token: string, activityId : number, result : Answer): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.post(`${API_BASE_URL}/learning/activity/matching/check-answer`, {
        activity_id: activityId,
        answer : result
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  } 
  
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
  public async checkCompletion(token: string, activityId : number, result : Answer): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.post(`${API_BASE_URL}/learning/activity/completion/check-answer`, {
        activity_id: activityId,
        answer : result
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  } 
  
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
  public async getHint(token: string, activityId : number): Promise<Hint> {
    return new Promise((resolve, reject) => {
      axios.post(`${API_BASE_URL}/learning/activity/hint/${activityId}`, {} ,{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => {
        const { data } = res;
        resolve(data as Hint)
      }).catch(res => {
        reject(new Error(res.response?.data?.th_message))
      })
    })
  } 
  
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
  public async fetchRoadmap(token: string, contentId : number): Promise<RoadMap> {
    return new Promise((resolve, reject) => {
      axios.get<RoadMap>(`${API_BASE_URL}/learning/content/roadmap/${contentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  } 
  
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
  public async fetchLecture(token: string, contentId : number): Promise<Lecture> {
    return new Promise((resolve, reject) => {
      axios.get<Lecture>(`${API_BASE_URL}/learning/video/${contentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  } 
  
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
  public async fetchActivity(token: string, activityId : number): Promise<Activity> {
    return new Promise((resolve, reject) => {
      axios.get<Activity>(`${API_BASE_URL}/learning/activity/${activityId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  } 
  
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
  public async fetchOverview(token: string) : Promise<Overview> {
    return new Promise((resolve, reject) => {
      axios.get<Overview>(`${API_BASE_URL}/learning/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  }
}
