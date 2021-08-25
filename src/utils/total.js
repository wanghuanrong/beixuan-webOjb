import {
    request
} from "./request"


// 政策宣讲轮播图
export function lecturebBnner() {
    return request({
        method: 'get',
        url: '/lecture/banner',
        // params:{

        // }
    })
}

// 政策宣讲列表
export function lecturebList() {
    return request({
        method: 'get',
        url: '/lecture/list',
    })
}


// ---------------------------------------------数据图谱模块接口

// 全国数据图谱
export function nationalData(num) {
    return request({
        method: 'get',
        url: '/atlas/nationalData',
        params: {
            areaId: num,
        }
    })
}

// atlas/areaSumNumber
// 政策数据
export function areaSumNumber(areaId) {
    return request({
        method: 'get',
        url: '/atlas/areaSumNumber',
        params: {
            areaId: areaId,
            year: '2020'
        }
    })
}


// atlas/areaSumPrice
// 扶持金额
export function areaSumPrice(areaId) {
    return request({
        method: 'get',
        url: '/atlas/areaSumPrice',
        params: {
            areaId: areaId,
            year: '2020'
        }
    })
}


// atlas/highTechNumber
// **市高新数量
export function hightechNumber(areaId) {
    return request({
        method: 'get',
        url: '/atlas/highTechNumber',
        params: {
            areaId: areaId,
            year: '2020'
        }
    })
}

// atlas/supportTotal
// 深圳市资助总金额
export function supportTotal(areaId) {
    return request({
        method: 'get',
        url: '/atlas/supportTotal',
        params: {
            areaId: areaId,
            year: '2020'
        }
    })
}

// atlas/projectNumber
// 深圳市项目数量
export function projectNumber(areaId) {
    return request({
        method: 'get',
        url: '/atlas/projectNumber',
        params: {
            areaId: areaId,
            year: '2020'
        }
    })
}

// atlas/departmentStatistics
// 2020年深圳市各部委项目数量、扶持金额
export function departmentStatistics(areaId) {
    return request({
        method: 'get',
        url: '/atlas/departmentStatistics',
        params: {
            areaId: areaId,
            year: '2020'
        }
    })
}


// atlas/categorySumNumber
// 行业数据(申报项目数量)
export function categorySumNumber(categoryId) {
    return request({
        method: 'get',
        url: '/atlas/categorySumNumber',
        params: {
            categoryId
        }
    })
}


// /atlas/categorySumPrice
// 行业数据(申报,扶持金额)
export function categorySumPrice(categoryId) {
    return request({
        method: 'get',
        url: '/atlas/categorySumPrice',
        params: {
            categoryId
        }
    })
}



// 行业查询
export function HYlist(pageNum, pageSize) {
    return request({
        method: 'get',
        url: '/category/list',
        params: {
            pageNum,
            pageSize
        }
    })
}




// -------------------------------------- 知识产权查询
// 企业工商数据查询-企业工商详情
// 由于有的用户信息没有keyNo,所以需要通过企业名称查到keyid，再去查专利
export function getBasicDetailsByName(keyword) {
    return request({
        method: 'get',
        url: '/qcc/getBasicDetailsByName',
        params: {
            keyword
        }
    })
}

// 专利查询-公司专利多重查询
export function searchMultiPatents(keyword, pageNum, pageSize) {
    return request({
        method: 'get',
        url: '/intellectual/searchMultiPatents',
        params: {
            keyword,
            pageNum,
            pageSize
        }
    })
}

// 软件著作权查询
export function searchSoftwareCr(keyword, pageNum, pageSize) {
    return request({
        method: 'get',
        url: '/intellectual/searchSoftwareCr',
        params: {
            keyword,
            pageNum,
            pageSize
        }
    })
}

// 著作权查询
export function searchCopyRight(keyword, pageNum, pageSize) {
    return request({
        method: 'get',
        url: '/intellectual/searchCopyRight',
        params: {
            keyword,
            pageNum,
            pageSize
        }
    })
}


