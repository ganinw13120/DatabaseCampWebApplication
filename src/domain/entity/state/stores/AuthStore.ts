import { makeAutoObservable } from 'mobx';

import AuthRepository from '../../../../data/repository/auth/AuthRepository';

import RootStore from '../Rootstore';

export class AuthStore{
  rootStore; // contains the root of store (outest mobx)
  
  private authRepository: AuthRepository;

  constructor(rootStore: RootStore) {

    const authRepository = new AuthRepository();

    this.authRepository = authRepository;

    const token = window.localStorage.getItem('token');
    
    if (token) {
      this.isAuthenticated = true; // Mock ที่จริงต้อง Verify ก่อนนะจ๊ะ
    }

    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  //
  // ─── INIT VALUE ─────────────────────────────────────────────────────────────────
  //
  isAuthenticated = false // not authenticated by default
  userData = null // null at first => suppose to be an object after the authenticated has set to true (means token was generated)
  // ────────────────────────────────────────────────────────────────────────────────

  async Login(email: string, password: string, cb : any) {
    console.log(email, password)
    const result = await this.authRepository.Login({
      email: email,
      password : password,
    }).then((res) => {
      // this.authStore.Login(res)
      console.log(res);
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
    // this.isAuthenticated = true;
    // window.localStorage.setItem('token', data.accessToken)
  }

  async Register(name : string, email: string, password: string, cb : any) {
    console.log(email, password)
    const result = await this.authRepository.Register({
      name : name,
      email: email,
      password : password,
    }).then((res) => {
      console.log(res);
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

}