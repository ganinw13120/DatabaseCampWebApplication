import BaseViewModel from '@view-model/BaseViewModel';

import { Overview } from '@model/Learning';

export default interface IOverviewViewModel extends BaseViewModel {

  /**
   * Get overview data
   *
   * @remarks
   * This method is part of view-model, application logic parts, manipulating view.
   * 
   * @returns Overview data
   */
  getData(): Overview | null
}
