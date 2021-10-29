import { makeAutoObservable, makeObservable, observable, computed, action } from 'mobx';

import AuthRepository from '../../../../data/repository/auth/AuthRepository';

import RootStore from '../Rootstore';

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
      this.isAuthenticated = true; // Mock ที่จริงต้อง Verify ก่อนนะจ๊ะ
      // new Promise(async (resolve, reject) => {
        // await this.VerifyToken(token).then(() => {
          // console.log('verify sucuess')
        // });
      // })
    }
    console.log('contructor complete')
  }

  //
  // ─── INIT VALUE ─────────────────────────────────────────────────────────────────
  //
  isAuthenticated = false // not authenticated by default
  userData = null // null at first => suppose to be an object after the authenticated has set to true (means token was generated)
  // ────────────────────────────────────────────────────────────────────────────────

  @action.bound
  async VerifyToken(token : string) {
    await this.authRepository.VerifyToken(token).then(() => {
      console.log('verify complete')
    })
    return;
  }


  @action.bound
  Logout(cb?: any) {
    console.log('asd')
    this.isAuthenticated = false;
    window.localStorage.removeItem('token');
    cb?.();
  }

  @action.bound
  async Login(email: string, password: string, cb : any) {
    console.log(email, password)
    const result = await this.authRepository.Login({
      email: email,
      password : password,
    }).then((res) => {
      this.isAuthenticated = true;
      window.localStorage.setItem('token', res.accessToken);
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
    console.log(email, password)
    const result = await this.authRepository.Register({
      name : name,
      email: email,
      password : password,
    }).then((res) => {
      this.isAuthenticated = true;
      window.localStorage.setItem('token', res.accessToken);
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