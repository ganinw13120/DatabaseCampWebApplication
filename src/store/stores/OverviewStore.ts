import { makeObservable, action } from 'mobx';

import RootStore from '../RootStore';

import LearningRepository from '@repository/app/LearningRepository';

import {Overview} from '@model/Learning';

export class OverviewStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private learningRepository: LearningRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    const learningRepository = new LearningRepository();
    this.learningRepository = learningRepository;

  }

  @action.bound
  async FetchOverview(): Promise<Overview | null> {
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository.fetchOverview(token).then(this.onFetchOverviewSuccess).catch((res) => {
      console.log(res)
      return null;
    })
    return res;
  }

  @action.bound
  onFetchOverviewSuccess (res : Overview) : Overview {
    return res;
  } 
}