// 知识产权-删除专利
export function deletePatent(companyPatentIds) {
    return request({
        method: 'delete',
        url: '/intellectual/deletePatent/' + companyPatentIds,
    })
}

// 知识产权-删除软件著作
export function deleteSoftware(registerNos) {
    return request({
        method: 'delete',
        url: '/intellectual/deleteSoftware/' + registerNos,
    })
}

// 知识产权-删除作品著作
export function deleteCopyright(registerNos) {
    return request({
        method: 'delete',
        url: '/intellectual/deleteCopyright/' + registerNos,
    })
}

// 知识产权-新增专利
export function addPatent(companyPatent) {
    return request({
        method: 'post',
        url: '/intellectual/addPatent',
        // params: {
        //     companyPatent
        // }
        data: companyPatent
    })
}


// 知识产权-新增软件著作
export function addSoftware(companySoftware) {
    return request({
        method: 'post',
        url: '/intellectual/addSoftware',
        data: companySoftware
    })
}

// 知识产权-新增作品著作
export function addCopyright(companyCopyright) {
    return request({
        method: 'post',
        url: '/intellectual/addCopyright',
        data: companyCopyright
    })
}


// 知识产权-导出专利
export function exportPatent(companyPatentIds) {
    return request({
        method: 'post',
        url: '/intellectual/exportPatent',
        params: {
            companyPatentIds
        }
    })
}

// 知识产权-导出软件著作
export function exportSoftware(registerNos) {
    return request({
        method: 'post',
        url: '/intellectual/exportSoftware' ,
        params: {
            registerNos
        }
    })
}


// 知识产权-导出作品著作
export function exportCopyright(registerNos) {
    return request({
        method: 'post',
        url: '/intellectual/exportCopyright',
        params: {
            registerNos
        }
    })
}

// 下载请求
export function download(fileName) {
    return request({
        // method: 'post',
        url: '/common/download',
        params: {
            delete: true,
            fileName: fileName,
        },
    })
}


// ---------------------个人中心
export const addMatch=data=>{
    return request({
      method:'POST',
      url:'/estimate/firstStep',
      data
    })
    }


// /estimate/nextStep
// // 项目预估-第二步
export function nextStep(data) {
    return request({
        method: 'post',
        url: '/estimate/nextStep',
        data: data
    })
  }

// /estimate/lastStep
// // 项目预估-第三步
export function lastStep(data) {
    return request({
        method: 'post',
        url: '/estimate/lastStep',
        data: data
    })
  }

  


// /estimate/batchList
// // 项目预估-预估结果批次
export function batchList() {
    return request({
        method: 'get',
        url: '/estimate/batchList',
    })
  }
  


// /estimate/generate
// // 项目预估-生成预估结果
export function generate() {
    return request({
        method: 'post',
        url: '/estimate/generate',
    })
  }


// /estimate/labelList
// // 对比记录-预估标签
export function labelList(estimateMatchNo , matchBatchNo  , pageNum , pageSize) {
    return request({
        method: 'get',
        url: '/estimate/labelList',
        params:{
            estimateMatchNo , matchBatchNo  , pageNum , pageSize
        }
    })
  }



// /estimate/recordList
// // 项目预估-预估匹配记录查询
export function recordList(batchNo , pageNum , pageSize) {
    return request({
        method: 'get',
        url: '/estimate/recordList',
        params:{
            batchNo , pageNum , pageSize
        }
    })
  }


//   match/recordList
//   政策匹配-匹配记录查询
  export function PPrecordList(batchNo , pageNum , pageSize) {
    return request({
        method: 'get',
        url: '/match/recordList',
        params:{
            batchNo , pageNum , pageSize
        }
    })
  }


// /match/defaultInfo
// // 预估默认信息



// 对比记录-匹配标签
export function PPlabelList(matchBatchNo  , pageNum , pageSize) {
    return request({
        method: 'get',
        url: '/match/labelList',
        params:{
            matchBatchNo , pageNum , pageSize
        }
    })
  }
