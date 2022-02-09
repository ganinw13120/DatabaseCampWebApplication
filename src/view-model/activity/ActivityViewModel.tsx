// ActivityViewModel.tsx
/**
 * This file contains view-model, related to activity page.
*/

import IActivityViewModel from './IActivityViewModel';
import { notification } from 'antd';

import { IActivityPage } from '@root/view/activity/ActivityPage';

import { Activity, ActivityAlert, ActivityChoices, Answer, RoadMap } from '@model/Learning';
import generateStepper, { generateEmptyStepper } from '@util/generateStepper';

const mockActivity: ActivityChoices[] = [
  [
    {
      content: 'patient_id',
      multiple_choice_id: 1
    },
    {
      content: 'first_name',
      multiple_choice_id: 2
    },
    {
      content: 'last_name',
      multiple_choice_id: 3
    },
    {
      content: 'mobile_no',
      multiple_choice_id: 4
    },
    {
      content: 'patient_type',
      multiple_choice_id: 4
    },
    {
      content: 'blood_type',
      multiple_choice_id: 4
    },
    {
      content: 'ตารางนี้ไม่มีปัญหาเลย',
      multiple_choice_id: 4
    }
  ],
  {
    groups: ['ข้อจำกัดของ File-based System', 'ไม่เป็นข้อจำกัดของ File-based System'],
    vocabs: ["ข้อมูลซ้ำซ้อน", "ค่าใช้จ่ายสูง", "Isolation data", "ต้องใช้ผู้เชี่ยวชาญ", "รูปแบบไฟล์ต่างกัน"]
  },
  {
    tables: [[null, null, null, null], [null, null, null, null]],
    choices: ['วิชาเรียน', 'เบอร์โทร', 'ครู', 'ชื่อ-นามสกุล', 'รหัสวิชา', 'รายละเอียดวิชา', 'ห้องเรียน', 'ที่อยู่ติดต่อ']
  },
  {
    choices: ['teacher_id', 'first_name', 'teacher_id', 'last_name', 'mobile_no', 'last_name', 'teacher_id', 'first_name', 'last_name'],
    problems: [
      {
        before: 1,
        after: 1
      },
      {
        before: 1,
        after: 1
      },
      {
        before: 2,
        after: 1
      },
      {
        before: 2,
        after: 1
      }
    ]
  },
  {
    problems: [
      {
        question: 'ในด้าน Entity มีความถูกต้องหรือไม่',
        choices: [
          { content: 'ไม่มีความถูกต้อง เนื่องจากยังมี Entity ไม่ครบตามความต้องการของระบบ', multiple_choice_id: 1 },
          { content: 'ไม่มีความถูกต้อง เนื่องจาก Entity ยังสามารถเพิ่มเติมให้ใช้งานง่ายขึ้นได้', multiple_choice_id: 1 },
          { content: 'มีความถูกต้อง เนื่องจากมี Entity ครบถ้วน', multiple_choice_id: 1 },
        ]
      },
      {
        question: 'ในด้าน Attribute มีความถูกต้องหรือไม่',
        choices: [

          { content: 'ไม่มีความถูกต้อง เนื่องจากยังมี Attribute ไม่ครบตามความต้องการของระบบ', multiple_choice_id: 1 },
          { content: 'ไม่มีความถูกต้อง เนื่องจาก Attribute ยังสามารถเพิ่มเติมให้ใช้งานง่ายขึ้นได้', multiple_choice_id: 1 },
          { content: 'มีความถูกต้อง เนื่องจากมี Attribute ครบถ้วน', multiple_choice_id: 1 },
        ]
      },
      {
        question: 'ในด้าน Relationship มีความถูกต้องหรือไม่',

        choices: [

          { content: 'ไม่มีความถูกต้อง เนื่องจากยังมี Relationship ไม่ครบตามความต้องการของระบบ', multiple_choice_id: 1 },
          { content: 'ไม่มีความถูกต้อง เนื่องจาก Relationship ยังสามารถเพิ่มเติมให้ดีขึ้นได้', multiple_choice_id: 1 },
          { content: 'มีความถูกต้อง เนื่องจากมี Relationship ครบถ้วนและถูกต้อง', multiple_choice_id: 1 },
        ]
      },
      {
        question: 'ในด้านความซ้ำซ้อนของข้อมูล (Redundancy) มีความถูกต้องหรือไม่',

        choices: [

          { content: 'มีความถูกต้อง เนื่องจากข้อมูลไม่สามารถเกิดปัญหาจากความซ้ำซ้อนได้', multiple_choice_id: 1 },
          { content: 'ไม่ถูกต้อง เนื่องจากข้อมูลเกิดความซ้ำซ้อนได้', multiple_choice_id: 1 },
        ]
      },
    ]
  },
  [
    {
      content: 'นักเรียน',
      multiple_choice_id: 1
    },
    {
      content: 'ครู',
      multiple_choice_id: 2
    },
    {
      content: 'ห้องเรียน',
      multiple_choice_id: 3
    },
    {
      content: 'วัน-เวลา ที่เข้าเรียน',
      multiple_choice_id: 4
    },
    {
      content: 'ประวัติการเข้าเรียน',
      multiple_choice_id: 4
    },
    {
      content: 'ชื่อ-นามสกุล นักเรียน',
      multiple_choice_id: 4
    },
    {
      content: 'ชื่อโรงเรียน',
      multiple_choice_id: 4
    }
  ],
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

      // res.activity.question = "<image src='https://storage.googleapis.com/databasecamp-public/material/Screen%20Shot%202565-01-11%20at%2023.28%201%20(2).png' style='width:60%; padding-bottom:20px;' /> จากตารางข้างต้น Attribute ไหนบ้างที่เข้าข่ายเก็บข้อมูลซ้ำซ้อน";
      // res.activity.story = "\
      // นายแกนกำลังออกแบบฐานข้อมูลภายในโรงพยาบาลเเห่งหนึ่ง โดยประกอบไปด้วยข้อมูลต่าง ๆ ดังนี้ โดยในการเก็บข้อมูลคนไข้ ประกอบไปด้วยข้อมูลดังนี้\
      // <li>patient_id เป็นรหัสประจำตัวของคนไข้</li>\
      // <li>first_name เป็นชื่อจริงคของคนไข้</li>\
      // <li>last_name เป็นนามสกุลของคนไข้</li>\
      // <li>mobile_no เป็นเบอร์โทรติดต่อของคนไข้</li>\
      // <li>patient_type เป็นประเภทของคนไข้ ประกอบไปด้วยคนไข้ประเภทต่าง ๆ ภายในโรงพยาบาล เช่น คนไข้ภายใน คนไข้ภายนอก เป็นต้น ซึ่งสามารถเปลี่ยนแปลงได้ภายในอนาคตะ</li>\
      // <li>blood_type เป็นหมู่เลือดของคนไข้ ประกอบไปด้วย A, B, AB, เเละ O</li>\
      // "
      res.activity.activity_type_id = 5;
      res.choice = mockActivity[1];

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
