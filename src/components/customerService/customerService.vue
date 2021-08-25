<template>
  <div class="customerService">
    <div class="main">
      <!-- 内容 -->
      <div class="content">
        <!-- 聊天 -->
        <div class="chatBox" v-if="modelIndex == 1">
          <div class="head">
            <div></div>
            <div></div>
          </div>
          <div class="mainBox"></div>
          <div class="fz">
              <div class="tq"></div>
              <div class="tp"></div>
          </div>
          <div class="mainInput"></div>
          <div class="btnBox">
            <div class="btn">发送</div>
          </div>
        </div>

        <!-- 电话 -->
        <div class="phoneBox" v-if="modelIndex == 2">0755-27905047</div>

        <!-- 二维码 -->
        <div class="erweima" v-if="modelIndex == 3"></div>
      </div>

      <!-- 悬浮框 -->
      <div class="advisory">
        <div class="one" @click="zxzxClick">
          <div class="btnBox">
            <div class="img"></div>
            <div class="title">在线咨询</div>
          </div>
        </div>
        <div class="two">
          <div class="btnBox" @click="dhzxClick">
            <div class="img"></div>
            <div class="title">电话咨询</div>
          </div>
        </div>
        <div class="three">
          <div class="btnBox" @click="gzwxClick">
            <div class="img"></div>
            <div class="title">关注微信</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      modelIndex: 0,
    };
  },
  methods: {
    zxzxClick() {
      this.modelIndex = 1;
    },
    dhzxClick() {
      this.modelIndex = 2;
    },
    gzwxClick() {
      this.modelIndex = 3;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  display: flex;

  .content {
    margin-right: 10px;
    // 咨询
    .chatBox {
      width: 380px;
      height: 520px;
      border-radius: 20px;
      background-color: white;
      overflow: hidden;

      .head {
        height: 55px;
        width: 100%;
        background-color: #256bff;
      }

      .mainBox {
        height: 300px;
        width: 100%;
        background-color: #ededed;
      }

      .fz{
          height: 40px;
          width: 100%;
          display: flex;
          align-items: center;
          .tq{
              width: 25px;
              height: 25px;
              margin-left: 10px;
              background: url('../../assets/KF/bq.png') no-repeat center center;
              cursor: pointer;
          }

          .tp{
              width: 25px;
              height: 25px;
              margin-left: 10px;
              background: url('../../assets/KF/tp.png') no-repeat center center;
              cursor: pointer;
          }
      }

      .mainInput {
        height: 80px;
        width: 100%;
        background-color: white;
      }

      .btnBox {
        height: 40px;
        width: 100%;
        background-color: white;
        .btn {
          height: 25px;
          width: 50px;
          border: 1px solid #ccc;
          border-radius: 2px;
          float: right;
          margin: 5px 15px 0 0;
          font-size: 14px;
          text-align: center;
          line-height: 25px;
          cursor: pointer;
        }
      }
    }

    // 电话
    .phoneBox {
      width: 150px;
      height: 50px;
      border-radius: 10px;
      background-color: white;
      text-align: center;
      line-height: 50px;
      box-shadow: -1px 0px 20px #a5a4a4ab;
    }

    // 二维码
    .erweima {
      width: 150px;
      height: 180px;
      background-image: url("../../assets/KF/ewm.png");
      background-size: 100% 100%;
    }
  }

  .advisory {
    width: 180px;
    height: 180px;
    background-color: white;
    box-shadow: -1px 0px 20px #a5a4a4ab;
    border-radius: 5px;

    > div {
      height: 60px;
      width: 100%;
      font-size: 16px;
      font-family: Microsoft YaHei;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      .btnBox {
        width: 160px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        border: 1px solid #256bff;
        cursor: pointer;

        display: flex;
        align-items: center;
        .img {
          width: 30px;
          height: 30px;
          margin: 0 15px 0 25px;
        }
      }
    }

    .one {
      height: 50px;
      background-color: #256bff;
      color: white;
      font-weight: 600;
      .img {
        background: url("../../assets/KF/kf.png") no-repeat center center;
      }
    }

    .two {
      .img {
        background: url("../../assets/KF/dh.png") no-repeat center center;
      }
    }

    .three {
      .img {
        background: url("../../assets/KF/wx.png") no-repeat center center;
      }
    }
  }
}
</style>