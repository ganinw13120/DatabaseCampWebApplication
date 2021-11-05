import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import LearningRepository from '../../../../data/repository/app/LearningRepository';

interface Store {
  [key : string] : any
}

export class OverviewStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private learningRepository: LearningRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)

    const learningRepository = new LearningRepository();
    this.learningRepository = learningRepository;
  }

  @observable
  store : Store = {
      data: null,
      isLoading : true,
  }

  @action.bound
  async FetchOverview(): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    await this.learningRepository.FetchOverview(token).then((res) => {
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