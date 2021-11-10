import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import LearningRepository from '../../../../data/repository/app/LearningRepository';

import {ExaminationOverview} from '../../model/Learning';

interface Store {
  data : ExaminationOverview | null,
}

export class ExaminationStore {
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
  async FetchExamOverview(): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    await this.learningRepository.fetchExamOverview(token).then((res) => {
      this.store = {
        data : res,
      }
    }).catch((res) => {
      console.log(res)
    })
    return;
  }
}