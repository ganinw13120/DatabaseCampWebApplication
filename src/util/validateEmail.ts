
import * as yup from 'yup';
const checkEmailFormat = (_: any, val: string, callback: any): void => {
  const result = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  yup.object().shape({
    email : yup.string().required().matches(result)
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
  