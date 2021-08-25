import {
    request
} from './request';
//订阅列表
export const getSubscribeList = data => {
    return request({
      url: `/push/subscripList`,
      method: 'GET',
      params: data
    })
}
//推送列表
export const getpassList= data => {
    return request({
      url: `/push/passList`,
      method: 'GET',
      params: data
    })
}

// /push/smartPush 智能推送列表
export const getsmartPush= data => {
  return request({
    url: `/push/smartPush`,
    method: 'GET',
    params: data
  })
}

// 已办列表 /push/alreadyHandle
export const getalreadyHandle= data => {
  return request({
    url: `/push/alreadyHandle`,
    method: 'GET',
    params: data
  })
}

// 待办列表 /push/waitHandle
export const getwaitHandle= data => {
  return request({
    url: `/push/waitHandle`,
    method: 'GET',
    params: data
  })
}

// 查询推送方式的接口 /push/sendTypeList
export function getSendlist(){
  return request({
    url: `/push/sendTypeList`,
    method: 'GET',
  })
}

// 点击查询立即录入 /push/label/{policyId}
export function getLable(id){
  return request({
    url: `/push/label/${id}`,
    method: 'GET',
  })
}

// 修改通知名单 /push/update
export const updatePush= data => {
  return request({
    url: `/push/update`,
    method: 'GET',
    params: data
  })
}

// 匹配记录
// push/match/{mattersId}
// 待办事项-匹配
export const twoPPrecording = (mattersId ,data)  => {
  return request({
    url: `/push/match/${mattersId}`,
    method: 'post',
    data: data
  })
}