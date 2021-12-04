import axios from 'axios';
import { API_BASE_URL } from '@constant/constant';

import { Ranking, User } from '@model/User';

export default class LearningRepository {
  
  /**
   * Fetch `Point` information of all users shown on point ranking page.
   *
   * @remarks
   * This method is part of repository, connect to backend service.
   *
   * @param token for authentication
   *
   * @return Ranking of users information shown on point ranking page
   */
  public async fetchPointRanking(token: string) : Promise<Ranking> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/user/ranking`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data as Ranking)
      }).catch(res=>{
        reject(res.message)
      })
    })
  }

  /**
   * Fetch `Profile` information of target user shown on profile page.
   *
   * @remarks
   * This method is part of repository, connect to backend service.
   *
   * @param token for authentication
   *
   * @param userID identifier of target user
   *
   * @return Users information shown on profile page
   */
  public async fetchProfile(token: string, userID: number) : Promise<User> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/user/profile/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        const { data } = res;
        resolve(data as User)
      }).catch(res=>{
        reject(res.message)
      })
    })
  }

  /**
   * Update `User's Name` of current user.
   *
   * @remarks
   * This method is part of repository, connect to backend service.
   *
   * @param token for authentication
   *
   * @param name user's new name
   *
   * @return Result of action
   */
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
