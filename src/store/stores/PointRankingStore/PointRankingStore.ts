// PointRankingStore.ts
/**
 * This file used to be a store for point ranking in application of mobx store, functions, and data related to point ranking module.
*/
import { makeObservable, observable, action } from 'mobx';

import RootStore from '../../RootStore';

import UserRepository from '@repository/app/UserRepository';

import {Ranking} from '@model/User';
import IPointRankingStore, { Store } from './IPointRankingStore';


export class PointRankingStore implements IPointRankingStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private userRepository: UserRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    this.userRepository = new UserRepository();
  }

  @observable
  public store : Store = {
      data: null,
      isLoading : true,
  }

  @action.bound
  public async fatchRanking(): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    await this.userRepository.fetchPointRanking(token).then(this.onFetchRankingSuccess).catch((res) => {
      console.log(res)
    })
    return;
  }

  @action.bound
  private onFetchRankingSuccess (res : Ranking) : void {
    this.store.data = res;
    this.store.isLoading = false;

  }
}