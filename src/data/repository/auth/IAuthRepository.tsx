import {loginBody, loginResult} from '../../structure/auth/LoginBody';


export default interface IAuthRepository {
  Login(data: loginBody): Promise<loginResult>;
}