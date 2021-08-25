import {
    request
} from './request';

// /area/list 地区查询
export const  getAreaList = data => {
    return request({
        url: `/area/list`,
        method: 'GET',
        params: data
    })
}

// 部委查询 /department/list
export const  getdepartment = data => {
  return request({
      url: `/department/list`,
      method: 'GET',
      params: data
  })
}

// 行业查询 /category/list
export const  getcategory = data => {
  return request({
      url: `/category/list `,
      method: 'GET',
      params: data
  })
}

// 项目查询 /project/list
export const  getproject = data => {
  return request({
      url: `/project/list `,
      method: 'GET',
      params: data
  })
}

// 主体查询 /subject/list
export const  getsubject = data => {
  return request({
      url: `/subject/list`,
      method: 'GET',
      params: data
  })
}

// /hot/list政府热搜榜
export const  gethotlist = data => {
  return request({
      url: `/hot/list`,
      method: 'GET',
      params: data
  })
}

// /policy/list 政策查询
export const  getpolicy = data => {
  return request({
      url: `/policy/list`,
      method: 'GET',
      params: data
  })
}

// /calendar/list 政策日历
export const  getcalendar = data => {
  return request({
      url: `/calendar/list`,
      method: 'GET',
      params: data
  })
}

// 最新政策 /news/policy
export const  getnewsPoli = data => {
  return request({
      url: `/news/policy`,
      method: 'GET',
      params: data
  })
}

// /news/pl 最新公示名单
export const  getnewspl = data => {
  return request({
      url: `/news/pl`,
      method: 'GET',
      params: data
  })
}

// 同行默认查询 /industry/index
export const  getindustry = data => {
  return request({
      url: `/industry/index`,
      method: 'GET',
      params: data
  })
}

// 同行查询 模糊查询 /qcc/search
export const  getqccsearch = keyword => {
  return request({
      url: `/qcc/search`,
      method: 'GET',
      params: {keyword } 
  })
}

// 补贴明细查询/subsidy/list
export const  getsubsidylist = data => {
  return request({
      url: `/subsidy/list`,
      method: 'GET',
      params: data
  })
}

// 总金额 /subsidy/total   
export const  getsubsidytotal = searchParam => {
  return request({
      url: `/subsidy/total`,
      method: 'GET',
      params: {searchParam}
  })
}

// 政策详情 /policy/{policyId}
export function  getpolicyId(policyId) {
  return request({
      url: `/policy/${policyId}`,
      method: 'GET',
  })
}

// 公示名单批次查询 /{policyId}/noList
export function  getIdnoList(policyId) {
  return request({
      url: `/${policyId}/noList`,
      method: 'GET',
  })
}

// 点击订阅 /push/check/{policyId}
export function  getsubscribe(policyId) {
  return request({
      url: `/push/check/${policyId}`,
      method: 'GET',
  })
}

// 取消订阅 /push/delete/{policyId}
export function  deletepolicyId(policyId) {
  return request({
      url: `/push/delete/${policyId}`,
      method: 'DELETE',
  })
}

// 总补贴查询
export function getYear() {
  return request({
    url: `/atlas/supportTotal`,
    method: 'GET',
})
}

// 公示名单查询 /pl/list getPlList  params: data
export const getPlList = data=>{
  return request({
    url: `/pl/list`,
    method: 'GET',
    params: data
  })
}
 
// 政策年度详情查询  /{policyId}/yearTotal
export function  getyearTotal(policyId) {
  return request({
      url: `/${policyId}/yearTotal`,
      method: 'GET',
  })
}

// 查询总金额 /history/total
export function  getAllMoney() {
  return request({
      url: `/subsidy/history/total`,
      method: 'GET',
  })
}

// 政策详情的企业信息查询
export function  getUnitInfo(id) {
  return request({
      url: `/unit/information?policyId=${id}`,
      method: 'GET',
  })
}



