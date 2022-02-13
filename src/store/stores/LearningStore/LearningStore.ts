// LearningStore.ts
/**
 * This file used to be a store about learning of mobx store, functions, and data related to learning module.
 */
import { makeObservable, observable, action } from "mobx";

import RootStore from "../../RootStore";

import LearningRepository from "@repository/app/LearningRepository";
import ILearningRepository from "@repository/app/ILearningRepository";

import {
  RoadMap,
  Lecture,
  Activity,
  Hint,
  Answer,
  CompletionAnswer,
  ActivityAlert,
  MultipleAnswer,
  MatchingAnswer,
  MultipleChoice,
  CheckboxMultipleAnswer,
  GroupAnswer,
  RelationAnswer,
  TableAnswer,
  TableChoice,
  DrawerAnswer,
  PeerAnswer,
  PeerChoice,
} from "@model/Learning";
import ILearningStore, { Store } from "./ILearningStore";
import {
  ACTIVITY_SUCCESS,
  ACTIVITY_WARNING_ON_EMPTY,
  ACTIVITY_WARNING_ON_UNCOMPLETE,
  ACTIVITY_WRONG,
} from "@constant/text";

export class LearningStore implements ILearningStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  private learningRepository: ILearningRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    const learningRepository = new LearningRepository();
    this.learningRepository = learningRepository;
    makeObservable(this);
  }

  /**
   * Store for storing datas
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   */
  @observable
  store: Store = {
    roadMap: null,
    activityInfo: null,
    hint: [],
    isLoading: false,
    hintRoadMap: [],
  };

  /**
   * On user enter learning flow, fetch learning roadmap.
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param contentID content identifier
   *
   * @param onSuccess on fetching success callback function
   *
   * @param onError on fetching error callback function
   */
  @action.bound
  public async FetchRoadmap(
    contentID: number,
    onSuccess?: any,
    onError?: () => void
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository
      .fetchRoadmap(token, contentID)
      .then(this.onRoadmapFetchSuccess)
      .catch((res) => {
        return null;
      });
    if (res && res.content_id !== 0) onSuccess?.(res);
    else onError?.();
  }

  /**
   * On fetching roadmap success
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param res roadmap information
   *
   * @return Roadmap information
   */
  @action.bound
  private onRoadmapFetchSuccess(res: RoadMap): RoadMap {
    if (!res.items) res.items = [];
    this.store.roadMap = res;
    return res;
  }

  /**
   * On user enter activity page, fetching activity information
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param activityID activity indentifier
   *
   * @param onSuccess on fetching success callback function
   *
   * @param onError on fetching error callback function
   */
  @action.bound
  public async FetchActivity(
    activityID: number,
    onSuccess: (res: Activity) => void,
    onError: () => void
  ): Promise<any> {
    this.store.hint = [];
    this.store.activityInfo = null;
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository
      .fetchActivity(token, activityID)
      .then(this.onFetchActivitySuccess)
      .catch((res) => {
        console.log(res);
        return null;
      });
    if (res) {
      onSuccess?.(res as Activity);
    } else {
      onError?.();
    }
  }

  /**
   * On fetching activity success
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param res activity information
   *
   * @return Activity information
   */
  @action.bound
  private onFetchActivitySuccess(res: Activity): Activity {
    this.store.hint = res.hint.used_hints ? res.hint.used_hints : [];
    this.store.hintRoadMap = res.hint.hint_roadmap ? res.hint.hint_roadmap : [];
    this.store.activityInfo = res;
    return res;
  }

  /**
   * On user enter activity page, fetching activity information
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param activityID activity indentifier
   *
   * @param cb callback function
   */
  @action.bound
  public async SubmitActivity(
    result: Answer,
    cb: (res: ActivityAlert) => void
  ): Promise<any> {
    const { activityInfo } = this.store;
    if (!activityInfo) return;
    if (!result) {
      this.store.isLoading = false;
      const alert: ActivityAlert = {
        isSuccess: false,
        feedback: ACTIVITY_WARNING_ON_EMPTY,
      };
      cb?.(alert);
      return;
    } else {
      this.store.isLoading = true;
    }
    const { activity } = activityInfo;
    if (activity.activity_type_id === 1) {
      this.checkMatching(activity.activity_id, result as MatchingAnswer, cb);
    } else if (activity.activity_type_id === 3) {
      this.checkCompletion(
        activity.activity_id,
        result as CompletionAnswer[],
        cb
      );
    } else if (activity.activity_type_id === 2) {
      if (!(activityInfo.choice as MultipleChoice).is_multiple_answers) {
        this.checkMultiple(activity.activity_id, result as MultipleAnswer, cb);
      } else {
        this.checkCheckbox(
          activity.activity_id,
          result as CheckboxMultipleAnswer,
          cb
        );
      }
    } else if (activity.activity_type_id === 4) {
      this.checkGroup(activity.activity_id, result as GroupAnswer, cb);
    } else if (activity.activity_type_id === 5) {
      this.checkRelation(activity.activity_id, result as RelationAnswer[], cb);
    } else if (activity.activity_type_id === 6) {
      if ((activityInfo.choice as TableChoice).vocabs) {
        this.checkTable(activity.activity_id, result as TableAnswer, cb);
      } else {
        this.checkDrawer(activity.activity_id, result as DrawerAnswer, cb);
      }
    } else if (activity.activity_type_id === 7) {
      this.checkPeer(activity.activity_id, (activityInfo.choice as PeerChoice).er_answe_id, result as PeerAnswer, cb);
    }
  }

  /**
   * On activity result wrong, rejecting submittion
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param cb callback function
   *
   * @param message custom message (If any)
   */
  @action.bound
  private rejectAnswer(cb: any, message?: string): void {
    this.store.isLoading = false;
    const alert: ActivityAlert = {
      isSuccess: false,
      feedback: message ? message : ACTIVITY_WRONG,
    };
    cb?.(alert);
  }

  @action.bound
  private checkErrorHandle(cb: any, message?: string): void {
    this.store.isLoading = false;
    const alert: ActivityAlert = {
      isSuccess: false,
      feedback: message ? message : 'พบข้อผิดพลาดในการตรวจสอบคำตอบ',
    };
    cb?.(alert);
  }

  /**
   * On activity result correct, alert success
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param cb callback function
   *
   * @param message custom message (If any)
   */
  @action.bound
  private successAnswer(cb: any, message?: string): void {
    this.store.isLoading = false;
    const alert: ActivityAlert = {
      isSuccess: true,
      feedback: message ? message : ACTIVITY_SUCCESS,
    };
    cb?.(alert);
  }

  /**
   * On activity result changed, update roadmap's status to learned
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param activity_id target activity identifire
   */
  @action.bound
  private updateRoadMapStatus(activity_id: number): void {
    let temp = this.store.roadMap;
    if (!temp) return;
    let items = [...temp!.items];
    let item = items.find((e) => e.activity_id === activity_id);
    if (!item) return;
    item!.is_learned = true;
    this.store.roadMap!.items = items;
  }

  /**
   * Check multiple choice answer, then verify answer
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param activityID target activity identifire
   *
   * @param result activity answer
   *
   * @param cb callback function
   */
  @action.bound
  private async checkMultiple(
    activityID: number,
    result: MultipleAnswer,
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    this.learningRepository
      .checkActiivty(token, activityID, 2, [result])
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb);
          return;
        } else {
          this.rejectAnswer(cb);
          return;
        }
      }).catch((err : any) => {
        this.checkErrorHandle(cb, err);
      });
  }

  @action.bound
  private async checkCheckbox(
    activityID: number,
    result: CheckboxMultipleAnswer,
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    this.learningRepository
      .checkActiivty(token, activityID, 2, result)
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb);
          return;
        } else {
          this.rejectAnswer(cb);
          return;
        }
      }).catch((err : any) => {
        this.checkErrorHandle(cb, err);
      });
  }
  @action.bound
  private async checkGroup(
    activityID: number,
    result: GroupAnswer,
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    this.learningRepository
      .checkActiivty(token, activityID, 4, result)
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb);
          return;
        } else {
          this.rejectAnswer(cb);
          return;
        }
      }).catch((err : any) => {
        this.checkErrorHandle(cb, err);
      });
  }

  @action.bound
  private async checkRelation(
    activityID: number,
    result: RelationAnswer[],
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    this.learningRepository
      .checkActiivty(token, activityID, 5, result)
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb);
          return;
        } else {
          this.rejectAnswer(cb);
          return;
        }
      }).catch((err : any) => {
        this.checkErrorHandle(cb, err);
      });
  }

  @action.bound
  private async checkTable(
    activityID: number,
    result: TableAnswer,
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    this.learningRepository
      .checkActiivty(token, activityID, 6, result)
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb);
          return;
        } else {
          this.rejectAnswer(cb);
          return;
        }
      }).catch((err : any) => {
        this.checkErrorHandle(cb, err);
      });
  }

  @action.bound
  private async checkDrawer(
    activityID: number,
    result: DrawerAnswer,
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    this.learningRepository
      .checkActiivty(token, activityID, 6, result)
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb, res.err_message);
          return;
        } else {
          this.rejectAnswer(cb, res.err_message);
          return;
        }
      }).catch((err : any) => {
        this.checkErrorHandle(cb, err);
      });
  }

  @action.bound
  private async checkPeer(
    activityID : number,
    erAnswerId: number,
    result: PeerAnswer,
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    this.learningRepository
      .checkPeer(token, erAnswerId, 6, result)
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb);
          return;
        } else {
          this.rejectAnswer(cb);
          return;
        }
      }).catch((err : any) => {
        this.checkErrorHandle(cb, err);
      });
  }

  /**
   * Check matching choice answer, then verify answer
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param activityID target activity identifire
   *
   * @param result activity answer
   *
   * @param cb callback function
   */
  @action.bound
  private async checkMatching(
    activityID: number,
    result: MatchingAnswer,
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    let res: any = [];
    result.forEach((e: any) => {
      if (!e[0] || !e[1]) {
        this.rejectAnswer(cb, ACTIVITY_WARNING_ON_EMPTY);
        return;
      }
      res.push({
        item1: e[0],
        item2: e[1],
      });
    });
    this.learningRepository
      .checkActiivty(token, activityID, 1, res)
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb);
          return;
        } else {
          this.rejectAnswer(cb);
          return;
        }
      });
  }

  /**
   * Check completion choice answer, then verify answer
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param activityID target activity identifire
   *
   * @param result activity answer
   *
   * @param cb callback function
   */
  @action.bound
  private async checkCompletion(
    activityID: number,
    result: CompletionAnswer[],
    cb: any
  ): Promise<any> {
    const { token } = this.rootStore.authStore.store;
    result.forEach((e: any) => {
      if (!e.content) {
        this.rejectAnswer(cb, ACTIVITY_WARNING_ON_UNCOMPLETE);
        return;
      }
    });
    this.learningRepository
      .checkActiivty(token, activityID, 3, result)
      .then((res: any) => {
        const { is_correct } = res;
        if (is_correct) {
          this.updateRoadMapStatus(activityID);
          this.rootStore.authStore.SetUserPoint(res.updated_point);
          this.successAnswer(cb);
          return;
        } else {
          this.rejectAnswer(cb);
          return;
        }
      });
  }

  /**
   * Cler activity information from store
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   */
  @action.bound
  public clearActivity(): void {
    this.store.activityInfo = null;
    this.store.hint = [];
    this.store.hintRoadMap = [];
    this.store.isLoading = false;
  }

  /**
   * On user calling hint, fetching next hint
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   */
  @action.bound
  public async getHint(): Promise<any> {
    this.store.isLoading = true;
    const { activityInfo } = this.store;
    if (!activityInfo) return;
    const { token } = this.rootStore.authStore.store;
    const activityId = activityInfo.activity.activity_id;
    const res = await this.learningRepository
      .getHint(token, activityId)
      .then(this.onGetHintSuccess)
      .catch((res: any) => {
        this.store.isLoading = false;
        return res.message;
      });
    return res;
  }

  /**
   * On fetching hint success
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param res Hint information
   *
   * @returns message alert to user, null due to success action
   */
  @action.bound
  private onGetHintSuccess(res: Hint): null {
    const { hint } = this.store;
    let temp = [...hint];
    temp.push(res);
    this.store.isLoading = false;
    this.store.hint = temp;
    this.rootStore.authStore.DecreaseUserPoint(res.point_reduce);
    return null;
  }

  /**
   * On user enter lecture page, fetching lecture information
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param contentID lecture's content identifier
   *
   * @param onSuccess on fetching success callback function
   *
   * @param onError on fetching error callback function
   */
  @action.bound
  public async FetchLecture(
    contentID: number,
    onSuccess: (res: Lecture) => void,
    onError: () => void
  ): Promise<any> {
    this.store.activityInfo = null;
    const { token } = this.rootStore.authStore.store;
    const res = await this.learningRepository
      .fetchLecture(token, contentID)
      .then(this.onLectureFetchSuccess)
      .catch((res) => {
        console.log(res);
        return null;
      });
    if (res) onSuccess?.(res);
    else {
      onError?.();
    }
  }

  /**
   * On fetching lecture success, and return lecture information.
   *
   * @remarks
   * This method is part of learning store, manipulating learning and learning'data.
   *
   * @param contentID lecture's content identifier
   *
   * @param onSuccess on fetching success callback function
   *
   * @param onError on fetching error callback function
   */
  @action.bound
  private onLectureFetchSuccess(res: Lecture): Lecture {
    return res;
  }
}
