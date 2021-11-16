
import * as yup from 'yup';
const checkEmailFormat = (_: any, val: string, callback: any): void => {
  yup.object().shape({
    email : yup.string().required().email()
  }).isValid({
    email : val
  }).then((valid)=>{
    if (valid) {
      callback();
    } else {
      callback('กรุณากรอกอีเมลให้ถูกต้อง');
    }
  })
}
export default checkEmailFormat
  