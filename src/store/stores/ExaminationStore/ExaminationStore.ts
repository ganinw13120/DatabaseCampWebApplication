// ExaminationStore.ts
/**
 * This file used to be a store about eamination of mobx store, functions, and data related to examination module.
*/
import { makeObservable, observable, action } from 'mobx';

import RootStore from '../../RootStore';

import LearningRepository from '@repository/app/LearningRepository';
import ILearningRepository from '@repository/app/ILearningRepository';

import {Answer, Exam, ExamAnswer, ExamAnswerActivity, ExaminationOverview, ExamResult, MultipleAnswer, Recommend} from '@model/Learning';

import IExaminationStore, { Store } from './IExaminationStore';

export class ExaminationStore implements IExaminationStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private learningRepository: ILearningRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)

    const learningRepository = new LearningRepository();
    this.learningRepository = learningRepository;
  }

  /**
   * Store for storing datas
   *
   * @remarks
   * This method is part of examination store, manipulating examination and examination'data.
   */
  @observable
  store : Store = {
      data: null,
  }

  /**
   * On user enter examination page, start fetching examination
   *
   * @remarks
   * This method is part of examination store, manipulating examination and examination'data.
   *
   * @param examId exam's identifier
   *
   * @return Examination information
   */
  @action.bound
  public async FetchExam(examId : number) : Promise<Exam | null> {
    const { token } = this.rootStore.authStore.store;
    const res : Exam | null = await this.learningRepository.fetchExam(token, examId).then((res)=> {return res}).catch((res) => {
      return null
    })
    return res;
  }

  /**
   * On user enter examination result page, fetching examination'result
   *
   * @remarks
   * This method is part of examination store, manipulating examination and examination'data.
   *
   * @param examId exam's identifier
   *
   * @return Examination result information
   */
  @action.bound
  public async FetchResult(examId : number) : Promise<ExamResult | null> {
    const { token } = this.rootStore.authStore.store;
    const res : ExamResult | null = await this.learningRepository.fetchExamResult(token, examId).then((res)=> {return res}).catch((res) => {
      return null
    })
    return res;
  }
  @action.bound
  public async FetchRecommend() : Promise<Recommend | null> {
    const { token } = this.rootStore.authStore.store;
    const res : Recommend | null = await this.learningRepository.fetchRecommend(token).then((res)=> {return res}).catch((res) => {
      return null
    })
    return res;
  }

  /**
   * On user enter examination overview page, start fetching examination overview from repository
   *
   * @remarks
   * This method is part of examination store, manipulating examination and examination'data.
   */
  @action.bound
  public async FetchExamOverview(): Promise<any> {
    this.store.data = null;
    const { token } = this.rootStore.authStore.store;
    await this.learningRepository.fetchExamOverview(token).then(this.onFetchExamOverviewSuccess).catch((res) => {
      console.log(res)
    })
    return;
  }

  /**
   * On fetching examination overview success, store overview information to store
   *
   * @remarks
   * This method is part of examination store, manipulating examination and examination'data.
   *
   * @param res exam's overview information
   *
   * @return Examination overview information
   */
  @action.bound
  private onFetchExamOverviewSuccess (res : ExaminationOverview) : void {
    this.store.data = res;
  }

  /**
   * On user submit examination, submitting information to repository.
   *
   * @remarks
   * This method is part of examination store, manipulating examination and examination'data.
   *
   * @param result exam's result
   *
   * @param exam examination information
   *
   * @param cb callback function
   *
   * @return Examination information
   */
  @action.bound
  public submitExam (result : Answer[], exam : Exam, onSuccess : (res : {exam_result_id : string}) => void, onError : () => void) : void {
    let answer : ExamAnswer = {
      exam_id : exam.exam.exam_id,
      activities : []
    }
    exam.activities.forEach((e, key : number) => {
      let res = result[key];
      if (e.activity.activity_type_id===1) {
        let temp: any = [];
        (res! as string[][]).forEach((e: any, key: number) => {
          temp.push({
                item1: e[0],
                item2: e[1]
            })
        })
        res = temp;
      } else if (e.activity.activity_type_id===2) {
        res = [res] as MultipleAnswer[];
      }
      console.log(e.activity.activity_type_id)
      let examAnswer : ExamAnswerActivity = {
        activity_id : e.activity.activity_id,
        answer : res
      }
      answer.activities.push(examAnswer);
    })
    const { token } = this.rootStore.authStore.store;
    this.learningRepository.submitExam(token, answer).then((res : any)=>{
      onSuccess?.(res);
    }).catch(()=>{
      onError?.();
    })
  }
}