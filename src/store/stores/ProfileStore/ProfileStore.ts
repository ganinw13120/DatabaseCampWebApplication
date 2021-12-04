// ProfileStore.ts
/**
 * This file used to be a store for profile page in application of mobx store, functions, and data related to profile module.
*/
import { makeObservable, action } from 'mobx';

import RootStore from '../../RootStore';

import UserRepository from '@repository/app/UserRepository';

import IProfileStore from './IProfileStore';
import { User } from '@root/model/User';

export class ProfileStore implements IProfileStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private userRepository: UserRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    this.userRepository = new UserRepository();
  }

  @action
  public FetchUserProfile(userId : number, onSuccess: (res : User) => void, onError : () => void) {
    const { token } = this.rootStore.authStore.store;
    this.userRepository.fetchProfile(token, userId).then((res)=>{
      onSuccess?.(res)
    }).catch(()=>{
      onError?.();
    })
  }

  @action.bound
  public async UpdateName(name : string, cb : any) : Promise<any> {
    const { token } = this.rootStore.authStore.store;
    const res = await this.userRepository.updateName(token, name).then((res)=>{
      this.rootStore.authStore.UpdateUserName(name);
      return res;
    })
    cb?.(res)
  }
}