import BaseViewModel from '@view-model/BaseViewModel';
import { FormInstance } from 'antd/es/form';

export default interface IAuthViewModel extends BaseViewModel {
  isLoading: boolean;
  displayText: string; 
  formRef?: React.RefObject<FormInstance<any>>;
  OnFinish(): Promise<void>;
}
