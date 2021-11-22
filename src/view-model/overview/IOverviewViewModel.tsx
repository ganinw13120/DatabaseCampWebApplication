import BaseViewModel from '@view-model/BaseViewModel';

import {Overview} from '@model/Learning';

export default interface IOverviewViewModel extends BaseViewModel {
  getData() : Overview | null
}
