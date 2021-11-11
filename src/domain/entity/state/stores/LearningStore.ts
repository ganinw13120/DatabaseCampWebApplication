import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import LearningRepository from '../../../../data/repository/app/LearningRepository';

import {RoadMap, Lecture, Activity, Hint, Answer ,CompletionAnswer } from '../../model/Learning';

// interface Store {
//   [key : string] : any
// }

interface Store {
  roadMap : RoadMap | null,
  activityInfo : Activity | null,
  lectureInfo : Lecture | null,
  hint : Hint[],
  feedback : string | null,
  isLoading : boolean
}

export class LearningStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private learningRepository: LearningRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    const learningRepository = new LearningRepository();
    this.learningRepository = learningRepository;
    makeObservable(this)
  }

  @observable
  store : Store = {
      roadMap: null,
      activityInfo: null,
      lectureInfo: null,
      hint: [],
      feedback : null,
      isLoading: false,
  }

  @action.bound
  public async FetchRoadmap(contentID: number, cb : any): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository.fetchRoadmap(token, contentID).then(this.onRoadmapFetchSuccess).catch((res) => {
      console.log(res)
    });
    cb?.(res);
  }

  @action.bound
  onRoadmapFetchSuccess (res : RoadMap) : RoadMap {
    this.store.roadMap = res;
    return res;
  }

  
  @action.bound
  public async FetchActivity(activityID: number, cb : any): Promise<any> {
    this.store.hint = [];
    this.store.activityInfo = null;
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository.fetchActivity(token, activityID).then(this.onFetchActivitySuccess).catch((res) => {
      console.log(res)
    })
    cb?.(res as Activity);
  }

  @action.bound
  onFetchActivitySuccess (res : Activity) : Activity {
    this.store.hint = res.hint.used_hints;
    this.store.activityInfo = res;
    return res;
  }

  @action.bound
  public async SubmitActivity(result : Answer, cb : any): Promise<any> {
    const { activityInfo } = this.store;
    if (!activityInfo) return;
    if (!result) {
      this.store.isLoading = false;
      this.store.feedback = 'กรุณาทำแบบฝึกหัดก่อนตรวจคำตอบ';
      cb?.(false)
      return;
    } else {
      this.store.isLoading = true;
    }
    const { activity } = activityInfo
    if (activity.activity_type_id === 1) {
      this.checkMatching(activity.activity_id, result as string[][], cb);
    } else if (activity.activity_type_id === 3) {
      this.checkCompletion(activity.activity_id, result as CompletionAnswer[], cb);
    } else if (activity.activity_type_id === 2) {
      this.checkMultiple(activity.activity_id, result as number, cb);
    } 
  }

  @action.bound
  private rejectAnswer (isCorrect : boolean) : void {
    this.store.isLoading = false;
    this.store.feedback = isCorrect ? 'คำตอบถูกต้อง' : 'ไม่ถูก';
  }

  @action.bound
  private updateRoadMapStatus (activity_id : number) : void {
    let temp = this.store.roadMap;
    if (!temp) return;
    let items = [...temp!.items];
    let item = items.find(e=>e.activity_id===activity_id);
    if (!item) return;
    item!.is_learned = true;
    this.store.roadMap!.items = items;
  }

  @action.bound 
  private async checkMultiple(activityID : number, result : number, cb: any): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    this.learningRepository.checkMultiple(token, activityID, result).then((res : any) => {
      const {is_correct} = res;
      if (is_correct) {
        this.rejectAnswer(true);
        this.updateRoadMapStatus(activityID);
        cb?.(true)
        return;
      }
      else {
        this.rejectAnswer(false);
        cb?.(false)
        return;
      }
    });
  } 

  @action.bound 
  private async checkMatching(activityID : number, result : string[][], cb: any): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    let res : any = [];
    result.forEach((e: any, key: number) => {
      if (!e[0] || !e[1]) {
        this.store.isLoading = false;
        this.store.feedback = 'กรุณาทำแบบฝึกหัดให้ครบทุกข้อ';
        cb?.(false)
        return;
      }
      res.push({
        item1 : e[0],
        item2 : e[1]
      })
    })
    this.learningRepository.checkMatching(token, activityID, res).then((res : any) => {
      const {is_correct} = res;
      if (is_correct) {
        this.rejectAnswer(true);
        this.updateRoadMapStatus(activityID);
        cb?.(true)
        return;
      }
      else {
        this.rejectAnswer(false);
        cb?.(false)
        return;
      }
    });
  } 

  @action.bound 
  private async checkCompletion(activityID : number, result : CompletionAnswer[], cb: any): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    result.forEach((e: any, key: number) => {
      if (!e.content) {
        this.store.isLoading = false;
        this.store.feedback = 'กรุณาทำแบบฝึกหัดให้ครบทุกข้อ';
        cb?.(false)
        return;
      }
    })
    this.learningRepository.checkCompletion(token, activityID, result).then((res : any) => {
      const {is_correct} = res;
      if (is_correct) {
        this.rejectAnswer(true);
        this.updateRoadMapStatus(activityID);
        cb?.(true)
        return;
      }
      else {
        this.rejectAnswer(false);
        cb?.(false)
        return;
      }
    });
  } 

  @action.bound
  public clearActivity(): void {
    this.store.activityInfo = null;
    this.store.hint = [];
    this.store.feedback = null;
    this.store.isLoading = false;
  }

  @action.bound
  public async getHint () : Promise<any> {
    this.store.isLoading = true;
    const { activityInfo } = this.store;
    if (!activityInfo) return;
    const { token } = this.rootStore.authStore.store;
    const activityId = activityInfo.activity.activity_id;
    const res = await this.learningRepository.getHint(token, activityId).then(this.onGetHintSuccess).catch((res: any) => {
      this.store.isLoading = false;
      return res.message
    })
    return res;
  }
  @action.bound
  onGetHintSuccess (res : Hint) : Hint | null {
    const { hint } = this.store;
    let temp = [...hint];
    temp.push(res);
    this.store.isLoading = false;
    this.store.hint = temp;
    return null;
  }

  @action.bound
  public async FetchLecture(contentID: number, cb : any): Promise<any> {
    this.store.activityInfo = null;
    this.store.lectureInfo = null;
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository.fetchLecture(token, contentID).then(this.onLectureFetchSuccess).catch((res) => {
      console.log(res)
    })
    cb?.(res);
  }

  @action.bound
  onLectureFetchSuccess (res : Lecture) : Lecture {
    this.store.lectureInfo = res;
    return res;
  }

}