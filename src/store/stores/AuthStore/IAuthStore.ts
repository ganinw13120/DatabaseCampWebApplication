// IAuthStore.ts
/**
 * This file used to be a interface of auth store.
*/
import { User } from "@model/User";

export default interface IAuthStore {

  /**
   * Decrease user's points
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param point will be reduced
   */
  DecreaseUserPoint(point: number): void

  /**
   * Set user's points
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param point will be set
   */
  SetUserPoint(point: number): void

  /**
   * Set user's name
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param name will be set
   */
  UpdateUserName(name: string): void

  /**
   * Verify user's token
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param token user's token
   */
  VerifyToken(token: string): Promise<void>

  /**
   * On logout application
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param cb callback function
   */
  Logout(cb?: any): void

  /**
   * On user login application
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param email user's email
   *
   * @param password user's password
   *
   * @param cb callback function
   */
  Login(email: string, password: string, cb: any): Promise<void>

  /**
   * On user login successfully
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param res user's information
   *
   * @return message to user
   */
  Register(name: string, email: string, password: string, cb: any): Promise<void>
  
  /**
   * Store for storing datas
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   */
  store : Store
}

export type Store = {
  userData: User | null
  token: string
  isLoading: boolean
}
