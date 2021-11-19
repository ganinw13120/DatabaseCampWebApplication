import { makeObservable, observable, action } from 'mobx';

import RootStore from '../RootStore';

import UserRepository from '@repository/app/UserRepository';

import {Ranking} from '@model/User';

interface Store {
  data : Ranking | null,
  isLoading : boolean
}

export class PointRankingStore {
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
      isLoading : true,
  }

  @action.bound
  async fatchRanking(): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    await this.userRepository.fetchPointRanking(token).then(this.onFetchRankingSuccess).catch((res) => {
      console.log(res)
    })
    return;
  }

  @action.bound
  onFetchRankingSuccess (res : Ranking) : void {
    this.store.data = res;
    this.store.isLoading = false;

  }
}