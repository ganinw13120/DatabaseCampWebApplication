import IAuthRepository from './IAuthRepository';
import {loginResult, request} from '../../structure/auth/LoginBody';
import axios from 'axios';

export default class AuthRepository implements IAuthRepository {

  public async Login(data: request): Promise<loginResult> {
    return new Promise((resolve, rejects) => {
      axios.post('/user/login', data).then(res => {
        resolve({
          userId: res.data.userId,
          name: res.data.name,
          Useremail: res.data.email,
          points: res.data.points,
          token: res.data.token,
        });
      }).catch(res => {
        rejects(new Error(res.response?.data?.th_message))
      })
    })
  }
}
