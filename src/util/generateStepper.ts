// generateStepper.ts
/**
 * This file used to store utility function(s), related to generating stepper used in stepper module.
*/
import { Step, Stepper } from "../model/App";
import { RoadMap } from "../model/Learning";


/**
 * Generate stepper from roadmaps.
 *
 * @remarks
 * This method is part of utility functions.
 *
 * @param data roadmap information.
 * 
 * @param current current activity index
 * 
 * @param isLectureProvide if lecture is provide in stepper
 *
 * @return Stepper information
 */
const generateStepper = (data: RoadMap, current: number, isLectureProvide: boolean = false): Stepper => {
    let stepper: Stepper = {
        steps: [],
        currentStep: current
    }
    if (isLectureProvide) stepper.steps.push(Step.Lecture);
    data.items.forEach(e => {
        stepper.steps.push(e.is_learned ? Step.Activity : Step.UnCompleteActivity)
    })
    return stepper
}

export default generateStepper

/**
 * Generate empty stepper.
 *
 * @remarks
 * This method is part of utility functions.
 *
 * @return Stepper information
 */
export const generateEmptyStepper = (): Stepper => {
    const stepper: Stepper = {
        steps: [],
        currentStep: 0
    }
    return stepper
}
