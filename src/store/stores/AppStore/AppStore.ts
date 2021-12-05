// AppStore.ts
/**
 * This file used to be a store about application of mobx store, functions, and data related to functionality of application.
*/
import { makeObservable, observable, action } from 'mobx';
import { Stepper } from '@model/App';
import RootStore from '../../RootStore';
import IAppStore, {Store} from './IAppStore';

export class AppStore implements IAppStore {
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
  
  /**
   * Store for storing datas
   *
   * @remarks
   * This method is part of app store, manipulating application.
   */
  @observable
  store : Store = {
    isExpand : false,
    progressPercent : 0,
    stepper : null
  }

  /**
   * Set progress bar percent.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param percent percent of progress bar
   */
  @action.bound
  public setPercent(percent: number): void {
    this.store.progressPercent = percent;
  }

  /**
   * Add progress bar percent.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param percent percent of progress bar
   */
  @action.bound
  public addPercent(percent: number): void {
    const {progressPercent} = this.store;
    this.store.progressPercent = progressPercent + percent;
  }

  /**
   * Set sidebar expansion with delay 10 ms.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param type is sidebar will be expand or hide
   */
  @action.bound
  public setExpandWithDelay(type: boolean): void {
    setTimeout(() => {
      this.setExpand(type);
    }, 10);
  }

  /**
   * Set sidebar expansion right away.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param type is sidebar will be expand or hide
   */
  @action.bound
  public setExpand(type: boolean): void {
    this.store.isExpand = type;
  }

  /**
   * Set stepper information.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param data for stepper
   */
  @action.bound
  public setStepper(data : Stepper) : void {
    this.store.stepper = data;
  }

  /**
   * Hide stepper
   *
   * @remarks
   * This method is part of app store, manipulating application.
   */
  @action.bound
  public hideStepper() : void {
    this.store.stepper = null;
  }

}