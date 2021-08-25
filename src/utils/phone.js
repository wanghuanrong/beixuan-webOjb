
import {pushPhoneNumber} from '@/utils/register'

export function connectnow(num){
    if(num.trim()==="")return this.$message.error('电话号码不能为空')
    const reg=/^1[3|4|5|7|8][0-9]{9}$/
    let result = reg.test(num);
    if(result===false) return this.$message.error('请输入正确的电话号码') 
    pushPhoneNumber(num).then((res)=>{
      // console.log(res);
      // console.log();
      console.log(res);
      // if(res.code!==500 || res.code!==200) return this.$message.error('网络拥堵,请稍后再试')
        this.$message.success(res.msg)
    })
  } 