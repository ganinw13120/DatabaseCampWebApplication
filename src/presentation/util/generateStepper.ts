import { Step, Stepper } from "../../domain/entity/model/App";
import { RoadMap } from "../../domain/entity/model/Learning";

const generateStepper = (data : RoadMap, current : number, isLectureProvide : boolean = false) : Stepper => {
    let stepper : Stepper = {
        steps : [],
        currentStep : current
    }
    if (isLectureProvide) stepper.steps.push(Step.Lecture);
    data.items.forEach(e=>{
        console.log({...e})
        stepper.steps.push(e.is_learned ? Step.Activity : Step.UnCompleteActivity)
    })
    console.log(stepper)
    return stepper
}
export default generateStepper

export const generateEmptyStepper = () : Stepper => {
    const stepper : Stepper = {
        steps : [],
        currentStep : 0
    }
    return stepper
}
