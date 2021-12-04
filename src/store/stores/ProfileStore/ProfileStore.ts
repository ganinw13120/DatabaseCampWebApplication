// ProfileStore.ts
/**
 * This file used to be a store about profile page in application of mobx store, functions, and data related to profile module.
*/
import { makeObservable, action } from 'mobx';

import RootStore from '../../RootStore';

import UserRepository from '@repository/app/UserRepository';
import IUserRepository from '@repository/app/IUserRepository';

import IProfileStore from './IProfileStore';
import { User } from '@root/model/User';

export class ProfileStore implements IProfileStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private userRepository: IUserRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    this.userRepository = new UserRepository();
  }

  /**
   * On user enter profile page, fetching target profile
   *
   * @remarks
   * This method is part of profile store, manipulating profile and profile'data.
   * 
   * @param userId target user's indentifier
   * 
   * @param onSuccess on success callback function
   * 
   * @param onError on error callback function
   */
  @action
  public FetchUserProfile(userId : number, onSuccess: (res : User) => void, onError : () => void) {
    const { token } = this.rootStore.authStore.store;
    this.userRepository.fetchProfile(token, userId).then((res)=>{
      onSuccess?.(res)
    }).catch(()=>{
      onError?.();
    })
  }

  /**
   * On user changes profile's name, updating user's name
   *
   * @remarks
   * This method is part of profile store, manipulating profile and profile'data.
   * 
   * @param name new user's name
   * 
   * @param onSuccess on success callback function
   */
  @action.bound
  public async UpdateName(name : string, onSuccess : any) : Promise<any> {
    const { token } = this.rootStore.authStore.store;
    const res = await this.userRepository.updateName(token, name).then((res)=>{
      this.rootStore.authStore.UpdateUserName(name);
      return res;
    })
    onSuccess?.(res)
  }
}