import axios from 'axios';
import { API_BASE_URL } from '../../../constant/constant';
export default class LearningRepository {
  public async fetchPointRanking(token: string) : Promise<object> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/user/ranking`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => {
        console.log(res)
        const { data } = res;
        resolve(data)
      }).catch(res=>{
        reject(res.message)
      })
    })
  }

  public async fetchProfile(token: string, userID: number) : Promise<object> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/user/profile/${userID}`, {
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
