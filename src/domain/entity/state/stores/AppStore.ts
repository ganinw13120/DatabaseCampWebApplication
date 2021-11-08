import { makeObservable, observable, action } from 'mobx';
import RootStore from '../Rootstore';

interface Store {
  [key : string] : any
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
    progressPercent : 0
  }

  @action.bound 
  public setPercent(percent: number): void {
    return this.setStore({
      progressPercent : percent
    })
  }

  @action.bound 
  public addPercent(percent: number): void {
    const {progressPercent} = this.store; 
    return this.setStore({
      progressPercent : progressPercent + percent
    })
  }

  @action.bound 
  public setExpandWithDelay(type: boolean): void {
    setTimeout(() => {
      return this.setStore({
        isExpand : type
      })
    }, 10);
  }

  @action.bound 
  public setExpand(type: boolean): void {
    return this.setStore({
      isExpand : type
    })
  }

  @action.bound
  setStore(data: { [key: string]: any }, merge: boolean = false) {
    for (let e in data) {
      const _data = data[e];
      if (merge) {
        this.store[e] = {
          ...this.store[e],
          ..._data
        };
      }
      else {
        this.store[e] = _data;
      }
    }
  }
}