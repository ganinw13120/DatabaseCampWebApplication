// validatePassword.ts
/**
 * This file used to store utility function(s), validating user's password.
*/

import * as yup from 'yup';

/**
 * validate password format
 *
 * @remarks
 * This method is part of utility functions.
 *
 * @param val user's password
 * 
 * @param calllback callback function to return result
 */
const checkPasswordFormat = (_: any, val: string, callback: any): void => {
  yup.object().shape({
    password: yup.string().required().min(8)
  }).isValid({
    password: val
  }).then((valid) => {
    if (valid) {
      callback();
    } else {
      callback('ความยาวต้องมีอย่างน้อย 8 ตัวอักษร');
    }
  })
}
export default checkPasswordFormat
