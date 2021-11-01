import axios from 'axios';
import { API_BASE_URL } from '../../../constant/constant';
export default class OverviewRepository {
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
