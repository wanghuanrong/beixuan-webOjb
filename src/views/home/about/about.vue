<template>
  <div class="about">
        <header>
      <h2 style="font-size:50px;">打造“政策服务链闭环”接通政策落地“最后一公里”</h2>
      <h3>针对信息、费用和期限等，为客户提供智能化、标准化、高安全性的全流程管理</h3>
      <div class="btnsqs" @click="registerShow"  @click.stop>即刻体验</div>
    </header>
    <nav>
      <h3>策千里</h3>
      <p>策千里是国内第一家政策大数据服务平台，为企业提供全方面的政策咨询服务</p>
      <p class="towp">策千里通过不断扩充政策、解析政策，已构建出覆盖全国政策的互联网大数据服务平台，并在此基础上结合、机器学习算法等人工智</p>
      <p class="towp">能技术，为企业解决项目申报的一系列问题，降低企业时间、人力、财力等成本，为企业保驾护航。</p>
    </nav>

     <div class="foot">
      <h3>联系我们</h3>
      <div class="map">
        <i class="el-icon-location"></i>
        <span>地址: 深圳市宝安区宝安大道4018号华丰国际商务大厦4楼3A09</span>
        <!-- <i class="el-icon-phone phone"></i> -->
        <i class="iconfont icondianhua11 phone"></i>
        <span class="phonetxt">电话：0755-27905057</span>
        <!-- <div class="qrlogo"><img src="@/assets/QRcode.png" alt="" /></div> -->
        <!-- <p>公众号二维码</p> -->
        <div class="baidumap">
          <!-- <div id="allmap"></div> -->
          <img
            style="width：100%;height:100%"
            src="@/assets/indexbg/map.png"
            alt=""
          />
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    
  },
  data () {
    return {
      
    }
  },
  methods: {
     registerShow(){
       this.$emit('registerShow');
      server
    },
  },
}
</script>

<style lang="less" scoped>
header {
  background: url(../../../assets/newindex/infobanner.png) no-repeat;
  background-size:cover;
  height:590px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin-top: 70px;
  h2 {
    font-size: 56px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 0px;
    color: #333333;
    margin-top: 210px;
  }
  h3 {
    margin-top: 90px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0px;
    color: #333333;
  }
  .btnsqs {
    margin-top: 116px;
    width: 120px;
    height: 40px;
    line-height: 40px;
    background-image: linear-gradient(to right, #ff6541, #ff9580);
    text-align: center;
    border-radius: 50px;
    margin-top: 120px;
    cursor: pointer;
    color: #ffffff;
    transition: box-shadow 0.5s;
    &:hover {
      box-shadow: 0px 12px 22px -4px #ff6541;
    }
  }
}
nav{
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 200px;
  margin-top: 100px;
  h3{
    font-size: 40px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 0px;
    color: #333333;
  }
  p{
    font-size: 18px;
    color: #333;
    margin-top: 80px;
  }
  .towp{
    margin-top: 20px;
  }
}

.foot {
  display: flex;
  align-items: center;
  flex-direction: column;
  // height: 1440px;
  h3 {
    margin-top: 83px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 40px;
    color: #333333;
  }
  .map {
    position: relative;
    width: 1200px;
    height: 457px;
    border: 1px solid #f1f1f1;
    margin: 0 auto;
    margin-top: 48px;
    margin-bottom: 63px;
    i {
      position: absolute;
      top: 57px;
      left: 55px;
      color: #256bff;
      font-size: 30px;
    }
    span {
      position: absolute;
      top: 61px;
      left: 109px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 21px;
      color: #333333;
    }
    .phone {
      position: absolute;
      top: 113px;
      left: 55px;
    }
    .phonetxt {
      position: absolute;
      top: 118px;
      left: 109px;
    }
    .qrlogo {
      position: absolute;
      top: 200px;
      left: 236px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 163px;
      height: 156px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      position: absolute;
      top: 380px;
      left: 278px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 19px;
      color: #333333;
    }
    .baidumap {
      position: absolute;
      overflow: hidden;
      top: 40px;
      left: 625px;
      width: 530px;
      height: 374px;
      border: 1px solid #ccc;
    }
  }
}
</style>