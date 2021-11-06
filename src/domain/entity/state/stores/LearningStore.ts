import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import LearningRepository from '../../../../data/repository/app/LearningRepository';

import { notification } from 'antd';

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
      lectureInfo: null,
      hintList: null,
      result: null,
      feedback : null,
      isLoading: false
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
        activityInfo : res,
      })
      return res;
    }).catch((res) => {
      console.log(res)
    })
    cb?.(res);
  }

  @action.bound
  public async SubmitActivity(cb : any): Promise<any> {
    const { result, activityInfo } = this.store;
    if (!result) {
      this.setStore({
        feedback : 'กรุณาทำแบบฝึกหัดก่อนตรวจคำตอบ.',
        isLoading : false
      })
      cb?.(false)
      return;
    } else {
      this.setStore({
        isLoading : true
      })
    }
    const { activity } = activityInfo
    if (activity.activity_type_id === 1) {
      this.checkCompletion(activity.activity_id, result, cb);
    } 
  }

  @action.bound
  public getNextActivityId(): number | null {
    const { roadMap, activityInfo } = this.store;
    const currentActivityId = activityInfo.activity.activity_id;
    const currentOrder = roadMap.items.find((e : any) => e.activity_id === currentActivityId).order;
    const nextActivity = roadMap.items.find((e: any) => e.order === currentOrder + 1);
    if (!nextActivity) {
        notification['success']({
          message: "จบเเล้ว",
          description:
            'ไม่มีกิจกรรมเเล้ววว',
          onClick: () => {
          },
        });
      return null;
    }
    else {
      return nextActivity.activity_id;
    }
  }

  @action.bound 
  private async checkCompletion(activityID : number, result : any, cb: any): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    let res : any = [];
    result.forEach((e: any, key: number) => {
      if (!e[0] || !e[1]) {
        this.setStore({
          isLoading: false,
          feedback : 'กรุณาทำแบบฝึกหัดให้ครบทุกข้อ'
        })
        cb?.(false)
        return;
      }
      res.push({
        item1 : e[0],
        item2 : e[1]
      })
    })
    this.learningRepository.CheckCompletion(token, activityID, res).then((res : any) => {
      const {is_correct} = res;
      if (is_correct) {
        this.setStore({
          isLoading: false,
          feedback : 'ถูกแล้วว'
        })
        cb?.(true)
        return;
      }
      else {
        this.setStore({
          isLoading: false,
          feedback : 'ไม่ถูกค้าบ'
        })
        cb?.(false)
        return;
      }
    });
  } 

  @action.bound
  public clearActivity(): void {
    this.setStore({
      activityInfo: null,
      result: null,
      hintList : null,
      feedback: null,
      isLoading : false
    })
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