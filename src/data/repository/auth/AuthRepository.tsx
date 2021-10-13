import IAuthRepository from './IAuthRepository';
import {loginResult, request} from '../../structure/auth/LoginBody';
import axios from 'axios';

export default class AuthRepository implements IAuthRepository {

  public async Login(data: request): Promise<loginResult> {
    return new Promise((resolve, rejects) => {
      axios.post('https://dev.api.databasecamp.io/user/login', data).then(res => {
        resolve({
          user_id: res.data.user_id,
          name: res.data.name,
          Useremail: res.data.email,
          point: res.data.point,
          access_token: res.data.access_token,
        });
      }).catch(res => {
        rejects(new Error(res.response?.data?.th_message))
      })
    })
  }
}
