// validateName.ts
/**
 * This file used to store utility function(s), validating user's name.
*/

import * as yup from 'yup';

/**
 * validate name format
 *
 * @remarks
 * This method is part of utility functions.
 *
 * @param val user's name
 * 
 * @param calllback callback function to return result
 */
const checkNameFormat = (_: any, val: string, callback: any): void => {
  yup.object().shape({
    name: yup.string().required().max(100)
  }).isValid({
    name: val
  }).then((valid) => {
    if (valid) {
      callback();
    } else {
      if (val) {
        callback('ความยาวต้องไม่เกิน 100 ตัวอักษร');
      } else {
        callback('กรุณากรอกชื่อ');
      }
    }
  })
}
export default checkNameFormat
