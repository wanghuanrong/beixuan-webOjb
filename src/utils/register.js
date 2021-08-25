import {
    request
} from './request';

// 注册获取验证码
export function getDetail(codeType, username) {
    return request({
        method: 'get',
        url: '/getPhoneMsg',
        params: {
            codeType,
            username
        }
    })
}

// 注册
export function requestData(form) {
    const {
        code,
        companyName,
        email,
        nickName,
        post,
        userName
    } = form;
    return request({
        method: 'post',
        url: '/register',
        params: {
            code,
            companyName,
            email,
            nickName,
            post,
            userName
        }
    })
}

// 登录
export function loginRequest(form, autoLogin){
    const {username, password} = form;
    return request({
        method: 'post',
        url:'/bxLogin',
        data: form,
        params:{
            autoLogin
        }
    })
}

// 获取用户信息
export function getUserInfo(){
    return request({
        method: 'get',
        url: '/bxGetWebInfo',
    })
}

// 换头像图片
// uploadAvatar
export function uploadAvatar(avatarfile){
    return request({
        method: 'post',
        url: '/uploadAvatar',
        data:avatarfile
    })
}

// 修改密码第一步，手机、验证码 验证
export function getPwdOne(form){
    const {username, code} = form;
    return request({
        method:'put',
        url: '/getPwdOne',
        params:{
            code, username
        }
    })
}

// 修改密码第二步，新密码、确定密码、手机、验证码 
export function getPwdTwo(form, form2){
    const {checkPassword, newPassword} = form;
    const {username, code} = form2;
    return request({
        method: 'put',
        url: '/getPwdTwo',
        params:{
            checkPassword, code, newPassword, username
        }
    })
}


//请求新闻列表
export function getNewsList(pageNum, pageSize) {
    console.log(pageNum, pageSize)
    return request({
      url: '/listWebNews' ,
      method: 'get',
      params: {
          pageNum, pageSize
      }
    })
  }

//   getWebNews/{newsId}
// 获取新闻详情
export function getWebNews(newsId){
    return request({
        url: '/getWebNews/' + newsId,
        method: 'get'
    })
}


 // 立即联系我们
 export function pushPhoneNumber(number) {
    return request({
      url: `/phoneUs/${number}`,
      method: 'get'
    })
}

// 高薪评分提交接口
export const addAdminAp = data => {
    return request({ 
    method: 'POST', 
    url: '/score/match',  
    data  
    })
}


// 请求高薪评分的数据
export function getAdmin() {
    return request({
      url: '/score/get',
      method: 'get'
    })
}

// 请求文章列表类型
export function getAdminType() {
    return request({
      url: '/library/type',
      method: 'get'
    })
}


// 请求文库文章列表
export const getlibraryList = data => {
    return request({
      url: `/library/list`,
      method: 'GET',
      params: data
    })
}

// /stage-api/library/videoList
// 请求文库视频列表
export const getvideoList = data => {
    return request({
      url: `/library/videoList`,
      method: 'GET',
      params: data
    })
}

// /stage-api/library/otherList 请求文库其他视频
export const  getOtherVedio = data=> {
    return request({
      url: '/library/otherList',
      method: 'get',
      params:data
    })
}

// 文章浏览记录详情/library/addPv/{libraryVideoId}

export function addJL(id) {
    return request({
      url: `/library/addPv/${id}`,
      method: 'POST'
    })
}