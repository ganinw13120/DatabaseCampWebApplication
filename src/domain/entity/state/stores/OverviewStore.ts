import { makeObservable, observable, action } from 'mobx';

import AuthRepository from '../../../../data/repository/auth/AuthRepository';

import RootStore from '../Rootstore';

interface Store {
  [key : string] : any
}

export class OverviewStore {
  rootStore : RootStore; // contains the root of store (outest mobx)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
  }

  @observable
  store : Store = {
      data : null
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