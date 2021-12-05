// IAppStore.ts
/**
 * This file used to be a interface of app store.
*/
import { Stepper } from "@model/App";

export default interface IAppStore {

  /**
   * Set progress bar percent.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param percent percent of progress bar
   */
  setPercent(percent: number): void

  /**
   * Add progress bar percent.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param percent percent of progress bar
   */
  addPercent(percent: number): void

  /**
   * Set sidebar expansion with delay 10 ms.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param type is sidebar will be expand or hide
   */
  setExpandWithDelay(type: boolean): void

  /**
   * Set sidebar expansion right away.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param type is sidebar will be expand or hide
   */
  setExpand(type: boolean): void

  /**
   * Set stepper information.
   *
   * @remarks
   * This method is part of app store, manipulating application.
   *
   * @param data for stepper
   */
  setStepper(data: Stepper): void

  /**
   * Hide stepper
   *
   * @remarks
   * This method is part of app store, manipulating application.
   */
  hideStepper(): void

  /**
   * Store for storing datas
   *
   * @remarks
   * This method is part of app store, manipulating application.
   */
  store: Store
}

export type Store = {
  isExpand: boolean
  progressPercent: number
  stepper: Stepper | null
}

