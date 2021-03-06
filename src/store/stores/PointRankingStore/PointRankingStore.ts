// PointRankingStore.ts
/**
 * This file used to be a store about point ranking in application of mobx store, functions, and data related to point ranking module.
*/
import { makeObservable, observable, action } from 'mobx';

import RootStore from '../../RootStore';

import UserRepository from '@repository/app/UserRepository';
import IUserRepository from '@repository/app/IUserRepository';

import { Ranking } from '@model/User';
import IPointRankingStore, { Store } from './IPointRankingStore';


export class PointRankingStore implements IPointRankingStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private userRepository: IUserRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    this.userRepository = new UserRepository();
  }

  /**
   * Store for storing datas
   *
   * @remarks
   * This method is part of point ranking store, manipulating point ranking and point ranking'data.
   */
  @observable
  public store: Store = {
    data: null,
    isLoading: true,
  }

  /**
   * On user enter point ranking page, fetching ranking information and stores into store
   *
   * @remarks
   * This method is part of point ranking store, manipulating point ranking and point ranking'data.
   */
  @action.bound
  public async fatchRanking(): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    await this.userRepository.fetchPointRanking(token).then(this.onFetchRankingSuccess).catch((res) => {
      return res;
    })
    return;
  }

  /**
   * On ranking fetching success, stores into store
   *
   * @remarks
   * This method is part of point ranking store, manipulating point ranking and point ranking'data.
   */
  @action.bound
  private onFetchRankingSuccess(res: Ranking): void {
    this.store.data = res;
    this.store.isLoading = false;

  }
}