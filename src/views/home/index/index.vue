<template>
  <div class="index" id="indexRef">
    <!-- 轮播图 -->
    <div class="block" id="block">
      <el-carousel height="750px" :interval="3000">
        <el-carousel-item>
          <div class="block_1">
            <div class="block_1_box">
              <div class="left">
                <div class="leftone">专业的一站式政策管理系统</div>
                <div class="lefttwo">用大数据助力企业提升资金项目申报效率</div>
                <div class="registered" @click="registerShow" @click.stop>
                  体验demo
                </div>
              </div>
              <div class="right">
                <div class="smallImg"></div>
                <div class="bigImg"></div>
              </div>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="block_2">
            <div class="one">乘政策东风助企业发展</div>
            <div class="two">打造“政策服务链闭环”接通政策落地“最后一公里”</div>
            <div class="registered" @click="registerShow" @click.stop>
              一分钟了解
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 核心模块 -->
    <div class="model_1">
      <div class="mainTitle">
        <div class="title1">核心功能</div>
        <div class="title2">帮助企业实现政策数据闭环，提升项目申请效率</div>
      </div>
      <div class="content">
        <div class="itemBox" v-for="(item, index) in hxList" :key="index">
          <div class="item">
            <div
              class="img"
              :style="
                'background-image:url(' +
                require('@/assets/index/' + item.img) +
                ')'
              "
            ></div>
            <div class="bigTitle">{{ item.bigTitle }}</div>
            <div class="smallTitle">{{ item.smallTitle }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 解决痛点 -->
    <div class="model_2">
      <div class="mainTitle">
        <div class="title1">解决痛点</div>
        <div class="title2">大数据政策云平台可以帮助您</div>
      </div>
      <div class="centent">
        <div class="itemBox" v-for="(item, index) in tdList" :key="index">
          <div class="item">
            <div
              class="img"
              :style="
                'background-image: url(' +
                require('@/assets/index/' + item.img) +
                ')'
              "
            ></div>
            <div class="bigTitle">{{ item.bigTitle }}</div>
            <div class="smallTitle">{{ item.smallTitle }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 选择我们 -->
    <div class="model_3">
      <div class="mainTitle">
        <div class="title1">选择我们</div>
        <div class="title2">策千里智能政策解决方案，用大数据+AI为企业赋能</div>
      </div>
      <div class="centent">
        <div class="itemBox" v-for="(item, index) in xzList" :key="index">
          <div class="item">
            <div
              class="img"
              :style="
                'background-image: url(' +
                require('@/assets/index/' + item.img) +
                ')'
              "
            ></div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  created() {},
  mounted() {},
  data() {
    return {
      hxList: [
        {
          bigTitle: "政策查询",
          smallTitle: "实时整合海量政策告别人工寻找",
          img: "hxImg_1.png",
        },
        {
          bigTitle: "知识产权查询",
          smallTitle: "自动更新企业知识产权清单支持一键导出",
          img: "hxImg_2.png",
        },
        {
          bigTitle: "查企业",
          smallTitle: "搜索相关企业已获得资助及企业信息",
          img: "hxImg_3.png",
        },
        {
          bigTitle: "智能匹配",
          smallTitle: "多层级筛选及N+智能算法为企业精准匹配政策",
          img: "hxImg_4.png",
        },
        {
          bigTitle: "项目规划",
          smallTitle: "多维度分析为企业规划年度最优方案",
          img: "hxImg_5.png",
        },
        {
          bigTitle: "智能推送",
          smallTitle: "实时推送相关政策获取最新政策数据",
          img: "hxImg_6.png",
        },
        {
          bigTitle: "数据图谱",
          smallTitle: "政策数据可视化告别人工统计",
          img: "hxImg_7.png",
        },
        {
          bigTitle: "高新评分",
          smallTitle: "精准算法规则、让企业申报高新更简单",
          img: "hxImg_8.png",
        },
      ],
      tdList: [
        {
          bigTitle: "快速查询目标政策",
          smallTitle:
            "策千里数据库涵盖全国各省市部委近5年所有政策数据，并持续保持数据实时更新，且拥有强大的搜索引擎，支持搜索及多种条件筛选，为您快速找到目标政策。",
          img: "tdImg_1.png",
        },
        {
          bigTitle: "精准匹配政策",
          smallTitle:
            "人工智能+3000多种智能算法，为您进行全方位智能精准匹配，匹配出所有可申报的政策，并进行实时推送，避免可申报的项目遗漏。",
          img: "tdImg_2.png",
        },
        {
          bigTitle: "1V1全流程辅助申报",
          smallTitle:
            "深政通拥有行业内顶尖专业分析师，在企业项目申报过程中，全流程进行辅导，以保证项目的高通过率。",
          img: "tdImg_3.png",
        },
      ],
      xzList: [
        { title: "专业的团队", img: "xzImg_1.png" },
        { title: "精准的系统", img: "xzImg_2.png" },
        { title: "全流程服务", img: "xzImg_3.png" },
      ],
    };
  },
  methods: {
    registerShow() {
      this.$emit('registerShow');
    },
  },
};
</script>

<style lang="less" scoped>
// 轮播图
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.block {
  // 第一张图
  .block_1 {
    background-color: #2266dc;
    height: 100%;
    overflow: hidden;
    .block_1_box {
      width: 1200px;
      height: 500px;
      margin: 125px auto 0;

      display: flex;
      .left {
        flex: 1;
        .leftone {
          width: 350px;
          height: 146px;
          font-size: 40px;
          font-family: Source Han Sans CN;
          line-height: 70px;
          color: #ffffff;
          margin-top: 50px;
        }
        .lefttwo {
          height: 30px;
          font-size: 25px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          margin-top: 45px;
        }
        .registered {
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
      .right {
        flex: 1;
        position: relative;
        .smallImg {
          width: 160px;
          height: 160px;
          background-image: url("../../../assets/index/smallImg.png");
          background-size: 100% 100%;
          position: absolute;
          bottom: 100px;
        }

        .bigImg {
          width: 500px;
          height: 400px;
          background-image: url("../../../assets/index/bigImg.png");
          background-size: 100% 100%;
          position: absolute;
          bottom: 60px;
          left: 70px;
        }
      }
    }
  }

  // 第二张图
  .block_2 {
    background-image: linear-gradient(#456bff, #b3c7ff);
    height: 100%;
    overflow: hidden;
    .one {
      font-size: 40px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      margin: 175px auto 0;
      text-align: center;
    }
    .two {
      font-size: 30px;
      font-family: Source Han Sans CN;
      color: #ffffff;
      margin: 55px auto 0;
      text-align: center;
    }
    .registered {
      width: 120px;
      height: 40px;
      line-height: 40px;
      background-image: linear-gradient(to right, #ff6541, #ff9580);
      text-align: center;
      border-radius: 50px;
      cursor: pointer;
      color: #ffffff;
      margin: 150px auto 0;
      text-align: center;
      transition: box-shadow 0.5s;
      &:hover {
        box-shadow: 0px 12px 22px -4px #ff6541;
      }
    }
  }
}

// 轮播图Item
/deep/ .el-carousel__button {
  width: 7px;
  height: 7px;
  border-radius: 3px;
}
/deep/ .el-carousel__indicator.is-active button {
  width: 20px;
  height: 7px;
  border-radius: 3px;
}

/deep/ .el-carousel__indicators--horizontal {
  bottom: 30px;
}

// 核心功能
.model_1 {
  overflow: hidden;
  padding: 50px 0 0 0;
  .content {
    width: 1200px;
    margin: 70px auto 0;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .itemBox {
      width: 25%;
      height: 300px;

      .item {
        width: 150px;
        height: 100%;
        margin: auto;
        .img {
          width: 100px;
          height: 100px;
          margin: auto;
          background-size: 100% 100%;
        }
        .bigTitle {
          height: 30px;
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #333333;
          text-align: center;
          margin: 30px 0 10px 0;
        }
        .smallTitle {
          font-size: 13px;
          font-family: Source Han Sans CN;
          line-height: 30px;
          color: #333333;
          text-align: center;
        }
      }
    }
  }
}

// 解决痛点
.model_2 {
  width: 100%;
  background-color: #f8f9fb;
  padding: 70px 0;
  .centent {
    width: 1000px;
    margin: 70px auto 0;
    display: flex;
    justify-content: space-between;
    .itemBox {
      overflow: hidden;
      width: 300px;
      height: 500px;
      background: #ffffff;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
      opacity: 1;
      border-radius: 8px;
      .item {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .img {
          width: 260px;
          height: 200px;
          margin: 20px auto 0;
          background-size: 100% 100%;
          transform-origin: center;
          transition: 0.5s all linear;
          &:hover{
            transform: scale(1.1);
          }
        }
        .bigTitle {
          height: 30px;
          font-size: 22px;
          font-family: Source Han Sans CN;
          font-weight: 600;
          color: #333333;
          text-align: center;
          margin: 45px 0 20px 0;
        }
        .smallTitle {
          width: 220px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          line-height: 30px;
          color: #333333;
          margin: auto;
        }
      }
    }
  }
}

// 选择我们
.model_3 {
  width: 100%;
  padding: 60px 0;
  .centent {
    width: 1000px;
    margin: 70px auto;
    display: flex;
    justify-content: space-between;
    .itemBox {
      width: 250px;
      height: 250px;
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
      border-radius: 10px;
      .item {
        margin: 30px 70px;
        .img {
          width: 100%;
          height: 110px;
          background-size: 100% 100%;
        }
        .title {
          font-size: 18px;
          font-family: Source Han Sans CN;
          color: #333333;
          margin-top: 50px;
          text-align: center;
        }
      }
    }
  }
}

// 所有模块的标题
.mainTitle {
  .title1 {
    height: 40px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #333333;
    text-align: center;
  }
  .title2 {
    height: 20px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    color: #666666;
    text-align: center;
    margin-top: 30px;
  }
}
</style>