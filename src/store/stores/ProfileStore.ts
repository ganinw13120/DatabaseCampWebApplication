import { makeObservable, action } from 'mobx';

import RootStore from '../Rootstore';

import UserRepository from '../../repository/app/UserRepository';
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

  @action.bound
  async UpdateName(name : string, cb : any) : Promise<any> {
    const { token } = this.rootStore.authStore.store;
    const res = await this.userRepository.updateName(token, name).then((res)=>{
      this.rootStore.authStore.UpdateUserName(name);
      return res;
    })
    cb?.(res)
  }
}