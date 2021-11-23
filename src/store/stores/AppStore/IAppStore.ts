import { Stepper } from "@model/App";
import { ExaminationOverview } from "@model/Learning";

export default interface IAppStore {
  setPercent(percent: number): void
  addPercent(percent: number): void
  setExpandWithDelay(type: boolean): void
  setExpand(type: boolean): void
  setStepper(data : Stepper) : void
  hideStepper() : void
  store : Store
}

export type Store = {
  isExpand : boolean
  progressPercent : number
  stepper : Stepper | null
}

