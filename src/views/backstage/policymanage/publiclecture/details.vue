<template>
  <div class="details">
    <div class="title">{{ content.title }}</div>
    <div class="content" v-html="content.context"></div>
    <div class="time">预约时间：{{ content.beginDate }}至{{content.endDate}}</div>
    <div class="btnBox">
      <div class="btn return" @click="returnBtn" :style="{'margin-left' : content.status == 1 ? '' : '62px'}">返回</div>
      <div class="btn" v-if="content.status == 1" @click="urlBtn(content.url)">
        立即预约
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.content = this.$store.state.xjfDetails;
    console.log(this.content);
  },
  data() {
    return {
      content: {},
    };
  },
  methods: {
    urlBtn(url) {
      if(url.indexOf("http") == -1){
        window.open("https://" + url, "_blank");
      }else{
        window.open(url, "_blank");
      }
      
    },
    returnBtn(){
      this.$router.go(-1);
    }
  },
};
</script>

<style lang='less' scoped>
@import url("../../../../assets/css/Belement.css");
.details {
  width: 100%;
  overflow: hidden;
  line-height: 30px;
  .title {
    text-align: center;
    height: 50px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 50px;
    color: #333333;
  }

  .content {
    width: 70%;
    overflow: hidden;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 20px;
    color: #666666;
    margin: 20px auto;
  }

  .time {
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: #666666;
    // padding: 20px 20px 0 0 ;
    padding: 20px 15% 0 0 ;
    text-align: right;
  }

  .btnBox {
    overflow: hidden;
    margin: 30px auto 0;
    width: 200px;
    .btn {
      float: left;
      width: 75px;
      height: 29px;
      background: #256BFF;
      border-radius: 2px;
      text-align: center;
      line-height: 29px;
      color: white;
      margin-left: 25px;
      cursor: pointer;
      font-size: 12px;
    }

    .return{
      border: 1px solid #256BFF;
      color: #256BFF;
      background-color: white;
    }
  }
}

.el-main {
  text-align: left;
  line-height: 25px;
}
</style>