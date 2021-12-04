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
    steps : Step[]
    currentStep : number
    onNext ?() : void
    onPrev ?() : void
}

/**
 * Enum for step types
 */
export enum Step {
    Lecture,
    Activity = 1,
    UnCompleteActivity
}