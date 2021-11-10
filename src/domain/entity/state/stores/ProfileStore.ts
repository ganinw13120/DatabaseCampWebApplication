import { makeObservable, action } from 'mobx';

import RootStore from '../Rootstore';

import UserRepository from '../../../../data/repository/app/UserRepository';
export class ProfileStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private userRepository: UserRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    this.userRepository = new UserRepository();
  }

  @action
  FetchUserProfile(userId : number, cb : any) {
    const { token } = this.rootStore.authStore.store;
    this.userRepository.fetchProfile(token, userId).then((res)=>{
        cb?.(res)
    })
  }
}