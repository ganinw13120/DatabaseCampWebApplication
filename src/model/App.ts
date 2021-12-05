// App.ts
/**
 * This file used to store model using in application, related to application.
*/

import { ReactElement } from "react"

/**
 * Store `Stepper` information shown on stepper.
 *
 * `steps` : Steps information
 *
 * `currentStep` : Current step index
 *
 * `onNext` : Function which will be trigger on click next
 *
 * `onPrev` : Function which will be trigger on click previous
 */
export type Stepper = {
    steps: Step[]
    currentStep: number
    onNext?(): void
    onPrev?(): void
}

/**
 * Enum for step types
 */
export enum Step {
    Lecture,
    Activity = 1,
    UnCompleteActivity
}


export interface Routes {
    url: string,
    page: ReactElement,
}