<template>
  <div class="case">
  <header>
      <h2>为数千家公司提供专业的一站式政策管理系统</h2>
      <h3>乘政策东风助企业发展</h3>
      <div class="btnsqs" @click="registerShow"  @click.stop>即刻体验</div>
    </header>
    
     <div ref="testref" style="height:600px">
      <div class="accelerate" >
        <h3>策千里用数据智能助力企业加速</h3>
        <transition name="plus-icon">
        <div class="accelerate-speed" v-if="showpercentage">
          <div class="speedfather">
            <div class="speed">
              <!-- <img v-lazy="require('@/assets/indexlogo/speedlogo1.png')"  alt="" /> -->
              <Percentage :percent="99.9" />
            </div>
            <p>政策查询效率提升</p>
          </div>
          <div class="speedfather">
            <div class="speed">
              <!-- <img v-lazy="require('@/assets/indexlogo/speedlogo1.png')" alt="" /> -->
              <Percentages :percent="90" />
            </div>
            <p>精准匹配效率提升</p>
          </div>
          <div class="speedfather">
            <div class="speed">
              <Percentages :percent="90" />
              <!-- <img v-lazy="require('@/assets/indexlogo/speedlogo1.png')" alt="" /> -->
            </div>
            <p>项目申报效率提升</p>
          </div>
          <div class="speedfather">
            <div class="speed">
              <Percentages :percent="50" />
              <!-- <img v-lazy="require('@/assets/indexlogo/speedlogo1.png')" alt="" /> -->
            </div>
            <p>政策申报成本下降</p>
          </div>
          <div class="speedfather">
            <div class="speed">
              <!-- <Percentage :percentNum="50" /> -->
              <Percentages :percent="50" />
              <!-- <img v-lazy="require('@/assets/indexlogo/speedlogo1.png')" alt="" /> -->
            </div>
            <p>效益提升</p>
          </div>
        </div>
          </transition>
      </div>
    </div>
  
  </div>
</template>

<script>
import Percentage from "./components/percentage.vue";
import Percentages from "./components/percentages.vue";

export default {
   components: {
    Percentage,
    Percentages,
  },
  data() {
    return {
      showpercentage:false,
      currentScroll:0
    }
  },
methods: {
    registerShow(){
       this.$emit('registerShow');
    },
     handleScroll() {
         this.currentScroll = window.pageYOffset;
         console.log(this.$refs.testref.offsetTop);
         console.log(this.currentScroll >= this.$refs.testref.offsetTop - 500);
         if(this.currentScroll >= this.$refs.testref.offsetTop - 600){
           this.showpercentage=true
         }
     }
},
 deactivated() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  activated() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.showpercentage=false
    // console.log(window.screen.height,"页面高度");
    if(window.screen.height>1080){
       this.showpercentage=true
    }
  },
}
</script>

<style lang="less" scoped>
header {
  background: url(../../../assets/newindex/testbanner.png) no-repeat;
  background-size:cover;
  height:600px;
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
    margin-top: 100px;
    cursor: pointer;
    color: #ffffff;
    transition: box-shadow 0.5s;
    &:hover {
      box-shadow: 0px 12px 22px -4px #ff6541;
    }
  }
}
nav{
  width: 1200px;
  height: 460px;
  margin: 0 auto;
  h2{
    text-align: center;
    font-size: 40px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 0px;
    color: #333333;
  }
}
.accelerate {
  height: 600px;
  h3 {
    text-align: center;
    margin: 0 auto;
    font-size: 32px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 90px;
    color: #333333;
  }
  .accelerate-speed {
    display: flex;
    justify-content: space-around;
    width: 1200px;
    margin: 0 auto;
    margin-top: 90px;
    .speedfather {
      width: 194px;
      height: 235px;
      margin: 0 auto;
      .speed {
        overflow: hidden;
        margin: 0 auto;
        width: 154px;
        height: 155px;
      }
      p {
        text-align: center;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        margin-top: 40px;
        color: #333333;
      }
    }
  }
}

 .plus-icon-enter-active{
    transition: opacity 1s;
  }
  .plus-icon-enter{
     opacity: 0.2;
  }
  .plus-icon-leave-active{
    transition: opacity 1s;
  }
  .plus-icon-leave-to{
    opacity: 0;
  }

</style>>
