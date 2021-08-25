<template>
  <div class="backStageMain">
    <el-container>
      <!-- 侧边栏导航-->
      <el-aside :width="active ? '70px' : '210px'">
        <div class="toggle-button" @click="toggelCollapse">
          <i class="el-icon-s-operation"></i>
        </div>
        <el-menu
          text-color="#fff"
          active-text-color="#fff"
          :collapse-transition="false"
          :router="true"
          :collapse="active"
          :unique-opened="true"
          :default-active="activePath"
        >
          <el-menu-item
            :index="item.routerId"
            @click="routerIndexClick(item.routerId)"
            v-for="(item, index) in frameList"
            :key="index"
          >
            <i :class="item.iconfontId"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>

          <!-- 侧边栏导航-->
        </el-menu>
      </el-aside>
      <!-- //侧边栏导航-->

      <!-- 头部导航栏 -->
      <el-container>
        <el-header>
          <div class="blacklogo">
            <img src="@/assets/index/b_logo.png" alt="" />
          </div>
          <ul>
            <!-- <li class="logomenu">
              <i class="el-icon-menu">&nbsp;&nbsp;新功能</i>
            </li> -->
            <li class="logocomment" @click="infoClick()">
              <el-badge
                :value="infoTotal"
                class="item"
                :hidden="infoTotal == 0"
              >
                <i class="el-icon-s-comment">&nbsp;&nbsp;消息</i>
              </el-badge>
            </li>
            <li class="logoquestion" @click="commonClick">
              <i class="el-icon-question">&nbsp;&nbsp;帮助</i>
            </li>
            <li class="logosolid" @click="KfClick">
              <i class="el-icon-user-solid">&nbsp;&nbsp;客服</i>
            </li>
            <li class="peopo">
              <div @click.stop @click="changeShow">
                <span class="username"
                  >{{ userInfo.nickName }}&nbsp;&nbsp;</span
                >
                <div class="img">
                  <img
                    :src="require('@/assets/backlogo/header.png')"
                    alt=""
                    v-if="defaltImg"
                  />
                  <img
                    :src="$http + userInfo.avatar"
                    alt=""
                    v-if="!defaltImg"
                  />
                </div>
              </div>
              <!-- 个人信息弹窗 -->
              <div class="myBox" v-if="grzxBoxIs" @click.stop>
                <div class="hang">
                  <!-- 头像 -->
                  <div class="avatar">
                    <img
                      :src="require('@/assets/backlogo/header.png')"
                      alt=""
                      v-if="defaltImg"
                    />
                    <img
                      :src="$http + userInfo.avatar"
                      alt=""
                      v-if="!defaltImg"
                    />
                  </div>
                  <div class="myInfo">
                    <div class="name">{{ userInfo.nickName }}</div>
                    <div class="phone">{{ userInfo.username }}</div>
                  </div>
                </div>
                <div class="hang1">
                  <div class="img"></div>
                  <div class="titleName">{{ userInfo.companyName }}</div>
                </div>
                <div
                  class="hang2"
                  @click="
                    $router.push('/backhome/perCenter');
                    grzxBoxIs = false;
                  "
                >
                  <div class="img"></div>
                  <div class="titleName">个人中心</div>
                </div>
                <div class="hang3" @click="leaveHome">
                  <div class="img"></div>
                  <div class="titleName">退出账户</div>
                </div>
              </div>
            </li>
          </ul>
        </el-header>
        <!-- //头部导航栏 -->

        <!-- router路由显示区 -->
        <el-main ref="shopMainMain">
          <router-view
            ref="view"
            @srcoll="srcoll"
            @pathClick="pathClick"
            @uploadImage="uploadImage"
          ></router-view>
        </el-main>
        <!-- //router路由显示区 -->
      </el-container>
    </el-container>

    <!-- 客服弹窗 -->
    <div class="KFbigbox">
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="KFdialog"
        width="700px"
      >
        <span slot="title" class="scxm">
          <img class="txImg" src="../../../assets/KF/two/tx.png" alt="" />
          客服</span
        >

        <div class="kFdialogBox">
          <div class="head">
            <div class="kf2Img"></div>
            <div class="ts">
              <div>企业服务专家</div>
              <div>我可以<span>免费</span>为您提供服务</div>
            </div>
          </div>
          <div class="flexBox">
            <div class="flexItem" v-for="(item, index) in KfList" :key="index">
              <div
                class="img"
                :style="{
                  backgroundImage:
                    'url(' +
                    require('@/assets/KF/two/' + item.img + '.png') +
                    ')',
                }"
              ></div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
          <div class="zxBtn" @click="zxClick">
            <img src="../../../assets/KF/two/zx.png" />咨询
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 确定退出 -->
    <div class="tcBox">
      <el-dialog title="提示" :visible.sync="TCdialog" width="500px">
        <span>您确定要退出吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="TCdialog = false">取 消</el-button>
          <el-button type="primary" @click="isTcClick()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { listMessage } from "@/utils/QYcenter.js";

