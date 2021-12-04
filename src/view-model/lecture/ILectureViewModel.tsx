import { Lecture } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface ILectureViewModel extends BaseViewModel {

  /**
   * Get lecture data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   * 
   * @returns Lecture data
   */
  getLectureInfo(): Lecture | null;

  /**
   * On user click next, load next activity from roadmap in store
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  onClickNext(): void
}
