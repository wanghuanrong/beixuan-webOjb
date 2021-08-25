<template>
  <div class="features">
    <div class="featurbox onefea margintop">
      <div class=" featimg onebox">
        <img src="@/assets/newindex/featuone.png" alt="">
      </div>
      <div class="feattitle oneboxright">
        <h2>政策查询</h2>
        <p>
        策千里数据库涵盖全国各省市部委近5年所有政策数据</br>
        并持续保持数据实时更新，且拥有强大的搜索引擎</br>
        支持搜索及多种条件筛选，为您快速找到目标政策
        </p>
      </div>
    </div>
    <div style=" background-color: #f8f9fb;">
    <div class="featurbox onefea twofra">   
       <div class="feattitle feattitleft onebox">
        <h2>知识产权查询</h2>
        <p>
        支持一键查询企业知识产权明细</br>
        支持官方费用缴纳期限提醒</br>
        支持一键导出企业名下知识产权信息报告
        </p>
   
      </div>
      <div class="featimg featimgright oneboxright">
        <img src="@/assets/newindex/featuone1.png" alt="">
      </div>
     
    </div>
    </div>

   <div class="featurbox onefea threebox threefra" style="position: relative;" ref="three" >
     <div  :class="{dobghua1:true,dobghua2:testShow}"></div>
      <div class="featimg">
        <img src="@/assets/newindex/featuone2.png" alt="">
      </div>
      <div class="feattitle">
        <h2>查企业</h2>
        <p>
        支持快速查询企业相关工商信息</br>
        搜索竞争对手企业已获得资助及立项信息</br>
        </p>
      </div>
       <!-- <div class="featimg" :class="{test:true,testenter:testShow}">
        <img src="@/assets/newindex/featuone2.png" alt="">
      </div>
      <div class="feattitle" :class="{test:true,oneboxright:testShow}">
        <h2>查企业</h2>
        <p>
        支持快速查询企业相关工商信息</br>
        搜索竞争对手企业已获得资助及立项信息</br>
        </p>
      </div> -->
      
   </div>

 <div style=" background-color: #f8f9fb;">
      <div class="featurbox onefea foufa" ref="four">   
       <div class="feattitle feattitleft" :class="{test:true,testenter:testShow1}">
        <h2>智能匹配</h2>
        <p>
        人工智能+3000多种智能算法</br>
        为您进行全方位智能精准匹配，匹配出所有可申报</br>
        的政策，并进行实时推送，避免可申报的项目遗漏
        </p>
   
      </div>
      <div class="featimg featimgright" :class="{test:true,oneboxright:testShow1}">
        <img src="@/assets/newindex/featuone3.png" alt="">
      </div>
     
    </div>
</div>

   <div class="featurbox onefea threebox"  ref="five">
     <div>
      <div class="featimg" :class="{test:true,testenter:testShow2}">
        <img src="@/assets/newindex/featuone4.png" alt="">
      </div>
      <div class="feattitle" :class="{test:true,oneboxright:testShow2}">
        <h2>项目规划</h2>
        <p>
        项目规划</br>
       通过多维度分析，让企业及早知道近两年有哪些政策可</br>
        申报，提前准备，公司发展有规划有目标
        </p>
      </div>
      </div>
    </div>

<div style=" background-color: #f8f9fb;">
       <div class="featurbox onefea sixfea" ref="six">   
       <div class="feattitle feattitleft" :class="{test:true,testenter:testShow3}">
        <h2>智能推送</h2>
        <p>
        实时推送企业已订阅的相关政策内容，</br>
        包含项目申报通知、公示名单、立项</br>
        目及截至时间、支持企业已申报项目</br>
        进度的实时推送
        </p>
   
      </div>
      <div class="featimg featimgright"  :class="{test:true,oneboxright:testShow3}">
        <img src="@/assets/newindex/featuone5.png" alt="">
      </div>
     
    </div>
</div>
     <div class="featurbox onefea threebox" ref="seven">
     <div>
      <div class="featimg" :class="{test:true,testenter:testShow4}">
        <img src="@/assets/newindex/featuone6.png" alt="">
      </div>
      <div class="feattitle" :class="{test:true,oneboxright:testShow4}">
        <h2>数据图谱</h2>
        <p>
        通过多维度分析，以数据可视化形式展现。让企业一目</br>
        了然各地区政策数据及走势
        </p>
      </div>
      </div>
    </div>

