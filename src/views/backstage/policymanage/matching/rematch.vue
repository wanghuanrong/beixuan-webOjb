<template>
  <div>
    <div class="rematch">
      <div class="rematchimg">
        <img src="@/assets/indexbg/组1.png" alt="" />
      </div>
      <div class="ramatchTitle">
        <p>{{userInfo.companyName}}</p>
        <h1 v-if="userInfo.roles[0].roleKey=='vip'">
          您已经是会员，确认主体后我们会将您之前提交的资料载入您的企业基本信息。
        </h1>
        <h1 v-else>您还不是会员,赶快加入我们吧</h1>
        <el-button type="primary" @click="queren">
          <i></i>
          确认主体</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userInfo:{}
    }
  },
  created(){
    this.getbuss()
  },
  methods: {
    queren() {
      this.$router.push("matching");
    },
    getbuss(){
    const userinfo=JSON.parse(localStorage.getItem("userInfo"))
    this.userInfo=userinfo
    console.log(this.userInfo.roles[0].roleKey,"panduan1");
    }
  },
};
</script>

<style lang="less" scoped>
.rematch {
  // overflow: hidden;
  margin-top: 153px;
  // max-width: 1000px;
  height: 432px;
  margin-left: 100px;
}
.rematchimg {
  float: left;
  width: 50%;
  height: 432px;
  // border: 1px dashed #888888;
  img {
    width: 100%;
    height: 100%;
  }
}
.ramatchTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 432px;
  float: left;
 
  p {
    height: 31px;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 31px;
    color: #256bff;
  }
  h1 {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: #333333;
    margin-top: 35px;
  }
  .el-button{
    position: relative;
    margin-top: 35px;
     padding-right: 33px;
    i{
    position: absolute;
     top: 14px;
     left: 80px;
     width: 0px;
      height: 0px;
      border-right: 10px solid transparent;
      border-top: 10px solid #fff;
      transform:rotate(134deg)
    }
  }
}
</style>