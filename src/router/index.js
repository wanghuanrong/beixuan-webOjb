import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    // home子路由的重定向
    redirect: '/home',
  }, {
    path: '/',
    component: () => import("@/views/Home")
  }, {
    path: '/login',
    component: () => import("@/views/Login")
  },
  {
    path: '/home',
    component: () => import("@/views/Home"),
    // 首页子路由
    children: [{
        path: '',
        redirect: 'index',
      },
      {
        // 首页
        path: 'index',
        component: () => import("@/views/home/index")
      },
      {
        // 功能
        path: 'features',
        component: () => import("@/views/home/features/features")
      },
      {
        // 价格
        path: 'price',
        component: () => import("@/views/home/price/price")
      },
      {
        // 案例
        path: 'case',
        component: () => import("@/views/home/case/case")
      },
      {
        // 咨讯
        path: 'advisory',
        component: () => import("@/views/home/advisory/advisory")
      },
      {
        // 新闻详情页
        path: 'detailsnew',
        component: () => import("@/views/home/advisory/detailsnew")
      },
      {
        // 关于
        path: 'about',
        component: () => import("@/views/home/about/about")
      },
    ]
  }, {
    path: '/backhome',
    // 主路由
    redirect: '/backhome/perCenter',
    component: () => import('@/views/backstage/frame'),
    children: [{
        path: '',
        redirect: 'perCenter',
      }, {
        // 个人中心
        path: 'perCenter',
        component: () => import('@/views/backstage/perCenter'),
        // children: [{
        //   path: '',
        //   redirect: 'perCenter',
        // }, {
        //   path: 'perCenter',
        //   component: () => import('@/views/backstage/perCenter/perCenter'),
        // }]
      },
      {
        // 政策管理
        path: 'policymanage',
        component: () => import('@/views/backstage/policymanage'),
        children: [{
            path: '',
            // policymanage子路由的重定向
            redirect: 'government',
          }, {
            // 政策查询
            path: 'government',
            component: () => import('@/views/backstage/policymanage/government'),
          }, {
            // 政策查询
            path: 'mingdaninfo',
            component: () => import('@/views/backstage/policymanage/government/mingdaninfo.vue'),
          },
          {
            // 点击政策弹跳政策详情
            path: 'policydetails',
            component: () => import('@/views/backstage/policymanage/government/policydetails.vue'),
          },
          {
            // 点击热搜弹跳政策详情
            path: 'hotsearch',
            component: () => import('@/views/backstage/policymanage/government/hotsearch.vue'),
          },
          {
            // 搜索同行的建议
            path: 'suggesres',
            component: () => import('@/views/backstage/policymanage/government/suggesres.vue'),
          },
          {
            // 智能匹配确认主体
            path: 'rematching',
            component: () => import('@/views/backstage/policymanage/matching/rematch.vue'),
          },
          {
            // 智能匹配
            path: 'matching',
            component: () => import('@/views/backstage/policymanage/matching'),
          },
          {
            // 智能匹配--匹配展示
            path: 'matchingShow',
            component: () => import('@/views/backstage/policymanage/matching/estimate'),
          },
          {
            // 匹配记录
            path: 'record',
            component: () => import('@/views/backstage/policymanage/record'),
          },
          {
            // 智能推送
            path: 'aipush',
            component: () => import('@/views/backstage/policymanage/aipush'),
          },
          {
            // 数据图谱
            path: 'datatlas',
            component: () => import('@/views/backstage/policymanage/datatlas'),
          },
          {
            // 高薪评分
            path: 'score',
            component: () => import('@/views/backstage/policymanage/score'),
          },
          {
            // 评分结果
            path: 'scoreres',
            component: () => import('@/views/backstage/policymanage/score/scoreres.vue'),

          },
          {
            // 政府宣讲会
            path: 'publiclecture',
            component: () => import('@/views/backstage/policymanage/publiclecture'),
          },
          {
            // 政府宣讲会详情
            path: 'details',
            component: () => import('@/views/backstage/policymanage/publiclecture/details'),
          },
          {
            // 项目预估
            path: 'estimate',
            component: () => import('@/views/backstage/policymanage/estimate'),
          },
          {
            // 项目预估--展示结果
            path: 'estimateXm',
            component: () => import('@/views/backstage/policymanage/estimate/estimateXm'),
          }
        ]
      },
      {
        // 知识产权管理
        path: 'knowledgemanage',
        component: () => import('@/views/backstage/knowledgemanage'),
        children: [{
          path: '',
          redirect: 'knowled',
        }, {
          // 知识产权查询
          path: 'knowled',
          component: () => import("@/views/backstage/knowledgemanage/knowled/knowled")
        }]
      },
      {
        // 文库管理
        path: 'knowlibrary',
        component: () => import('@/views/backstage/knowlibrary'),
        children: [{
          path: '',
          // knowlibrary子路由的重定向
          redirect: 'library',
        }, {
          // 文库
          path: 'library',
          component: () => import('@/views/backstage/knowlibrary/library/index.vue')
        }, {
          // 云课堂
          path: 'classroom',
          component: () => import('@/views/backstage/knowlibrary/classroom')
        }, {
          // 文库
          path: 'libraryinfo',
          component: () => import('@/views/backstage/knowlibrary/library/libraryInfo.vue')
        }, {
          // 视频详情
          path: 'classroomInfo',
          component: () => import('@/views/backstage/knowlibrary/classroom/classroomInfo.vue')
        }]
      },
      {
        // 企业服务商城
        path: 'serviceshop',
        component: () => import('@/views/backstage/serviceshop'),
        children: [{
            path: '',
            // serviceshop子路由的重定向
            redirect: 'serviceshop',
          }, {
            // 企业服务商城
            path: 'serviceshop',
            component: () => import('@/views/backstage/serviceshop/serviceshop/serviceshop'),
          },
          {
            // 商品详情
            path: 'shopinfo',
            component: () => import('@/views/backstage/serviceshop/shopInfo/shopInfo'),
          },
          {
            // 提交购买商品
            path: 'submitShopInfo',
            component: () => import('@/views/backstage/serviceshop/submitShopInfo/submitShopInfo'),
          },
          {
            // 支付界面
            path: 'payPage',
            component: () => import('@/views/backstage/serviceshop/payPage/payPage'),
          },
        ]
      },
      {
        // 企业中心
        path: 'companycenter',
        component: () => import('@/views/backstage/enterprisecenter'),
        children: [{
          path: '',
          redirect: 'unitInfo'
        }, {
          // 单位资料
          path: 'unitInfo',
          component: () => import('@/views/backstage/enterprisecenter/unitInfo/unitInfo'),
        }, {
          // 我的订单
          path: 'myOrder',
          component: () => import('@/views/backstage/enterprisecenter/myOrder/myOrder'),
        }, {
          // 我的订单--取消订单详情
          path: 'QxOrderDetail',
          component: () => import('@/views/backstage/enterprisecenter/myOrder/QxOrderDetail'),
        }, {
          // 我的订单--订单详情
          path: 'orderDetails',
          component: () => import('@/views/backstage/enterprisecenter/myOrder/orderDetails'),
        }, {
          // 购物车
          path: 'shopCart',
          component: () => import('@/views/backstage/enterprisecenter/shopCart/shopCart'),
        }, {
          // 购物车--结算
          path: 'Settlement',
          component: () => import('@/views/backstage/enterprisecenter/shopCart/Settlement'),
        }, {
          // 购物车--支付
          path: 'pay',
          component: () => import('@/views/backstage/enterprisecenter/shopCart/pay'),
        }, {
          // 常见问题
          path: 'commonProblem',
          component: () => import('@/views/backstage/enterprisecenter/commonProblem/commonProblem'),
        }, {
          // 消息中心
          path: 'messageCenter',
          component: () => import('@/views/backstage/enterprisecenter/messageCenter/messageCenter'),
        }, {
          // 账户管理
          path: 'account',
          component: () => import('@/views/backstage/enterprisecenter/account/account'),
        }]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  // 置顶
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
})



// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果是登录、官方首页界面则不跳转
  if (to.path === '/login') {
    return next();
  } else if (to.path.indexOf("/home") != -1) {
    return next();
  } else if (to.path.indexOf("/backhome") != -1) {
    // 如果是后台，这判断是否有token值，有则跳转，没有则调回登录界面
    const tokenStr = window.sessionStorage.getItem("token");

    if (!tokenStr) {
      next("/login");
    } else {
      next();
    }
  }
})


// router.afterEach((to, from, next) => {

//   // document.body.scrollTop = 0;

//   // document.documentElement.scrollTop = 0;
//   window.scroll(0, 0);
// });

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router