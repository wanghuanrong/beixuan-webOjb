<template>
  <div class="homeMain" id="homeMain" ref="homeMain">
    <!-- 导航栏 -->
    <div class="navBar" :class="{ navBarbg: navBarIs }">
      <div class="navBarMain">
        <!-- logo -->
        <div class="logo"></div>

        <!-- 路由点击列表 -->
        <div class="routerList" ref="routerList">
          <ul>
            <li
              v-for="(item, index) in routerList"
              :key="index"
              @click="routerListClick(item.src, index)"
              :class="{ routerStyle: routerIndex == index }"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>

        <!-- 登录注册 -->
        <div class="login_box">
          <div
            class="login"
            :style="{ color: navBarIs ? 'black' : 'white' }"
            @click="loginBtn"
          >
            登录
          </div>
          <div class="registered" @click="registerShow" @click.stop>
            体验demo
          </div>
        </div>
      </div>

      <!-- 注册模块 -->
      <div class="regBox" v-if="registerModelIf">
        <register
          :clearIs="clearIs"
          @clearReg="clearReg"
        ></register>
      </div>
    </div>

    <!-- 主体区 -->
    <el-main>
      <!-- registerShow用来改变注册框的显示、隐藏 -->
      <keep-alive>
        <router-view ref="mainBox" @registerShow="registerShow"></router-view>
      </keep-alive>
    </el-main>

    <!-- 客服悬浮窗 -->
    <div class="advisoryBox"></div>

    <!-- 底部导航栏 -->
    <footer>
      <div class="itemBox">
        <div class="item">
          <div class="left">
            <div class="logImg"></div>
            <div class="gsInfo">
              <ul>
                <li>深圳市特兹信息技术有限公司</li>
                <li>电话：0755-27905047</li>
                <li>邮箱：tezidata@163.com</li>
                <li>地址: 深圳市宝安区宝安大道4018号华丰国际商务大厦4楼3A09</li>
              </ul>
            </div>
            <div class="gsbah">
              备案号：粤ICP备15011227号-1 版权所有：深圳市特兹信息技术有限公司
            </div>
          </div>
          <div class="right" v-if="false">
            <div class="erweima"></div>
            <div class="ewmts">扫码关注公众号</div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// import { getData } from "@/utils/register";