<div style=" background-color: #f8f9fb;">
      <div class="featurbox onefea eightfea" ref="eight">   
       <div class="feattitle feattitleft" :class="{test:true,testenter:testShow5}">
        <h2>高新评分</h2>
        <p>
        模拟国家高新技术企业评分规则，综合历年数据</br>
        分析让企业申报高新更有把握</br>
        </p>
   
      </div>
      <div class="featimg featimgright" :class="{test:true,oneboxright:testShow5}">
        <img src="@/assets/newindex/featuone7.png" alt="">
      </div>
     
    </div>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      currentScroll: 0,
      testShow: false,
      testShow1: false,
      testShow2: false,
      testShow3: false,
      testShow4: false,
      testShow5: false,
    };
  },
  mounted() {},
  created() {},
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  activated() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.testShow = false;
    this.testShow1 = false;
    this.testShow2 = false;
    this.testShow3 = false;
    this.testShow4 = false;
    this.testShow5 = false;
  },
  methods: {
    handleScroll() {
      // console.log(window.pageYOffset, "111");
      // console.log(this.$refs.three.offsetTop);
      // console.log(this.currentScroll > this.$refs.testref.offsetTop-800);
      this.currentScroll = window.pageYOffset;
      console.log(this.currentScroll > this.$refs.five.offsetTop - 1500);
      if (this.currentScroll >= this.$refs.three.offsetTop - 800) {
        //当前滚动位置到达testref的时候，显示div（100作为调整用）
        this.testShow = true;
      }
      if (this.currentScroll >= this.$refs.four.offsetTop - 800) {
        this.testShow1 = true;
      }
      if (this.currentScroll >= this.$refs.five.offsetTop - 600) {
        this.testShow2 = true;
      }
      if (this.currentScroll >= this.$refs.six.offsetTop - 600) {
        this.testShow3 = true;
      }
      if (this.currentScroll >= this.$refs.seven.offsetTop - 600) {
        this.testShow4 = true;
        this.testShow5 = true;

      }
      if (this.currentScroll >= this.$refs.eight.offsetTop - 600) {
      }
    },
  },
};
</script>

<style lang="less" scoped>
.features {
  min-width: 1566px;
  max-width: 1920px;
}
.featurbox {
  width: 1200px;
  height: 580px;
  margin: 0 auto;
}
.onefea {
  // margin-top: 70px;
  .featimg {
    float: left;
    margin-top: 100px;
    width: 674px;
    height: 374px;
    // padding-right: 50px;
    margin-left: -20px;
    margin-right: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .feattitle {
    margin-top: 150px;
    margin-left: 15px;
    float: left;

    h2 {
      margin-top: 48px;
      color: #333;
      font-size: 40px;
      margin-bottom: 30px;
    }
    p {
      color: #333;
      font-size: 18px;
      line-height: 35px;
    }
  }
  .feattitleft {
    margin-left: 0px;
  }
  .featimgright {
    float: right !important;
  }
}
.test {
  transform: translateX(-40%); //滚动前的位置
  opacity: 0;
}
.testenter {
  transform: translateX(0%) !important; //滚动后的位置
  opacity: 1 !important; //滚动后显现
  transition: all 0.7s ease;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-40%);
  }
  // 	50% {
  // 	opacity: 0.5;
  // 	transform:translateX(-20%);
  // }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(40%);
  }
  // 50% {
  // 	opacity: 0.5;
  // 	transform:translateX(20%);
  // }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRighttest {
  0% {
    // opacity: 0;
    transform: translateX(0);
  }
  100% {
    // opacity: 0;
    display: none;
    transform: translateX(200%);
  }
}

.dobghua1 {
  transform: translateX(0);
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff !important;

  // z-index: 100;
}
.dobghua2 {
  animation: fadeInRighttest 5s 1;
  transform: translateX(200%);
}

.onebox {
  animation: fadeInLeft 1s 1;
}
.oneboxright {
  opacity: 1 !important; //滚动后显现
  animation: fadeInRight 1s 1;
  transform: translateX(0);
}
.margintop {
  margin-top: 70px;
}
.twofra {
  .featimg {
    width: 552px;
    height: 393px;
    margin-right: 90px !important;
  }
  .feattitle {
    margin-top: 150px;
    margin-left: 0px;
    float: left;
  }
}

.threefra {
  .featimg {
    width: 674px;
    height: 378px;
    margin-right: 50px !important;
    z-index: 1;
  }
  .feattitle {
    margin-top: 150px;
    margin-left: 65px;
    float: left;
    z-index: 1;
  }
}

  .foufa {
    .featimg {
      width: 674px;
      height: 322px !important;
      margin-right: 45px !important;
    }
    .feattitle {
      margin-top: 130px;
      margin-left: 0px;
      float: left;
    }
  }

  .sixfea {
    .featimg {
      width: 648px;
      height: 355px;
      margin-right: 45px !important;
    }
    .feattitle {
      margin-top: 110px;
      margin-left: 0px;
      float: left;
    }
  }

   .eightfea{
    .featimg {
      width: 585px;
      height: 445px;
      margin-right: 45px !important;
    }
    .feattitle {
      margin-top: 200px;
      margin-left: 0px;
      float: left;
    }
  }
</style>
