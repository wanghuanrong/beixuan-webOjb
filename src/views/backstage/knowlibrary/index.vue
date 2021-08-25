<template>
  <div>
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
            <i :class="item.iconfontId" style="color: #000"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- //侧边导航栏 -->

      <!-- main主体 -->
      <el-card class="card">
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- //main主体 -->
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    // this.activePath = sessionStorage.getItem("childActivePath");
  },
   mounted() {
    if (sessionStorage.getItem("childActivePath")) {
      this.activePath = sessionStorage.getItem("childActivePath");
    } else {
      this.activePath = "/backhome/knowlibrary/library";
    }
  },
  data() {
    return {
      activePath: "",
      frameList: [
        {
          routerId: "/backhome/knowlibrary/library",
          iconfontId: "el-icon-s-management",
          title: "文库",
        },
        {
          routerId: "/backhome/knowlibrary/classroom",
          iconfontId: "el-icon-video-camera-solid",
          title: "云课堂",
        },
      ],
    };
  },
  methods: {
    // 监听路由函数
    routerIndexClick(routerId) {
      sessionStorage.setItem("childActivePath", routerId);
    },
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
  // padding-top: 30px;
  .el-menu-item {
    color: black !important;
    font-size: 15px;
    i {
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 21px;
      // color: #333333 !important;
    }
  }
}
.el-menu {
  width: 230px;
  position: absolute;
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
  .el-icon-s-management,.el-icon-video-camera-solid{
  color: #0453fa !important;
  }
}

.el-main {
  text-align: left;
  line-height: 0;
}

/* 导航栏样式 */
.el-menu-item.is-active {
  background: #eff4ff !important;
  border-right: 4px solid #0052ff;
}
</style>