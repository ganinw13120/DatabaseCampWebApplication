import { Lecture } from '@model/Learning';
import BaseViewModel from '@view-model/BaseViewModel';

export default interface ILectureViewModel extends BaseViewModel {
  getLectureInfo () : Lecture | null;
  onClickNext () :void
}
