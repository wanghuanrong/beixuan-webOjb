<template>
  <div class="enterprisecenter">
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
        
          <el-menu-item :index="item.routerId" @click="routerIndexClick(item.routerId)" v-for="(item, index) in frameList" :key="index">
            <i :class="item.iconfontId"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- //侧边导航栏 -->

      <!-- main主体 -->
      <el-main>
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </el-main>
      <!-- //main主体 -->
    </el-container>
  </div>
</template>

<script>
export default {
  created () {
    // this.activePath = sessionStorage.getItem('childActivePath');
  },
  mounted () {
    if (sessionStorage.getItem("childActivePath")) {
      this.activePath = sessionStorage.getItem("childActivePath");
    } else {
      this.activePath = "/backhome/companycenter/unitInfo";
    }
  },
  data () {
    return {
      activePath: '',
      frameList: [
        {
          routerId: "/backhome/companycenter/unitInfo",
          iconfontId: "iconfont iconicon_danweiziliao",
          title: "单位资料",
        },
        {
          routerId: "/backhome/companycenter/myOrder",
          iconfontId: "iconfont iconicon_wodedingdan",
          title: "我的订单",
        },                     
        {
          routerId: "/backhome/companycenter/shopCart",
          iconfontId: "iconfont iconicon_gouwuche",
          title: "购物车",
        }, 
                   
        {
          routerId: "/backhome/companycenter/commonProblem",
          iconfontId: "iconfont iconicon_changjianwenti",
          title: "常见问题",
        },
        {
          routerId: "/backhome/companycenter/messageCenter",
          iconfontId: "iconfont iconicon_xiaoxizhongxin",
          title: "消息中心",
        },
        {
          routerId: "/backhome/companycenter/account",
          iconfontId: "iconfont iconicon_zhanghuguanli",
          title: "账户管理",
        },
      ],
    }
  },
  methods: {
    // 监听路由函数
    routerIndexClick(routerId){
      // console.log(routerId);
      sessionStorage.setItem('childActivePath', routerId);
    }
  }
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
    color: black  !important;
    font-size: 15px;
    i {
      font-size: 25px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 21px;
      color: #333333 !important;
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
  .iconfont {
  color: #0453fa !important;
  }
}

.el-main {
  text-align: left;
  line-height: 25px;
}
.icon{
  font-size: 25px!important;
}

 /* 导航栏样式 */
  .el-menu-item.is-active {
    background: #eff4ff !important;
    border-right: 4px solid #0052ff;
  }

</style>