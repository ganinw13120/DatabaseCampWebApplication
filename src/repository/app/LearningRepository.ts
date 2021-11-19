import axios from 'axios';
import { API_BASE_URL } from '../../constant/constant';

import {Overview, Lecture, RoadMap, Activity, Hint, Answer, ExaminationOverview, Exam, ExamAnswer, ExamResult} from '@model/Learning';

export default class LearningRepository {
  
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
  public async fetchExamOverview(token: string) : Promise<ExaminationOverview> {
    return new Promise((resolve, reject) => {
      axios.get<ExaminationOverview>(`${API_BASE_URL}/exam/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        console.log(data)
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  }
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
