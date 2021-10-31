
import * as yup from 'yup';
const checkEmailFormat = (_: any, val: string, callback: any): void => {
  yup.object().shape({
    password : yup.string().required().min(8)
  }).isValid({
    password : val
  }).then((valid)=>{
    if (valid) {
      callback();
    } else {
      callback('ความยาวต้องมีอย่างน้อย 8 ตัวอักษร');
    }
  })
}
export default checkEmailFormat
  