import register from "@/components/register/register";
import customerService from "@/components/customerService/customerService";
export default {
  name: "home",

  created() {
    const routePath = this.$route.path;
    switch (routePath) {
      case "/home/index":
        this.routerIndex = 0;
        break;
      case "/home/features":
        this.routerIndex = 1;
        break;
      case "/home/price":
        this.routerIndex = 2;
        break;
      case "/home/case":
        this.routerIndex = 3;
        break;
      case "/home/advisory":
        this.routerIndex = 4;
        break;
      case "/home/detailsnew":
        this.routerIndex = 4;
        break;
      case "/home/about":
        this.routerIndex = 5;
        break;
    }
  },
  mounted() {
    // 全局点击事件，点击除注册模块以为的地方，隐藏
    document.addEventListener("click", (e) => {
      this.registerModelIf = false;
    });

    if (this.$route.path.indexOf("index") == -1) {
      this.navBarIs = true;
    }
    window.addEventListener("scroll", this.Scroll);

    // 聊天
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?a3f07ff83b66c0cabc08b4c20f3f789e";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },
  data() {
    return {
      navBarIs: false,
      routerList: [
        { src: "/index", name: "首页" },
        { src: "/features", name: "功能" },
        { src: "/price", name: "价格" },
        { src: "/case", name: "案例" },
        { src: "/advisory", name: "咨讯" },
        { src: "/about", name: "关于" },
      ],
      productMargin: 0,
      routerIndex: 0,

      registerModelIf: false,
      productChildIf: false,

      // 注册的X
      clearIs: true,
    };
  },
  components: {
    register,
    customerService,
  },
  methods: {
    Scroll() {
      if (this.$route.path.indexOf("index") != -1) {
        let Top =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (Top != 0) {
          this.navBarIs = true;
        } else {
          this.navBarIs = false;
        }
      }
    },
    // 点击列表跳转router
    routerListClick(src, index) {
      this.$router.push("/home" + src);
      this.routerIndex = index;
    },
    // 注册按钮点击事件，显示或隐藏注册模块
    registerShow() {
      this.registerModelIf = true;
      // window.scrollTo(0, 0);
    },
    clearReg() {
      this.registerModelIf = false;
    },
    // 隐藏
    leave() {
      this.productChildIf = false;
    },
    //显示
    productEnter() {
      this.productChildIf = true;
    },
    loginBtn() {
      window.open("/login");
    },
  },
  watch: {
    $route(to, from) {
      this.navBarIs = true;
      if (to.fullPath.indexOf("index") != -1) {
        this.Scroll();
      }
    },
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: #fff;
}
.el-main {
  padding: 0;
  overflow: hidden;
}

.homeMain {
  width: 100%;
  min-width: 1566px;
  max-width: 1920px;
  margin: 0 auto;
}

// 滚动条为0时的样式
.navBar {
  min-width: 1566px;
  width: 100%;
  height: 70px;
  // background-image: linear-gradient(#3961ff, #4369ff);
  position: fixed;
  left: 0;
  z-index: 9999;
  .navBarMain {
    width: 1200px;
    height: 70px;
    margin: 0 auto;

    // logo
    .logo {
      float: left;
      width: 85px;
      height: 40px;
      margin: 15px 0 0 0;
      background-image: url("../assets/index/w_logo.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }

    // router点击跳转的列表
    .routerList {
      float: left;
      margin: 15px 50px 0 220px;
      position: relative;

      ul li {
        float: left;
        color: white;
        cursor: pointer;
        margin-left: 40px;
        height: 40px;
        line-height: 40px;
      }
      .routerStyle {
        border-bottom: 2px solid white;
      }
    }
  }
}

// 滚动条不为0时的样式
.navBarbg {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px 0px #0000000f;
  .logo {
    background-image: url("../assets/index/b_logo.png") !important;
  }

  // router点击跳转的列表
  .routerList {
    ul li {
      color: black !important;
    }
    .routerStyle {
      color: #256bff !important;
      border-bottom: 2px solid #256bff !important;
    }
  }
}

.login_box {
  width: 200px;
  height: 70px;
  float: right;
  // margin-right: 60px;
  color: white;
  display: flex;
  align-items: center;
  .login {
    width: 45px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }

  .registered {
    width: 100px;
    height: 33px;
    line-height: 33px;
    background-image: linear-gradient(to right, #ff6541, #ff9580);
    text-align: center;
    border-radius: 50px;
    margin-left: 40px;
    font-size: 14px;
    cursor: pointer;
  }
}

// 注册模块
.regBox{
  box-shadow: 0px 0px 20px 0px #00000069;
  width: 700px;
  height: 550px;
  position: absolute;
  right: calc(50% - 350px);
  top: 100px;
}

// 底部
.itemBox {
  width: 100%;
  height: 230px;
  background-color: #f2f8ff;
  .item {
    width: 1200px;
    height: 100%;
    margin: auto;
    display: flex;
    .left {
      // width: 1100px;
      flex: 1;
      .logImg {
        margin-top: 20px;
        width: 85px;
        height: 40px;
        background-image: url("../assets/index/b_logo.png");
        background-size: 100% 100%;
      }

      .gsInfo {
        ul li {
          font-size: 13px;
          margin-top: 10px;
        }
      }

      .gsbah {
        font-size: 13px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 20px;
        color: #999999;
        margin-top: 10px;
      }
    }

    .right {
      .erweima {
        width: 130px;
        height: 130px;
        margin-top: 30px;
        background-image: url("../assets/index/erweima.png");
        background-size: 100% 100%;
      }
      .ewmts {
        font-size: 12px;
        color: #666666;
        text-align: center;
        margin: 20px;
      }
    }
  }
}
</style>