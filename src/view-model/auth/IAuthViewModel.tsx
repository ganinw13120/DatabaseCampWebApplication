import BaseViewModel from '@view-model/BaseViewModel';
import { FormInstance } from 'antd/es/form';

export default interface IAuthViewModel extends BaseViewModel {

  /**
   * Get is application loading
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Is loading data
   */
  getIsLoadng(): boolean

  /**
   * Get display text
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Activity information
   */
  getDisplayText(): string

  /**
   * Get form input reference
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   *
   * @returns Form input reference
   */
  getFormRef(): React.RefObject<FormInstance<any>>

  /**
   * On user submit input form, submitting information
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  OnFinish(): Promise<void>

  /**
   * On user select register page, take user to register page
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   */
  onChangePage(): void
}
