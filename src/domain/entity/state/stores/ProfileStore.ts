import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import UserRepository from '../../../../data/repository/app/UserRepository';

interface Store {
  [key : string] : any
}

export class ProfileStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private userRepository: UserRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    this.userRepository = new UserRepository();
  }

  @observable
  store : Store = {
      data: null,
  }

  @action
  FetchUserProfile(userId : number, cb : any) {
    const { token } = this.rootStore.authStore.store;
    this.userRepository.fetchProfile(token, userId).then((res)=>{
        cb?.(res)
    })
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