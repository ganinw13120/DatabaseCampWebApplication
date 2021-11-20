import { makeObservable, observable, action } from 'mobx';
import { Stepper } from '@model/App';
import RootStore from '../RootStore';

type Store = {
  isExpand : boolean,
  progressPercent : number,
  stepper : Stepper | null
}

export class AppStore {
  rootStore: RootStore; // contains the root of store (outest mobx)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this)
    const expandSidebarPage = [
      'overview',
      'ranking',
      'examination',
      'profile'
    ];
    let isExpand = false;
    expandSidebarPage.forEach(e=>{if(window.location.href.includes(e)) isExpand = true})
    this.store.isExpand = isExpand;
  }
  
  @observable
  store : Store = {
    isExpand : false,
    progressPercent : 0,
    stepper : null
  }

  @action.bound 
  public setPercent(percent: number): void {
    this.store.progressPercent = percent;
  }

  @action.bound 
  public addPercent(percent: number): void {
    const {progressPercent} = this.store; 
    this.store.progressPercent = progressPercent + percent;
  }

  @action.bound 
  public setExpandWithDelay(type: boolean): void {
    setTimeout(() => {
      this.setExpand(type);
    }, 10);
  }

  @action.bound 
  public setExpand(type: boolean): void {
    this.store.isExpand = type;
  }

  @action.bound
  public setStepper(data : Stepper) : void {
    this.store.stepper = data;
  }

  @action.bound 
  public hideStepper() : void {
    this.store.stepper = null;
  } 

}