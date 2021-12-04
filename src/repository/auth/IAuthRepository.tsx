// IAuthRepository.ts
/**
 * This file used to be a interface of authentication repository.
*/
import { AuthUser, User } from "@model/User";

export default interface IAuthRepository {

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
  Login(data: any): Promise<any>

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
  Register(data: any): Promise<AuthUser>

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
  VerifyToken(token: string): Promise<User>
}