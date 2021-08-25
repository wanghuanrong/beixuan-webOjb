<template>
  <div class="policymain">
    <el-container>
      <!-- 侧边导航栏 -->
      <el-aside width="230px" class="aside">
        <el-menu
          text-color="#fff"
          active-text-color="#fff"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <el-menu-item
            :index="item.routerId"
            @click="routerIndexClick(item.routerId)"
            v-for="(item, index) in frameList"
            :key="index"
          >
            <i :class="item.iconfontId" class="icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- //侧边导航栏 -->

      <!-- main主体 -->
      <el-main ref="policyRef">
        <keep-alive include="pubilclecture,government">
          <router-view @srcoll="srcoll" @pathClick="pathClick" ref="view" v-if="echartsShow"></router-view>
        </keep-alive>
      </el-main>
      <!-- //main主体 -->
    </el-container>
  </div>
</template>

<script>
import { getMatchDefault } from "@/utils/match.js";

import LoginVue from "../../Login.vue";
export default {
  // name:"governments",
  data() {
    return {
      activePath: "",
      frameList: [
        {
          routerId: "/backhome/policymanage/government",
          iconfontId: "el-icon-s-order",
          title: "政策查询",
        },
        {
          routerId: "/backhome/policymanage/rematching",
          iconfontId: "el-icon-s-cooperation",
          title: "智能匹配",
        },
        {
          routerId: "/backhome/policymanage/record",
          iconfontId: "el-icon-s-claim",
          title: "匹配记录",
        },
        {
          routerId: "/backhome/policymanage/aipush",
          iconfontId: "el-icon-message-solid",
          title: "智能推送",
        },
        {
          routerId: "/backhome/policymanage/datatlas",
          iconfontId: "el-icon-s-data",
          title: "数据图谱",
        },
        {
          routerId: "/backhome/policymanage/score",
          iconfontId: "el-icon-star-on",
          title: "高新评分",
        },
        {
          routerId: "/backhome/policymanage/publiclecture",
          iconfontId: "el-icon-s-grid",
          title: "政策宣讲会预约",
        },
        {
          routerId: "/backhome/policymanage/estimate",
          iconfontId: "el-icon-s-marketing",
          title: "项目预估",
        },
      ],

      echartsWidth: true,
      echartsShow: true,
      userInfo: {},
     
    };
  },
  created() {
    // this.activePath = sessionStorage.getItem("childActivePath");
  },
  mounted() {
    if (sessionStorage.getItem("childActivePath")) {
      this.activePath = sessionStorage.getItem("childActivePath");
    } else {
      this.activePath = "/backhome/policymanage/government";
    }
  },
  methods: {
      
    srcoll(){
      console.log('x2')
      this.$emit("srcoll");
    },
    locationBtn() {
      // location.reload();
    },
    // 路由导航判断是否前往确认主题页面
    rematching() {
      const local = JSON.parse(localStorage.getItem("userInfo"));
      const keyword = local.companyName;
      // 查询工商信息
      getMatchDefault(keyword).then((res) => {
        localStorage.setItem("KEYNO", res.data.keyNo);
        // this.$store.commit("getcompalyList", res.data);
        localStorage.setItem("ADDRESS", res.data.address);
        localStorage.setItem("DATETIME", res.data.startDate);

        this.$router.push("rematching");
      });
    },
    // 监听路由函数
    routerIndexClick(routerId) {
      this.$emit("srcoll");
      sessionStorage.setItem("childActivePath", routerId);
      console.log(routerId);
      if (routerId == "/backhome/policymanage/rematching") {
        this.rematching();
      }
    },

    pathClick(){
      sessionStorage.setItem("childActivePath", '/backhome/policymanage/estimate');
      this.activePath = '/backhome/policymanage/estimate';
      this.$emit("pathClick", '/backhome/policymanage');
    }
  },
  watch: {
    echartsWidth() {
      // 如果这个子组件是echarts，这重新加载该组件
      if (this.$refs.view.$el.id == "datatlas") {
        this.echartsShow = false;
        this.$nextTick(() => (this.echartsShow = true));
      }
    },
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("准备进入路由模板");
    next();
  },

};
</script>

<style lang="less" scoped>
.el-header {
  // background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.aside {
  top: 100px;
  .el-menu-item {
    color: black !important;
    font-size: 15px;
    i {
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 21px;
      color: #333;
      // color: #333333 !important;
      /deep/i:active {
        color: #0453fa !important;
      }
    }
  }
}
.el-menu {
  width: 230px;
  position: absolute;
  // left: 90;
  // top: 90;
  text-align: left;
  border: 0;
}
.card {
  width: 100%;
  margin: 30px;
  // padding: 30px!important;
  // border: 1px solid #d7dade;
  box-shadow: 0 0px 15px 0 #d7dade;
}
// 点击切换颜色
/deep/.el-menu-item.is-active {
  color: #0453fa !important;
  .el-icon-s-order,
  .el-icon-s-cooperation,
  .el-icon-s-claim,
  .el-icon-message-solid,
  .el-icon-s-data,
  .el-icon-star-on,
  .el-icon-s-grid,
  .el-icon-s-marketing {
    color: #0453fa !important;
  }
}

.el-main {
  text-align: left;
  line-height: 0;
  // overflow: hidden;
}

/* 导航栏样式 */
.el-menu-item.is-active {
  background: #eff4ff !important;
  border-right: 4px solid #0052ff;
}
.icon {
  color: #333 !important;
}

.el-card{
  overflow: auto !important;
}
</style>
