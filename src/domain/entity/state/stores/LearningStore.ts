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
      lectureInfo: null,
      hintList: [],
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
    const res = await this.learningRepository.FetchActivity(token, activityID).then((res : any) => {
      this.setStore({
        activityInfo: res,
        hint: res.hint.used_hints
      })
      return res;
    }).catch((res) => {
      console.log(res)
    })
    cb?.(res);
  }

  @action.bound
  public async SubmitActivity(result : any, cb : any): Promise<any> {
    const { activityInfo } = this.store;
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
      this.checkMatching(activity.activity_id, result, cb);
    } else if (activity.activity_type_id === 3) {
      this.checkCompletion(activity.activity_id, result, cb);
    }
  }

  @action.bound 
  private async checkMatching(activityID : number, result : any, cb: any): Promise<any> {
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
    this.learningRepository.CheckMatching(token, activityID, res).then((res : any) => {
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
  private async checkCompletion(activityID : number, result : any, cb: any): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    result.forEach((e: any, key: number) => {
      if (!e.content) {
        this.setStore({
          isLoading: false,
          feedback : 'กรุณาทำแบบฝึกหัดให้ครบทุกข้อ'
        })
        cb?.(false)
        return;
      }
    })
    this.learningRepository.CheckCompletion(token, activityID, result).then((res : any) => {
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
      hintList : null,
      feedback: null,
      isLoading : false
    })
  }

  @action.bound
  public async getHint () : Promise<any> {
    this.setStore({
      isLoading: true,
    })
    const { activityInfo } = this.store;
    const { token } = this.rootStore.authStore.store;
    const activityId = activityInfo.activity.activity_id;
    const res = await this.learningRepository.GetHint(token, activityId).then((res) => {
      const { hint } = this.store;
      let temp = [...hint];
      temp.push(res);
      this.setStore({
        isLoading: false,
        hint : temp
      })
      return null;
    }).catch((res: any) => {
      this.setStore({
        isLoading: false,
      })
      return res.message
    })
    return res;
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