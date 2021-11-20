import { makeObservable, observable, action } from 'mobx';

import AuthRepository from '@repository/auth/AuthRepository';

import RootStore from '../RootStore';

import {User, AuthUser} from '@model/User';

interface Store {
  userData : User | null,
  token : string,
  isLoading : boolean,
}


export class AuthStore{
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
  store : Store = {
    isLoading: false,
    userData: null,
    token : '',
  }

  @action.bound
  DecreaseUserPoint (point : number) : void {
    let {userData : temp} = this.store;
    if (!temp) return;
    temp.point -= point;
    this.store.userData = temp;
  }

  @action.bound
  SetUserPoint (point : number) : void {
    let {userData : temp} = this.store;
    if (!temp) return;
    temp.point = point;
    this.store.userData = temp;
  }

  @action.bound
  UpdateUserName (name : string) : void {
    let {userData : temp} = this.store;
    if (!temp) return;
    temp.name = name;
    this.store.userData = temp;
  }

  @action.bound
  async VerifyToken(token : string) {
    await this.authRepository.VerifyToken(token).then(this.onVerifySuccess).catch(() => {
      this.Logout()
    })
    return;
  }
  
  @action.bound
  onVerifySuccess (res : User) : User {
    this.store.userData = res;
    this.store.isLoading = false;
    return res;
  }


  @action.bound
  Logout(cb?: any) {
    this.store.token = '';
    this.store.userData = null;
    this.store.isLoading = false;
    window.localStorage.removeItem('token');
    cb?.();
  }

  @action.bound
  async Login(email: string, password: string, cb : any) {
    const result = await this.authRepository.Login({
      email: email,
      password : password,
    }).then(this.onLoginSuccess).catch((err) => {
      return {
        issuccess: false,
        message : err.message
      }
    })
    cb?.(result)
  }

  @action.bound
  onLoginSuccess (res : AuthUser) : any {
    const token = res.access_token;
    window.localStorage.setItem('token', token);
    const userData : User = res as User;
    this.store.token = token;
    this.store.userData = userData;
    return {
      issuccess: true,
      message : ''
    }
  }

  @action.bound
  async Register(name : string, email: string, password: string, cb : any) {
    const result = await this.authRepository.Register({
      name : name,
      email: email,
      password : password,
    }).then(this.onRegisterSuccess).catch((err) => {
      return {
        issuccess: false,
        message : err.message
      }
    })
    cb?.(result)
  }
  @action.bound
  onRegisterSuccess (res : AuthUser) : any {
    const token = res.access_token;
    window.localStorage.setItem('token', token);
    const userData : User = res as User;
    this.store.token = token;
    this.store.userData = userData;
    return {
      issuccess: true,
      message : ''
    }
  }
}