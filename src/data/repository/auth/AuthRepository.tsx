import IAuthRepository from './IAuthRepository';

import axios from 'axios';
import { API_BASE_URL } from '../../../constant/constant';

export default class AuthRepository implements IAuthRepository {

  public async VerifyToken(token: any) : Promise<object> {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE_URL}/user/info`, {
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

  public async Login(data: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      axios.post(`${API_BASE_URL}/user/login`, data).then(res => {
        resolve({
          user_id: res.data.user_id,
          name: res.data.name,
          Useremail: res.data.email,
          point: res.data.point,
          accessToken: res.data.access_token,
        });
      }).catch(res => {
        rejects(new Error(res.response?.data?.th_message))
      })
    })
  }

  public async Register(data: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      axios.post(`${API_BASE_URL}/user/register`, data).then(res => {
        resolve({
          userID: res.data["user_id"],
          name: res.data["name"],
          email: res.data["email"],
          point: res.data["point"],
          accessToken: res.data["access_token"],
        });
      }).catch(res => {
        rejects(new Error(res.response?.data?.th_message))
      })
    })
  }
}