export default {
  created() {
    // this.gethotserch()
    this.getUserInfo();
    this.getInfoTotal();
  },
  data() {
    return {
      activePath: "",
      frameList: [
        {
          routerId: "/backhome/perCenter",
          iconfontId: "iconfont iconwangge_shouye1",
          title: "首页",
        },
        {
          routerId: "/backhome/policymanage",
          iconfontId: "iconfont iconcaidan",
          title: "政策管理",
        },
        {
          routerId: "/backhome/knowledgemanage",
          iconfontId: "iconfont iconwangge_zhishichanquanguanli",
          title: "知识产权管理系统",
        },
        {
          routerId: "/backhome/knowlibrary",
          iconfontId: "iconfont iconwangge_wenku",
          title: "文库",
        },
        {
          routerId: "/backhome/serviceshop",
          iconfontId: "iconfont iconwangge_qiyefuwushangcheng",
          title: "企业服务商城",
        },
        {
          routerId: "/backhome/companycenter",
          iconfontId: "iconfont iconwangge_qiyezhongxin",
          title: "企业中心",
        },
      ],
      // 监听页面路由
      // activePath:"",
      active: true, // 这里代表着是否显示侧边导航

      // 默认头像
      defaltImg: true,

      // 个人中心弹窗
      grzxBoxIs: false,

      token: "",

      // 退出弹窗
      TCdialog: false,

      // 未读信息
      infoTotal: 0,
      socket: "",

      userInfo: {
        nickName: "xx",
        avatar: "xx",
        username: "xx",
        companyName: "xxx",
      },

      // 客服
      KFdialog: false,
      KfList: [
        { name: "申报难度分析", img: "1" },
        { name: "申报成功率评估", img: "2" },
        { name: "企业情况评估", img: "3" },
        { name: "项目申报方案", img: "4" },
        { name: "政策解读", img: "5" },
        { name: "项目进度查询", img: "6" },
      ],
    };
  },
  mounted() {
    // this.gethotserch()
    // console.log(this.$refs.shopMainMain);
    // this.$refs.shopMainMain.scrollTop = 0;
    // 全局点击，关闭个人中心弹窗
    document.addEventListener("click", (e) => {
      this.grzxBoxIs = false;
    });

    // 初始化
    this.init();

    if (sessionStorage.getItem("activePath")) {
      this.activePath = sessionStorage.getItem("activePath");
    } else {
      this.activePath = "/backhome/perCenter";
    }
  },
  methods: {
    getUserInfo() {
      // 获取个人信息
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo);
      this.userInfo = userInfo;

      this.token = sessionStorage.getItem("token");

      // 判断是否有头像
      if (userInfo.avatar != "") {
        this.defaltImg = false;
      }
    },

    srcoll() {
      console.log("x3");
      console.log(this.$refs.shopMainMain.$el.scrollTop);
      this.$refs.shopMainMain.$el.scrollTop = 0;
      console.log(this.$refs.shopMainMain.$el.scrollTop);
      //  this.$refs.maodian.$el.scrollTop = 0;
    },
    toggelCollapse() {
      this.active = !this.active;
      this.$store.commit("getEchartsWidth");
      this.$refs.view.echartsWidth = !this.$refs.view.echartsWidth;
    },
    changeShow() {
      this.grzxBoxIs = !this.grzxBoxIs;
    },

    // 头像设置成功之后，修改外层图片
    uploadImage() {
      this.getUserInfo();
    },

    // 信息
    getInfoTotal() {
      // 获取未读信息
      listMessage("", "", 0, "").then((res) => {
        console.log(res);
        if (res.code != 200) {
          this.$message.error("获取信息数据失败！");
          return;
        }
        this.infoTotal = res.total;
      });
    },

    // 客服
    KfClick() {
      this.KFdialog = true;
    },
    zxClick() {
      window.open(
        "http://p.qiao.baidu.com/cps/chat?siteId=16768349&userId=30695872&siteToken=78c0536ea1a13298196b4c7c0640772c"
      );
    },
    // 信息点击，改变路由样式
    infoClick() {
      this.infoTotal = 0;

      sessionStorage.setItem("activePath", "/backhome/companycenter");
      sessionStorage.setItem(
        "childActivePath",
        "/backhome/companycenter/messageCenter"
      );
      this.activePath = "/backhome/companycenter";

      this.$router.push("/backhome/companycenter/messageCenter");
    },
    // 帮助点击，改变样式
    commonClick() {
      sessionStorage.setItem("activePath", "/backhome/companycenter");
      sessionStorage.setItem(
        "childActivePath",
        "/backhome/companycenter/commonProblem"
      );
      this.activePath = "/backhome/companycenter";
      this.$router.push("/backhome/companycenter/commonProblem");
    },
    // 退出
    leaveHome() {
      this.TCdialog = true;
      this.grzxBoxIs = false;
    },
    isTcClick() {
      localStorage.removeItem("userPassword");
      localStorage.removeItem("userInfo");
      sessionStorage.removeItem("token");
      this.$router.push("login");
    },
    // 监听路由函数
    routerIndexClick(routerId) {
      this.srcoll();
      this.activePath = routerId;
      sessionStorage.setItem("activePath", routerId);
      sessionStorage.removeItem("childActivePath");
    },

    // 子级路由跳转记录路由
    pathClick(val) {
      console.log(val);
      this.activePath = val;
      sessionStorage.setItem("activePath", val);
    },

    // websocket
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(
          // "ws://192.168.2.23:8080/instant/message/" + this.token
          "ws://shenzhengtong.cn:8080/instant/message/" + this.token
        );
        // this.socket.onclose = this.close;
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function () {
      console.log("socket连接成功");
    },
    error: function () {
      console.log("连接错误");
    },
    getMessage: function (msg) {
      console.log(JSON.parse(msg.data));
      // webscoket返回值为 1 代表支付成功，返回 2 表示信息发生变化
      if (JSON.parse(msg.data) == "2") {
        // console.log('xxx');
        this.getInfoTotal();
      }

      if (JSON.parse(msg.data) == "1") {
        sessionStorage.setItem("payIs", "yes");
        this.getInfoTotal();
      }
    },
    // 发送消息
    send: function () {
      this.socket.send(params);
    },
    close: function () {
      console.log("socket已经关闭");
    },
  },
  beforeDestroy() {
    console.log("xxx");
    // 销毁监听
    // this.socket.onclose = this.close;
    this.socket.close();

    sessionStorage.removeItem("activePath");
  },
};
</script>

