import axios from 'axios'
import router from '@/router'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Message,
  MessageBox
} from 'element-ui';

import {
  Loading
} from 'element-ui'

// 创建加载动画事件
let loading;
//内存中正在请求的数量
let loadingNum = 0;

function startLoading() {
  if (loadingNum == 0) {
    loading = Loading.service({
      lock: true,
      text: '拼命加载中...',
      background: 'rgba(255,255,255,0.5)',
    })
  }
  //请求数量加1
  loadingNum++;
}

function endLoading() {
  //请求数量减1
  loadingNum--
  if (loadingNum <= 0) {
    loading.close()
  }
}


export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({

    // shenzhentong.cn
    // http://shenzhengtong.cn/stage-api
    // baseURL: 'http://192.168.2.13:8080',
    // baseURL: 'http://192.168.2.23:8080',
    baseURL: 'http://shenzhengtong.cn/stage-api',
    timeout: 6000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {

    config.headers.Authorization = sessionStorage.getItem("token");
    startLoading();

    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {

    endLoading();
    // console.log(res.data);
    if (res.data.code == 401) {
      // Message.error("登录超时，请重新登录！");

      // 每次手动关闭所有弹框
      Message.closeAll()
      // 在弹出消息
      Message({
        showClose: true,
        type: 'error',
        duration: 1700,
        message: '登录超时，请重新登录！',
      })

      localStorage.removeItem("userPassword");
      sessionStorage.removeItem("token");
      router.push("/login");
      // return;
    }

    return res.data

  }, err => {
    endLoading();

    // 每次手动关闭所有弹框
    Message.closeAll()
    // 在弹出消息
    Message({
      showClose: true,
      type: 'error',
      duration: 1700,
      message: '连接超时！请重新刷新页面！',
    })
    return Promise.reject(err); // reject这个错误信息
  })

  // 3.发送真正的网络请求
  return instance(config)
}