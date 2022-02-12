// AuthRepository.ts
/**
 * This file is a part of repository, used to conenct with services which related to authentication.
*/
import IAuthRepository from './IAuthRepository';

import axios from 'axios';
import { API_BASE_URL } from '../../constant/constant';

import { AuthUser, User } from '../../model/User';

export default class AuthRepository implements IAuthRepository {

  /**
   * Verify `Access Token` of current session token.
   *
   * @remarks
   * This method is part of repository, connect to backend service.
   *
   * @param token for authentication
   *
   * @return current user's information, reject if token is unable to verify.
   */
  public async VerifyToken(token: string) : Promise<User> {
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

  /**
   * Submit `Login` information to generate session.
   *
   * @remarks
   * This method is part of repository, connect to backend service.
   *
   * @param data information of user
   *
   * @return User's information, reject if unable to login.
   */
  public async Login(data: any): Promise<AuthUser> {
    return new Promise((resolve, rejects) => {
      axios.post(`${API_BASE_URL}/user/login`, data).then(res => {
        resolve(res.data as AuthUser);
      }).catch(res => {
        rejects(new Error(res.response?.data?.th_message))
      })
    })
  }

  /**
   * Submit `Register` information to generate session.
   *
   * @remarks
   * This method is part of repository, connect to backend service.
   *
   * @param data information of user
   *
   * @return User's information, reject if unable to register
   */
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
