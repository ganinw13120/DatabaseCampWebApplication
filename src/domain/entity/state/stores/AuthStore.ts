import { makeObservable, observable, action } from 'mobx';

import AuthRepository from '../../../../data/repository/auth/AuthRepository';

import RootStore from '../Rootstore';

interface Store {
  [key : string] : any
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
      this.setStore({
        isLoading: true,
        token : token
      })
      this.setStore({isLoading : true, isAuthenticated : false}, true)
      this.VerifyToken(token);
    }
  }

  @observable
  store : Store = {
    isAuthenticated: false,
    isLoading: false,
    userData: null,
    token : null,
  }

  @action.bound
  async VerifyToken(token : string) {
    await this.authRepository.VerifyToken(token).then((res) => {
      this.setStore({
        userData: res,
        isAuthenticated: true,
        isLoading : false,
      })
    }).catch(() => {
      this.Logout()
    })
    return;
  }


  @action.bound
  Logout(cb?: any) {
    this.setStore({
      isAuthenticated : false,
      isLoading : false,
      token : null
    })
    window.localStorage.removeItem('token');
    cb?.();
  }

  @action.bound
  async Login(email: string, password: string, cb : any) {
    const result = await this.authRepository.Login({
      email: email,
      password : password,
    }).then((res) => {
      const token = res.accessToken;
      res.accessToken = null;
      window.localStorage.setItem('token', token);
      this.setStore({
        userData : res,
        isAuthenticated: true,
        token : token
      })
      return {
        issuccess: true,
        message : ''
      }
    }).catch((err) => {
      return {
        issuccess: false,
        message : err.message
      }
    })
    cb?.(result)
  }

  @action.bound
  async Register(name : string, email: string, password: string, cb : any) {
    const result = await this.authRepository.Register({
      name : name,
      email: email,
      password : password,
    }).then((res) => {
      const token = res.accessToken;
      res.accessToken = null;
      window.localStorage.setItem('token', token);
      this.setStore({
        userData : res,
        isAuthenticated: true,
        token : token
      })
      return {
        issuccess: true,
        message : ''
      }
    }).catch((err) => {
      console.log(err)
      return {
        issuccess: false,
        message : err.message
      }
    })
    cb?.(result)
  }

  @action.bound
  setStore(data: { [key: string]: any }, merge: boolean = false) {
    for (let e in data) {
      const _data = data[e];
      if (merge) {
        this.store[e] = {
          ...this.store[e],
          ..._data
        };
      }
      else {
        this.store[e] = _data;
      }
    }
  }
}