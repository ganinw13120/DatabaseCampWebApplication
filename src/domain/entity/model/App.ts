export type Stepper = {
    totalStep : number,
    currentStep : number,
    onNext ?() : void,
    onPrev ?() : void
}