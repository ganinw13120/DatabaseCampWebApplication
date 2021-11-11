import { CompletionAnswer } from "../../domain/entity/model/Learning";

export const validateMatching = (result : string[][]) : boolean => {
let _result = true;
result.forEach((e: any, key: number) => {
    if (!e[0] || !e[1]) {
    _result = false;
    }
})
return _result;
}

export const validateCompletion = (result : CompletionAnswer[]) : boolean => {
let _result = true;
result.forEach((e: any, key: number) => {
    if (!e.content) {
    _result = false;
    }
})
return _result;
}

export const validateMultiple = (result : number ) : boolean => {
return result ? true : false;
}