import {loginBody, loginResult} from '../../structure/auth/LoginBody';


export default interface IAuthRepository {
  Login(data: any): Promise<any>;
}