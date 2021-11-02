import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

interface Store {
  [key : string] : any
}

export class AppStore {
  rootStore: RootStore; // contains the root of store (outest mobx)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
  }
  
  @observable
  store : Store = {
    isExpand : false,
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