import ICompletionViewModel from './ICompletionViewModel';
import BaseView from '../../view/BaseView';

export default class CompletionViewModel implements ICompletionViewModel {
  private baseView?: BaseView;
  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  

}
