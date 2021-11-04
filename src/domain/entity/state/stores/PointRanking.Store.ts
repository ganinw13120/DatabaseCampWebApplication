import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import UserRepository from '../../../../data/repository/app/UserRepository';


interface Store {
  [key : string] : any
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
    await this.userRepository.fetchPointRanking(token).then((res) => {
      console.log({...res})
      this.setStore({
        data : res,
        isLoading : false
      })
    }).catch((res) => {
      console.log(res)
    })
    return;
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