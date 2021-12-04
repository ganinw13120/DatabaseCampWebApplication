// BaseViewModel.tsx
/**
 * This file contains interface for view-model, using to implent view with view-model.
*/

import BaseView from '@view/BaseView';

export default interface BaseViewModel {
  attachView(baseView: BaseView): void;
  detachView(): void;
}
