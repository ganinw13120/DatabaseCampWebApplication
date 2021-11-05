import axios from 'axios';
import { API_BASE_URL } from '../../../constant/constant';
export default class LearningRepository {
  public async FetchRoadmap(token: string, contentId : number): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/learning/content/roadmap/${contentId}`, {
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
  public async FetchLecture(token: string, contentId : number): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/learning/video/${contentId}`, {
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
  public async FetchActivity(token: string, activityId : number): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/learning/activity/${activityId}`, {
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
  public async FetchOverview(token: string) : Promise<object> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/learning/overview`, {
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
