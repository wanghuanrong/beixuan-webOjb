import {
    request
} from './request';

// 匹配结果批次查询 /match/batchList
export function getBatchList(){
    return request({
      method:'GET',
      url:'/match/batchList',
    })
} 

// 匹配记录查询 /match/recordList
export const  getRecordList = data => {
    return request({
        url: `/match/recordList`,
        method: 'GET',
        params: data
    })
  }

  // 添加匹配结果 /match/addResult
  export const addppResult=data=>{
    return request({
      method:'POST',
      url:'/match/addResult',
      params:data
    })
 }

 // 删除匹配结果 /match/delRecord
 export const deleterecord=matchRecordIds=>{
    //  console.log(data);
    return request({
      method:'DELETE',
      url:'/match/delRecord',
      params:{
        matchRecordIds 
      }
    })
 }

 // 导出文件大下 /stage-api/match/export/excel  excel导出
export const  getRecordexcl = data => {
    return request({
        url: `/match/export/excel`,
        method: 'POST',
        params:data
    })
  }

// 导出/match/export/world world
export const  getRecordworld = data => {
  return request({
      url: `/match/export/world`,
      method: 'POST',
      params:data
  })
}