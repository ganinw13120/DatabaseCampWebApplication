import axios from 'axios';
import { API_BASE_URL } from '@constant/constant';

import { Ranking, User } from '@model/User';

export default class LearningRepository {
  public async fetchPointRanking(token: string) : Promise<Ranking> {
    return new Promise((resolve, reject) => {
      axios.get<Ranking>(`${API_BASE_URL}/user/ranking`, {
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

  public async fetchProfile(token: string, userID: number) : Promise<User> {
    return new Promise((resolve, reject) => {
      axios.get<User>(`${API_BASE_URL}/user/profile/${userID}`, {
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

  public async updateName(token: string, name: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      axios.put(`${API_BASE_URL}/user/profile`, {
        name : name
      } , {
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
