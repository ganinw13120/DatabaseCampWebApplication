import { makeAutoObservable } from 'mobx';

import axios from 'axios'
import RootStore from '../Rootstore';

export class AuthStore{
  rootStore; // contains the root of store (outest mobx)
  constructor(rootStore:RootStore){
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  //
  // ─── INIT VALUE ─────────────────────────────────────────────────────────────────
  //
  isAuthenticated = false // not authenticated by default
  userData = null // null at first => suppose to be an object after the authenticated has set to true (means token was generated)
  // ────────────────────────────────────────────────────────────────────────────────

  Login(data: any) {
    console.log(data)
    window.localStorage.setItem('token', data)
  }

}