<style lang='less' scoped>
@import url("../../../assets/css/shop.css");
.backStageMain {
  width: 100%;
  min-width: 1566px;
  // min-height: 1000px;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
}
.el-header {
  // background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 70px;
  box-shadow: 0 0px 18px 0 #d7dade;
}

.el-aside {
  z-index: 100 !important;
  // background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
  background-color: #23323d;
}

.el-main {
  // background-color: #E9EEF3;
  color: #333;
  text-align: center;
  // line-height: 160px;
  padding: 0;
}

.el-menu {
  background-color: #23323d;
  li {
    color: #fff;
  }
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-container {
  height: 100vh;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #4a5064;
}
.toggle-button {
  height: 56px;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

.el-menu {
  text-align: left;
  border: 0;
}
//当鼠标点击的时候的颜色
.el-menu-item.is-active {
  color: #0453fa !important;
  // border-right: 30px solid transparent;
  // -webkit-filter: drop-shadow(30px 0 0 #ccc);
  // filter: drop-shadow(30px 0 0 #0453fa)!important;
}
.el-menu-item {
  height: 68px;
}
.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}
.el-icon-s-operation {
  position: relative;
}
.el-icon-s-operation:before {
  margin-left: -12px;
  position: absolute;
  top: -6px;
  font-size: 25px;
  content: "\e7bb";
  left: 50%;
  content: "\e7bb";
}
.icon-home {
  img {
    // background-color: blue;
    //  color: coral;
    vertical-align: middle;
  }
  span {
    padding-left: 10px;
  }
}

.policy {
  font-size: 16px;
  font-family: Microsoft YaHei;
  // font-weight: 400;
  // line-height: 21px;
  color: #fff;
  padding-top: 15px;
  .icon-policy {
    float: left;
    display: block;
    width: 27px;
    height: 21px;
    background: url(../../../assets/backlogo/1.png);
  }
  span {
    margin-top: -17px;
    float: left;
    padding-left: 10px;
  }
  .know {
    background: url(../../../assets/backlogo/2.png) no-repeat center;
    height: 26px;
  }
  .knowtxt {
    margin-top: -14px;
  }
  .book {
    background: url(../../../assets/backlogo/3.png) no-repeat center;
  }
  .booktxt {
    margin-top: -15px;
  }
  .company {
    width: 25px;
    height: 25px;
    background: url(../../../assets/backlogo/4.png) no-repeat center;
  }
  .companycenter {
    height: 26px;
    background: url(../../../assets/backlogo/5.png) no-repeat center;
  }
  .companycentertxt {
    margin-top: -15px;
  }
}
.el-header {
  height: 70px !important;
  .blacklogo {
    float: left;
    width: 100px;
    height: 45px;
    margin-left: 43px;
    margin-top: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ul {
    height: 70px;
    float: right;
    // margin-right: 100px;
    li {
      float: left;
      margin-right: 54px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      cursor: pointer;
      // line-height: 19px;
      color: #333333;
      i {
        // padding-right: 9px;
        color: #333333;
      }
      &:last-child {
        margin-right: 20px;
        padding-bottom: 24px;
        span {
          vertical-align: middle;
        }
        img {
          width: 32px;
          height: 32px;
          vertical-align: middle;
        }
      }
    }
  }
}
.iconfont {
  font-size: 23px;
  color: #fff;
  margin-right: 10px;
}
.peopo {
  position: relative;
  .username {
    &:active .tuicuh {
      display: block;
    }
  }
  .tuichu {
    position: absolute;
    top: 43px;
    width: 60px;
    height: 50px;
    background-color: #ccc;
    // display: none;
  }

  .img {
    width: 40px;
    height: 40px;
    border: 1px solid rgb(216, 213, 213);
    border-radius: 50%;
    overflow: hidden;
    float: right;
    margin: 17px 0 0 5px;
    position: relative;
    img {
      width: 100% !important;
      height: 100% !important;
      line-height: 0;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}

.myBox {
  background-color: white;
  z-index: 99999;
  width: 350px;
  line-height: 30px;
  position: absolute;
  right: 0px;
  top: 70px;
  box-shadow: -1px -1px 20px 0px #57565654;
  // display: none;

  .hang {
    width: 100%;
    height: 80px;

    .avatar {
      float: left;
      margin: 10px 0 0 30px;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
    .myInfo {
      float: left;
      text-align: left;
      line-height: 30px;
      padding-top: 10px;
      margin-left: 20px;
      .name {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #333333;
      }
      .phone {
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 24px;
        color: #999999;
      }
    }
  }
  .hang1 {
    width: 100%;
    height: 50px;
    .img {
      width: 30px;
      height: 30px;
      float: left;
      margin: 10px 0 0 30px;
      border: none;
      background: url("../../../assets/enter/gsmc.png") no-repeat center center;
    }
    .titleName {
      line-height: 50px;
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      float: left;
      margin-left: 20px;
    }
  }
  .hang1:hover {
    background-color: rgb(233, 233, 233);
  }
  .hang2 {
    width: 100%;
    height: 50px;
    .img {
      width: 30px;
      height: 30px;
      float: left;
      margin: 10px 0 0 30px;
      border: none;
      background: url("../../../assets/enter/grzx.png") no-repeat center center;
    }
    .titleName {
      line-height: 50px;
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      float: left;
      margin-left: 20px;
    }
  }
  .hang2:hover {
    background-color: rgb(233, 233, 233);
  }
  .hang3 {
    width: 100%;
    height: 50px;
    .img {
      width: 30px;
      height: 30px;
      float: left;
      margin: 10px 0 0 30px;
      border: none;
      background: url("../../../assets/enter/tc.png") no-repeat center center;
    }
    .titleName {
      line-height: 50px;
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      float: left;
      margin-left: 20px;
    }
  }
  .hang3:hover {
    background-color: rgb(233, 233, 233);
  }
}
i:active {
  color: #0453fa !important;
}

.kFdialogBox {
  width: 100%;
  height: 500px;
  .head {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    .kf2Img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: #256bff url("../../../assets/KF/two/tx.png") no-repeat center
        center;
      background-size: 60% 60%;
      margin: 0 20px;
    }

    .ts {
      line-height: 30px;
      div:nth-child(1) {
        font-size: 18px;
        font-weight: 600;
      }
      div:nth-child(2) {
        font-size: 15px;
        span {
          color: #256bff;
        }
      }
    }
  }

  .flexBox {
    width: 100%;
    height: 300px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    .flexItem {
      margin-top: 20px;
      width: 24%;
      height: 100px;
      // border: 1px solid red;
      .img {
        width: 50px;
        height: 60px;
        background-size: 100% 100%;
        margin: 0 auto 10px;
      }

      .name {
        text-align: center;
        font-size: 16px;
      }
    }
  }

  .zxBtn {
    width: 144px;
    height: 59px;
    background: #256bff;
    border-radius: 4px;
    font-size: 22px;
    font-family: Microsoft YaHei;
    line-height: 59px;
    color: #ffffff;
    margin: 30px auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 5px;
    }
  }
}
</style>