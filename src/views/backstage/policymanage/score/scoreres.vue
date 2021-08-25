<template>
  <div id="soreinfomain">
    <el-card>
      <h3 class="titlth">高新评分结果</h3>
    </el-card>
    <el-card class="mt scoreinfo ">
      <span class="scoretitle">得分详情</span
      ><span class="zongfen"
        >总分：<i>{{ datalist.totalScore }}</i></span
      >
      <div class="maincard">
        <div class="scorecard konwscore">
          <span>知识产权</span>
          <div class="circle">
            <el-progress
              type="circle"
              :width="78"
              :percentage="datalist.propertyRightScore"
              :format="format"
            ></el-progress>
          </div>
        </div>
        <div class="scorecard sciencecore">
          <span> 科技成果转化能力 </span>
          <div class="circle">
            <el-progress
              type="circle"
              :width="78"
              :percentage="datalist.abilityScore"
              :format="format"
            ></el-progress>
          </div>
        </div>
        <div class="scorecard researchscore">
          <span> 研究开发组织管理水平 </span>
          <div class="circle">
            <el-progress
              type="circle"
              :width="78"
              :percentage="datalist.cooperationScore"
              :format="format"
            ></el-progress>
          </div>
        </div>
        <div class="scorecard growupscore">
          <span> 企业成长性 </span>
          <div class="circle">
            <el-progress
              type="circle"
              :width="78"
              :percentage="datalist.growthScore"
              :format="format"
              >adasdf</el-progress
            >
          </div>
        </div>
      </div>
      <p class="firstp">
        {{ datalist.evaluate }}
      </p>
      <p class="firstp twop">
        以上分数是测评工具和系统深度学习后计算的结果，仅供参考。
      </p>
    </el-card>
    <el-card class="mt " ref="scrollbox">
      <h5>测试反馈</h5>
      <div class="bigintime ">
        <span>一、企业成立时间</span>
        <p>{{ datalist.one }}</p>
      </div>
      <div class="bigintime">
        <span>二、企业技术领域</span>
        <p>{{ datalist.two }}</p>
      </div>
      <div class="bigintime">
        <span>三、核心自主知识产权</span>
        <p>{{ datalist.three }}</p>
      </div>
      <div class="bigintime">
        <span>四、科技人员数量</span>
        <p>{{ datalist.four }}</p>
      </div>
      <div class="bigintime bigintimeboe">
        <span>五、财务增长性</span>
        <p>{{ datalist.five_one }}</p>
        <p>{{ datalist.five_two }}</p>
        <p>{{ datalist.five_three }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: {},
    };
  },
  created() {
    this.getUserRes();
    this.listenerFunction();
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.listenerFunction);
  },
  mounted() {
    document.querySelector(".titlth").scrollIntoView();
    //  this.$nextTick(() => {
    //     let vplBox = document.querySelector(".heightcard");
    //     vplBox.scrollTop = vplBox.scrollHeight;
    //     console.log(vplBox.scrollTop, "zhe是");
    //   });
  },
  methods: {
    getUserRes() {
      this.datalist = this.$store.state.reslist;
      console.log(this.datalist);
     
    },
    listenerFunction(e) {
      document.addEventListener("scroll", this.handleScroll, true);
    },
    handleScroll() {

    },
    format(percentage){
     
         return `${percentage}分`
     
    }
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.mt {
  margin-top: 20px;
}
h3 {
  width: 132px;
  height: 29px;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 29px;
  margin: 0 auto;
  color: #333333;
}
.scoreinfo {
  height: 313px;
  span {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: #333333;
  }
  .scoretitle {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #333333;
  }
  i {
    font-style: normal;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: #256bff;
  }
  .zongfen {
    margin-left: 103px;
  }
}
.maincard {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  .scorecard {
    height: 100px;
    width: 333px;
    margin-right: 20px;
    background-color: #ccc;

    span {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 100px;
      color: #333333;
      margin-left: 20px;
    }
  }
  .konwscore {
    background-color: #ebedfc;
  }
  .sciencecore {
    background-color: #f3ecfb;
  }
  .researchscore {
    background-color: #faece7;
  }
  .growupscore {
    background-color: #e9f2fc;
  }
}
.circle {
  float: right;
  margin-top: 9px;
  margin-right: 19px;
}
.firstp {
  margin-top: 50px !important;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.twop {
  margin-top: 30px;
}
h5 {
  width: 72px;
  height: 24px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 24px;
  margin: 0 auto;
}
.bigintime {
  // height: 90px;
  margin-top: 39px;

  span {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #0052ff;
  }
  p {
    // line-height: 20px;
    margin-top: 50px;
    &:last-child {
      padding-bottom: 20px;
      border-bottom: 1px solid #e4e4e4;
    }
  }
}
.bigintimeboe {
  border: 0;
}
</style>
