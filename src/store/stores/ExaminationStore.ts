import { makeObservable, observable, action } from 'mobx';

import RootStore from '../Rootstore';

import LearningRepository from '../../repository/app/LearningRepository';

import {Answer, Exam, ExamAnswer, ExamAnswerActivity, ExaminationOverview, ExamResult} from '../../model/Learning';

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
  async FetchExam(examId : number) : Promise<Exam | null> {
    const { token } = this.rootStore.authStore.store;
    const res : Exam | null = await this.learningRepository.fetchExam(token, examId).then((res)=> {return res}).catch((res) => {
      return null
    })
    return res; 
  }

  @action.bound
  async FetchResult(examId : number) : Promise<ExamResult | null> {
    const { token } = this.rootStore.authStore.store;
    const res : ExamResult | null = await this.learningRepository.fetchExamResult(token, examId).then((res)=> {return res}).catch((res) => {
      return null
    })
    return res; 
  }

  @action.bound
  async FetchExamOverview(): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    await this.learningRepository.fetchExamOverview(token).then(this.onFetchExamOverviewSuccess).catch((res) => {
      console.log(res)
    })
    return;
  }

  @action.bound
  onFetchExamOverviewSuccess (res : ExaminationOverview) : ExaminationOverview {
    this.store.data = res;
    return res;
  }


  @action.bound
  submitExam (result : Answer[], exam : Exam, cb : any) : void {
    let answer : ExamAnswer = {
      exam_id : exam.exam.exam_id,
      activities : []
    }
    exam.activities.forEach((e, key : number) => {
      let res = result[key];
      if (e.info.activity_type_id===1) {
        let temp: any = [];
        (res! as string[][]).forEach((e: any, key: number) => {
          temp.push({
                item1: e[0],
                item2: e[1]
            })
        })
        res = temp;
      }
      let examAnswer : ExamAnswerActivity = {
        activity_id : e.info.activity_id,
        answer : res
      }
      answer.activities.push(examAnswer);
    })
    const { token } = this.rootStore.authStore.store;
    this.learningRepository.submitExam(token, answer).then((res : any)=>{
      cb?.(res)
    })
  }
}