import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  connectnow
} from '@/utils/phone'

import echarts from 'echarts'

// 懒加载
import VueLazyload from 'vue-lazyload'

// element-ui 全局导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Message,
  MessageBox
} from 'element-ui';
import download from 'downloadjs';
import '@/assets/iconfont/iconfont.css'
Vue.use(ElementUI);
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// 导入全局过滤器时间格式过滤为 yyyy-mm-dd 去除时分秒
Vue.filter(
  'timeFormat', function (val) {
    if (val == null || val == "") {
      return "";
    } else {
      let d = new Date(val); //val 为表格内取到的后台时间
      let month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      let times = d.getFullYear() + "-" + month + "-" + day;
      return times;
    }
},
)
// 过滤万元的全局过滤器
Vue.filter(
  "moneyForm",function(vall){
    return vall=Math.ceil((vall/10000))
    }
)
// 过滤万元保留两位小数
Vue.filter(
  "moneyFormTwo",function(vall){
    return (vall/10000).toFixed(2)
    }
)
// 挂载公共的接口地址
// Vue.prototype.$http = 'http://192.168.2.13:8080';
// Vue.prototype.$http = 'http://192.168.2.23:8080';
Vue.prototype.$http = 'http://shenzhengtong.cn/stage-api';

// 全局挂载echarts
Vue.prototype.$echarts = echarts;

Vue.prototype.connectnow = connectnow

Vue.config.productionTip = false

// 懒加载
Vue.use(VueLazyload);

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1
// })
// 富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, );

router.afterEach((to,from, next) => {
  window.scrollTo(0,0)
  })
  
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')