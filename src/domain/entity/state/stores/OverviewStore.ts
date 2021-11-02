import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import OverviewRepository from '../../../../data/repository/app/OverviewRepository';

interface Store {
  [key : string] : any
}

export class OverviewStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private overviewRepository: OverviewRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)

    const overviewRepository = new OverviewRepository();
    this.overviewRepository = overviewRepository;
  }

  @observable
  store : Store = {
      data: null,
      isLoading : true,
  }

  @action.bound
  async FetchOverview(): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    await this.overviewRepository.FetchOverview(token).then((res) => {
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