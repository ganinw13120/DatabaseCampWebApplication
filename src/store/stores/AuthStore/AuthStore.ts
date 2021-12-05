// AuthStore.ts
/**
 * This file used to be a store about authentication of mobx store, functions, and data related to authentication.
*/
import { makeObservable, observable, action } from 'mobx';

import AuthRepository from '@repository/auth/AuthRepository';
import IAuthRepository from '@repository/auth/IAuthRepository';

import RootStore from '../../RootStore';

import { User, AuthUser } from '@model/User';
import IAuthStore, { Store } from './IAuthStore';


export class AuthStore implements IAuthStore {
  rootStore; // contains the root of store (outest mobx)

  private authRepository: IAuthRepository;

  constructor(rootStore: RootStore) {

    const authRepository = new AuthRepository();

    this.rootStore = rootStore;
    makeObservable(this)

    this.authRepository = authRepository;

    const token = window.localStorage.getItem('token');
    if (token) {
      this.store.isLoading = true;
      this.store.token = token;
      this.VerifyToken(token);
    }
  }

  /**
   * Store for storing datas
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   */
  @observable
  store: Store = {
    isLoading: false,
    userData: null,
    token: '',
  }

  /**
   * Decrease user's points
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param point will be reduced
   */
  @action.bound
  public DecreaseUserPoint(point: number): void {
    let { userData: temp } = this.store;
    if (!temp) return;
    temp.point -= point;
    this.store.userData = temp;
  }

  /**
   * Set user's points
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param point will be set
   */
  @action.bound
  public SetUserPoint(point: number): void {
    let { userData: temp } = this.store;
    if (!temp) return;
    temp.point = point;
    this.store.userData = temp;
  }

  /**
   * Set user's name
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param name will be set
   */
  @action.bound
  public UpdateUserName(name: string): void {
    let { userData: temp } = this.store;
    if (!temp) return;
    temp.name = name;
    this.store.userData = temp;
  }

  /**
   * Verify user's token
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param token user's token
   */
  @action.bound
  public async VerifyToken(token: string): Promise<void> {
    await this.authRepository.VerifyToken(token).then(this.onVerifySuccess).catch(() => {
      this.Logout()
    })
    return;
  }

  /**
   * On user's token verify successfully
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param res user's data
   *
   * @return User data
   */
  @action.bound
  private onVerifySuccess(res: User): User {
    this.store.userData = res;
    this.store.isLoading = false;
    return res;
  }

  /**
   * On logout application
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param cb callback function
   */
  @action.bound
  public Logout(cb?: any): void {
    this.store.token = '';
    this.store.userData = null;
    this.store.isLoading = false;
    window.localStorage.removeItem('token');
    cb?.();
  }

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
  @action.bound
  public async Login(email: string, password: string, cb ?: any): Promise<void> {
    const result = await this.authRepository.Login({
      email: email,
      password: password,
    }).then(this.onLoginSuccess).catch((err) => {
      return {
        issuccess: false,
        message: err.message
      }
    })
    cb?.(result)
  }

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
  @action.bound
  private onLoginSuccess(res: AuthUser): any {
    const token = res.access_token;
    window.localStorage.setItem('token', token);
    const userData: User = res as User;
    this.store.token = token;
    this.store.userData = userData;
    return {
      issuccess: true,
      message: ''
    }
  }

  /**
   * On user register application
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
  @action.bound
  public async Register(name: string, email: string, password: string, cb: any): Promise<void> {
    const result = await this.authRepository.Register({
      name: name,
      email: email,
      password: password,
    }).then(this.onRegisterSuccess).catch((err) => {
      return {
        issuccess: false,
        message: err.message
      }
    })
    cb?.(result)
  }

  /**
   * On user register successfully
   *
   * @remarks
   * This method is part of authentication store, manipulating authentication and user'data.
   *
   * @param res user's information
   *
   * @return message to user
   */
  @action.bound
  private onRegisterSuccess(res: AuthUser): any {
    const token = res.access_token;
    window.localStorage.setItem('token', token);
    const userData: User = res as User;
    this.store.token = token;
    this.store.userData = userData;
    return {
      issuccess: true,
      message: ''
    }
  }
}