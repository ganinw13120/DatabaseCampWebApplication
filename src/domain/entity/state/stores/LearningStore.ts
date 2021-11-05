import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import LearningRepository from '../../../../data/repository/app/LearningRepository';

interface Store {
  [key : string] : any
}

export class LearningStore {
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
      roadMap: null,
      activityInfo: null,
      lectureInfo : null,
  }

  @action.bound
  public async FetchRoadmap(contentID: number): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    await this.learningRepository.FetchRoadmap(token, contentID).then((res) => {
      this.setStore({
        roadMap : res
      })
      return res;
    }).catch((res) => {
      console.log(res)
    })
  }

  
  @action.bound
  public async FetchActivity(activityID: number, cb: any): Promise<any> {
    this.setStore({
      activityInfo: null,
      lectureInfo : null
    })
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository.FetchActivity(token, activityID).then((res) => {
      this.setStore({
        activityInfo : res
      })
      return res;
    }).catch((res) => {
      console.log(res)
    })
    cb?.(res);
  }
  @action.bound
  public async FetchLecture(contentID: number, cb : any): Promise<any> {
    this.setStore({
      activityInfo: null,
      lectureInfo : null
    })
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository.FetchLecture(token, contentID).then((res) => {
      this.setStore({
        lectureInfo : res
      })
      return res;
    }).catch((res) => {
      console.log(res)
    })
    cb?.(res);
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