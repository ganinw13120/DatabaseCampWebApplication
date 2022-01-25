// ActivityViewModel.tsx
/**
 * This file contains view-model, related to activity page.
*/

import IActivityViewModel from './IActivityViewModel';
import { notification } from 'antd';

import { IActivityPage } from '@root/view/activity/ActivityPage';

import { Activity, ActivityAlert, ActivityChoices, Answer, RoadMap } from '@model/Learning';
import generateStepper, { generateEmptyStepper } from '@util/generateStepper';

const mockActivity : ActivityChoices[] = [
  [
    {
      content : 'ย-นภถ-สาภถ',
      multiple_choice_id : 1
    },
    {
      content : 'ผอิ',
      multiple_choice_id : 2
    },
    {
      content : 'ผปแอผปแอ',
      multiple_choice_id : 3
    },
    {
      content : 'ฟหก',
      multiple_choice_id : 4
    }
  ],
  {
    group_list : ['ข้อจำกัดของ File-based System', 'ไม่เป็นข้อจำกัดของ File-based System'],
    choices : ["ข้อมูลซ้ำซ้อน", "ค่าใช้จ่ายสูง", "Isolation data", "ต้องใช้ผู้เชี่ยวชาญ", "รูปแบบไฟล์ต่างกัน"]
  },
  {
    tables : [[null, null, null, null], [null, null, null, null]],
    choices : ['วิชาเรียน', 'เบอร์โทร', 'ครู', 'ชื่อ-นามสกุล', 'รหัสวิชา', 'รายละเอียดวิชา', 'ห้องเรียน', 'ที่อยู่ติดต่อ']
  }
]

export default class ActivityViewModel implements IActivityViewModel {
  private baseView?: IActivityPage;
  private activityInfo: Activity | null;
  private result: Answer | null;
  private alert: ActivityAlert | null;

  constructor() {
    this.activityInfo = null;
    this.result = null;
    this.alert = null;
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }

  /**
   * Get activity information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Activity information
   */
  public getActivityInfo(): Activity | null {
    return this.activityInfo;
  }

  /**
   * Get activity alert
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Activity alert information
   */
  public getAlert(): ActivityAlert | null {
    return this.alert;
  }

  /**
   * fetch activity information, then update to view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private fetchActivity(): void {
    const baseView = this.baseView;
    if (!baseView) return;
    const activityID = parseInt(baseView.props.match.params?.id);
    if (!activityID) {
      baseView.props.history.replace('/overview');
      return;
    }
    if (!baseView.props.learningStore!.store.roadMap) baseView.props.appStore!.setStepper(generateEmptyStepper())
    else {
      this.generateStepperFromStore();
    }

    this.activityInfo = null;
    this.result = null;
    this.alert = null;
    baseView?.onViewModelChanged();

    baseView.props.appStore!.setPercent(40)
    baseView.props.learningStore!.FetchActivity(activityID, (res: Activity) => {
      console.log(res);
      console.log(res.choice);

      res.activity.question = "จงเลือกคำตอบไปวางในพื้นที่ให้ถูกต้อง";
      res.activity.story = "\
      นายแกนต้องการออกแบบฐานข้อมูลสำหรับใช้ในโรงแรมซึ่งมีหลายสาขา ซึ่งนายแกนต้องการสร้างฐานข้อมูล ที่สามารถใช้ในทุกโรงเเรม เเละสามารถติดต่อข้อมูลของทุกสาขาได้พร้อมกัน ซึ่งในต้องการเก็บข้อมูลดังนี้\
      <li>แขกผู้เข้าพัก (Guest) เก็บข้อมูลเกี่ยวกับแขกที่ทำการลงชื่อเข้าพักโรงแรมเเห่งนี้  เช่น ข้อมูลติดต่อ เเต้มสะสม ซึ่งสามารถนำไปใช้เเลกส่วนลดได้ ประเภทผู้เข้าพัก (ลูกค้าทั่วไป, ลูกพิเศษ สามารถเพิ่มหรือเปลี่ยนชื่อได้) เป็นต้น</li>\
      <li>สาขา (Branch) เก็บข้อมูลเกี่ยวกับสาขาโรงเเรม เช่น ชื่อ ที่อยู่ เบอร์ติดต่อ เว็ปไซต์ เป็นต้น</li>\
      <li>ห้องพัก (Room) เก็บข้อมูลเกี่ยวกับห้องพักภายในโรงแรมเเห่งนี  เช่น ชื่อ เลขที่ห้อง ชั้น สาขา เป็นต้น</li>\
      <li>ข้อมูลการเข้าพัก (Record) เก็บข้อมูลเกี่ยวกับการเข้าพักภายในโรงเเรมเเห่งนี้  เช่น ข้อมูลเเขกผู้เข้าพัก วันเวลาที่เข้าพัก เเละข้อมูลห้อง เป็นต้น</li>\
      โดยความสัมพันธ์ของ Entity ต่าง ๆ มีดังนี้\
      <li>เมื่อแขกเข้าพักภายในโรงเเรม ข้อมูลจะถูกเก็บใน ข้อมูลการเข้าพัก แขกหนึ่งคนสามารถเข้าพักภายในโรงเเรมได้หลายครั้ง เเต่ข้อมูลการเข้าพักจะประกอบไปด้วยเเขกที่จองเพียงคนเดียวเท่านั้น</li>\
      <li>การเข้าพักจะเก็บข้อมูลห้องพักที่เข้าพัก โดยหนึ่งห้องพักสามารถเข้าพักได้หลายครั้ง เเต่ข้อมูลการเข้าพักจะประกอบไปด้วยห้องพักเพียงห้องเดียวเท่านั้น</li>\
      <li>ในเเต่ละสาขาสามารถห้องพักได้หลายห้องพัก เเละห้องพักจะเป็นของสาขานั้น ๆ เพียงสาขาเดียวเท่านั้น</li>\
      "
      res.activity.activity_type_id = 7;
      res.choice = mockActivity[2];

      this.activityInfo = res;
      baseView?.onViewModelChanged()
      baseView?.props.appStore?.setPercent(70)
      if (!res || !this.baseView) return
      if (!baseView.props.learningStore!.store.roadMap) {
        const { content_id: contentId } = res.activity;
        baseView.props.learningStore!.FetchRoadmap(contentId, (res: RoadMap) => {
          if (!this.baseView) return;
          this.baseView.props.appStore?.setPercent(100);
          const stepper = generateStepper(res, this.getCurrentActivityOrder(res), true);
          stepper.onNext = this.moveNext;
          stepper.onPrev = this.movePrev;
          this.baseView.props.appStore!.setStepper(stepper);
        }, () => {
          this.baseView?.props.history.replace('/overview');
          return;
        })
      } else {
        baseView?.props.appStore?.setPercent(100)
        this.generateStepperFromStore();
      }
    }, () => {
      baseView.props.history.replace('/overview');
      return;
    })
  }

  /**
   * On attach view, initailize view-model
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public attachView = async (baseView: IActivityPage): Promise<any> => {
    this.baseView = baseView;
    this.fetchActivity();
  }

  /**
   * Generate stepper from roadmap data in store
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private generateStepperFromStore(): void {
    const roadMap = this.baseView!.props.learningStore!.store.roadMap;
    if (!roadMap) return;
    const stepper = generateStepper(roadMap, this.getCurrentActivityOrder(roadMap), true);
    stepper.onNext = this.moveNext;
    stepper.onPrev = this.movePrev;
    this.baseView?.props.appStore!.setStepper(stepper)
  }

  /**
   * On user submit activity
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public onSubmit = (): void => {
    if (!this.baseView) return;
    const { isLoading } = this.baseView.props.learningStore!.store;
    if (isLoading) return;
    this.baseView.props.learningStore!.SubmitActivity(this.result, (res: ActivityAlert) => {
      this.generateStepperFromStore();
      this.alert = res;
      this.baseView?.onViewModelChanged();
    })
  }

  /**
   * Get current activity order
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @param roadMap Roadmap information
   *
   * @returns Current activity index in roadmap
   */
  private getCurrentActivityOrder(roadMap: RoadMap): number {
    const activiyId = this.activityInfo?.activity.activity_id;
    return roadMap.items.find(e => e.activity_id === activiyId) ? roadMap.items.find(e => e.activity_id === activiyId)!.order : 1;
  }

