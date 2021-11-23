import BaseViewModel from '@view-model/BaseViewModel';
import { FormInstance } from 'antd/es/form';

export default interface IAuthViewModel extends BaseViewModel {
  getIsLoadng () : boolean
  getDisplayText () : string
  getFormRef () : React.RefObject<FormInstance<any>> 

  OnFinish(): Promise<void>
  onChangePage() : void
  matchPassword  ?(_: any, val: string, callback: any): void
}
