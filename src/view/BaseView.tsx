// BaseView.tsx
/**
 * This file contains interface for view, using to implent view with view-model.
*/

export default interface BaseView {
  props: any;
  onViewModelChanged(): void;
}