  /**
   * Move to next activity
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public moveNext(): void {
    if (!this.activityInfo) return;
    this.result = null;
    this.alert = null;
    this.baseView?.onViewModelChanged();
    this.baseView?.props.learningStore!.clearActivity();
    const next = this.getNextActivityId();
    if (!next) {
      this.baseView?.props.history.push('/overview')
    } else {
      this.baseView?.props.history.push(`/learning/activity/${next}`)
    }
  }

  /**
   * Move to previous activity
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private movePrev(): void {
    if (!this.activityInfo) return;
    this.result = null;
    this.alert = null;
    this.baseView?.onViewModelChanged();
    this.baseView?.props.learningStore!.clearActivity();
    const prev = this.getPrevActivityId();
    if (!prev) {
      const content_id = this.activityInfo?.activity.content_id;
      if (!content_id)
        this.baseView?.props.history.push('/overview')
      else
        this.baseView?.props.history.push('/learning/content/' + content_id)
    } else {
      this.baseView?.props.history.push(`/learning/activity/${prev}`)
    }
  }

  /**
   * Get next activity id from roadmap in store
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private getNextActivityId(): number | null {
    const { roadMap } = this.baseView?.props.learningStore!.store!;
    if (!roadMap || !this.activityInfo) return null;
    const currentActivityId = this.activityInfo!.activity.activity_id;
    const currentOrder = roadMap.items.find((e: any) => e.activity_id === currentActivityId)?.order;
    if (!currentOrder) return null;
    const nextActivity = roadMap.items.find((e: any) => e.order === currentOrder + 1);
    if (!nextActivity) {
      return null;
    }
    else {
      return nextActivity.activity_id;
    }
  }

  /**
   * Get previous activity id from roadmap in store
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  private getPrevActivityId(): number | null {
    const { roadMap } = this.baseView?.props.learningStore!.store!;
    if (!roadMap || !this.activityInfo) return null;
    const currentActivityId = this.activityInfo!.activity.activity_id;
    const currentOrder = roadMap.items.find((e: any) => e.activity_id === currentActivityId)?.order;
    if (!currentOrder) return null;
    const nextActivity = roadMap.items.find((e: any) => e.order === currentOrder - 1);
    if (!nextActivity) {
      return null;
    }
    else {
      return nextActivity.activity_id;
    }
  }

  /**
   * Get user request for hint
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public async onHint(): Promise<any> {
    if (!this.baseView) return;
    const { isLoading } = this.baseView.props.learningStore!.store;
    if (isLoading) return;
    const result = await this.baseView?.props.learningStore!.getHint()
    if (result) {
      notification['error']({
        message: "พบข้อผิดพลาด",
        description:
          result,
        onClick: () => {
        },
      });
    }
  }

  /**
   * On user update activity's answer, update answer data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @param result activity's answer
   */
  public updateResult = (result: Answer): void => {
    this.result = result;
  }

  /**
   * On view detach, remove view
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  public detachView = (): void => {
    this.baseView = undefined;
  };

}
