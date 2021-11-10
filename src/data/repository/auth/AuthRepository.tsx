import IAuthRepository from './IAuthRepository';

import axios from 'axios';
import { API_BASE_URL } from '../../../constant/constant';

import { AuthUser, User } from '../../../domain/entity/model/User';

export default class AuthRepository implements IAuthRepository {

  public async VerifyToken(token: any) : Promise<User> {
    return new Promise((resolve, reject) => {
      axios.get<User>(`${API_BASE_URL}/user/info`, {
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

  public async Login(data: any): Promise<AuthUser> {
    return new Promise((resolve, rejects) => {
      axios.post(`${API_BASE_URL}/user/login`, data).then(res => {
        resolve(res.data as AuthUser);
      }).catch(res => {
        rejects(new Error(res.response?.data?.th_message))
      })
    })
  }

  public async Register(data: any): Promise<AuthUser> {
    return new Promise((resolve, rejects) => {
      axios.post(`${API_BASE_URL}/user/register`, data).then(res => {
        resolve(res.data as AuthUser);
      }).catch(res => {
        rejects(new Error(res.response?.data?.th_message))
      })
    })
  }
}
