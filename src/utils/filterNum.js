export function filterNumber(value){
    // 判断不必要的字符
       if (!this.forminput[value] || this.forminput[value]=== '-' || this.forminput[value] === '-0'|| this.forminput[value]==="-.") {
               this.forminput[value] = 0
           }

        // 判断是否为数字
     this.forminput[value] = Number(this.forminput[value])
      if(isNaN(this.forminput[value])){
        this.forminput[value] = 0
      }
}