import { makeObservable, observable, action } from 'mobx';

import RootStore from '../RootStore';

import LearningRepository from '@repository/app/LearningRepository';

import {Overview} from '@model/Learning';

interface Store {
  data : Overview | null,
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
  }

  @action.bound
  async FetchOverview(): Promise<any> {
    this.store.data = null;
    const { token } = this.rootStore.authStore.store;
    await this.learningRepository.fetchOverview(token).then(this.onFetchOverviewSuccess).catch((res) => {
      console.log(res)
    })
    return;
  }

  @action.bound
  onFetchOverviewSuccess (res : Overview) : void {
    this.store = {
      data : res,
    }
  } 
}