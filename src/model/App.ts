export type Stepper = {
    steps : Step[],
    currentStep : number,
    onNext ?() : void,
    onPrev ?() : void
}

export enum Step {
    Lecture,
    Activity = 1,
    UnCompleteActivity,
}