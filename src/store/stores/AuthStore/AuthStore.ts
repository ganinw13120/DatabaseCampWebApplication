import { makeObservable, observable, action } from 'mobx';

import AuthRepository from '@repository/auth/AuthRepository';

import RootStore from '../../RootStore';

import { User, AuthUser } from '@model/User';
import IAuthStore, { Store } from './IAuthStore';


export class AuthStore implements IAuthStore {
  rootStore; // contains the root of store (outest mobx)

  private authRepository: AuthRepository;

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

  @observable
  store: Store = {
    isLoading: false,
    userData: null,
    token: '',
  }

  @action.bound
  public DecreaseUserPoint(point: number): void {
    let { userData: temp } = this.store;
    if (!temp) return;
    temp.point -= point;
    this.store.userData = temp;
  }

  @action.bound
  public SetUserPoint(point: number): void {
    let { userData: temp } = this.store;
    if (!temp) return;
    temp.point = point;
    this.store.userData = temp;
  }

  @action.bound
  public UpdateUserName(name: string): void {
    let { userData: temp } = this.store;
    if (!temp) return;
    temp.name = name;
    this.store.userData = temp;
  }

  @action.bound
  public async VerifyToken(token: string): Promise<void> {
    await this.authRepository.VerifyToken(token).then(this.onVerifySuccess).catch(() => {
      this.Logout()
    })
    return;
  }

  @action.bound
  private onVerifySuccess(res: User): User {
    this.store.userData = res;
    this.store.isLoading = false;
    return res;
  }


  @action.bound
  public Logout(cb?: any): void {
    this.store.token = '';
    this.store.userData = null;
    this.store.isLoading = false;
    window.localStorage.removeItem('token');
    cb?.();
  }

  @action.bound
  public async Login(email: string, password: string, cb: any): Promise<void> {
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