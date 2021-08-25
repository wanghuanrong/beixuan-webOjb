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
          default-active="/backhome/serviceshop/serviceshop"
        >
          <!-- 第一个导航栏 -->
          <el-menu-item index="/backhome/serviceshop/serviceshop">
            <i class="el-icon-s-finance" style="color: #000">企业服务商城</i>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- //侧边导航栏 -->

      <!-- main主体 -->
      <el-main ref="shopMain">
        <keep-alive include="serviceshop">
          <router-view ref="shop" @srcoll="srcoll"></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {},
  methods: {
    srcoll() {
      this.$emit("srcoll");
    },
  },
};
</script>
 
<style lang="less" scoped>
.el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.aside {
  .el-menu-item {
    i {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 21px;
      color: #333333;
    }
  }
}
.el-menu {
  text-align: left;
  position: absolute;
  width: 230px;
  border: 0;
}
.card {
  width: 100%;
  margin: 30px;
  box-shadow: 0 0px 15px 0 #d7dade;
}

.el-main {
  // overflow: visible;
}

/deep/.el-menu-item.is-active {
  color: #0453fa !important;
  .el-icon-s-finance {
  color: #0453fa !important;
  }
}

/* 导航栏样式 */
.el-menu-item.is-active {
  background: #eff4ff !important;
  border-right: 4px solid #0052ff;
}
</style>