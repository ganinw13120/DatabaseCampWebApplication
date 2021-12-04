// OverviewStore.ts
/**
 * This file used to be a store for overview page in application of mobx store, functions, and data related to overview module.
*/
import { makeObservable, action } from 'mobx';

import RootStore from '../../RootStore';

import LearningRepository from '@repository/app/LearningRepository';

import {Overview} from '@model/Learning';
import IOverviewStore from './IOverviewStore';

export class OverviewStore implements IOverviewStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private learningRepository: LearningRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    const learningRepository = new LearningRepository();
    this.learningRepository = learningRepository;

  }

  @action.bound
  public async FetchOverview(): Promise<Overview | null> {
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository.fetchOverview(token).then((res : Overview)=>{return res;}).catch((res) => {
      console.log(res)
      return null;
    })
    return res;
  }

}