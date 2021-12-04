// validateActivity.ts
/**
 * This file used to store utility function(s), validating activitys' answer.
*/

import { CompletionAnswer } from "../model/Learning";

/**
 * validate matching choice answer.
 *
 * @remarks
 * This method is part of utility functions.
 *
 * @param result answer of activity
 * 
 * @return if answer is valid
 */
export const validateMatching = (result: string[][]): boolean => {
    let _result = true;
    result.forEach((e: any, key: number) => {
        if (!e[0] || !e[1]) {
            _result = false;
        }
    })
    return _result;
}

/**
 * validate completion choice answer.
 *
 * @remarks
 * This method is part of utility functions.
 *
 * @param result answer of activity
 * 
 * @return if answer is valid
 */
export const validateCompletion = (result: CompletionAnswer[]): boolean => {
    let _result = true;
    result.forEach((e: any, key: number) => {
        if (!e.content) {
            _result = false;
        }
    })
    return _result;
}

/**
 * validate multiple choice answer.
 *
 * @remarks
 * This method is part of utility functions.
 *
 * @param result answer of activity
 * 
 * @return if answer is valid
 */
export const validateMultiple = (result: number): boolean => {
    return result ? true : false;
}