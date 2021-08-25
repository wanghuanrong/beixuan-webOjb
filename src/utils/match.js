import {
    request
} from './request';

// 查询匹配默认信息 
export function getBusiness(){
    return request({
      method:'GET',
      url:'/match/defaultInfo',
    })
} 

// 查询工商信息
export const getMatchDefault = keyword=>{
  return request({
    method:'GET',
    url:'/qcc/getBasicDetailsByName',
    params:{keyword} 
  })
}

// 主体查询
export function getsubject(){
  return request({
    method:'GET',
    url:'/subject/list'
  })
}

// 行业查询
export function getcategory(){
  return request({
    method:'GET',
    url:'/category/list'
  })
}

// 匹配第一步提交代码
export const addMatch=data=>{
return request({
  method:'POST',
  url:'/match/firstStep',
  data
})
}


// 政策匹配-第二步
export function nextStep(data) {
  return request({
      method: 'post',
      url: '/match/nextStep',
      data: data
  })
}

// 政策匹配-第三步
export function lastStep(data) {
  return request({
      method: 'post',
      url: '/match/lastStep',
      data: data
  })
}


// 政策匹配-生成匹配结果
export function generate() {
  return request({
      method: 'post',
      url: '/match/generate',
  })
}


// 政策匹配-匹配结果批次
export function batchList() {
  return request({
      method: 'get',
      url: '/match/batchList',
  })
}


// 政策匹配-匹配记录查询

export function recordList(batchNo , pageNum , pageSize) {
  return request({
      method: 'get',
      url: '/match/recordList',
      params:{
        batchNo , pageNum , pageSize
      }
  })
}

// 主页默认查询 /industry/index
export function getIndexIndustry(){
  return request({
    method: 'get',
    url: '/industry/index',
})
}


// dev-api/match/label/note
// 匹配/预估-标签批注
export function getNote(templateIds){
  return request({
    method: 'post',
    url: '/match/label/note',
    params:{
      templateIds
    }
  })
}


// 上传xlsx文件接口
// /match/importExcel
export function  importExcel(file) {
  return request({
      url: '/match/importExcel',
      method: 'post',
      data: file
  })
}


// 第二级模块数据上传
// /match/importExcelTwo
export function importExcelTwo (data){
  return request({
    url:'/match/importExcelTwo',
    method: 'post',
    data: data
  })
}