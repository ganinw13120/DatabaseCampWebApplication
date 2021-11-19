/**
 * Store _Stepper_ information shown on stepper.
 * 
 * _steps_ : Steps information
 * 
 * _currentStep_ : Current step index
 * 
 * _onNext_ : Function which will be trigger on click next
 * 
 * _onPrev_ : Function which will be trigger on click previous
 */
export type Stepper = {
    steps : Step[],
    currentStep : number,
    onNext ?() : void,
    onPrev ?() : void
}

/**
 * Enum for step types
 */
export enum Step {
    Lecture,
    Activity = 1,
    UnCompleteActivity,
}