import {
    request
} from './request'



// unit/information
// 企业中心-单位资料
export function information() {
    return request({
        method: 'get',
        url: '/unit/information',
    })
}


// 子账户查询(账户管理)
export function ZZHList(from) {
    console.log(from);
    const {
        pageNum,
        pageSize
    } = from;
    return request({
        method: 'get',
        url: '/account/list',
        params: {
            pageNum,
            pageSize
        }
    })
}


// 添加子账户
export function ZZHAdd(from) {
    const {
        code,
        password,
        username
    } = from;
    return request({
        method: 'post',
        url: '/account/add',
        params: {
            code,
            password,
            username
        }
    })
}


// 删除子账户
export function ZZHDelete(userId) {
    return request({
        method: 'delete',
        url: '/account/delete/' + userId,
        // params:{
        //     pageNum, 
        //     pageSize
        // }
    })
}


// 常见问题列表
export function listTitle(questionId) {
    let title = '';
    let content = '';
    let typeId = '';
    let createTime = '';
    return request({
        method: 'post',
        url: '/question/listTitle',
        params: {
            questionId,
            title,
            content,
            typeId,
            createTime
        }
    })
}


// --------------------------------消息中心

// 消息列表                                     状态    类型
export function listMessage(pageNum, pageSize, status, type){
    console.log(pageNum, pageSize, status, type)
    return request({
        method: 'post',
        url: '/messageCenter/listMessage',
        params:{
            pageNum, pageSize, status, type
        }
    })
}


// 设置已读
export function messageCenter(umsgId){
    return request({
        method: 'put',
        url: '/messageCenter',
        params:{
            umsgId
        }
    })
}


// 删除信息
export function messageCenter1(umsgIds){
    console.log(umsgIds)
    return request({
        method: 'delete',
        url: '/messageCenter',
        params:{
            umsgIds:umsgIds
        }
    })
}


// --------------------------------------------购物车
// 添加购物车商品
export function addShopCart(goodsId , number){
    return request({
        method:'post',
        url: '/car/add',
        params: {
            goodsId , number 
        }
    })
}


// 购物车列表
export function GWCshopList(pageNum , pageSize){
    return request({
        method:'get',
        url: '/car/list',
        params: {
            pageNum , pageSize
        }
    })
}


// 更改商品数量
export function GWCupdateNum(carId, number){
    return request({
        method:'put',
        url: '/car/update/' + carId,
        params: {
            number
        }
    })
}


// 删除购物车商品
export function GWCdelete(carId){
    return request({
        method:'delete',
        url: '/car/del/' + carId,
        // params: {
        //     pageNum , pageSize
        // }
    })
}

// 获取购物车选中商品信息
export function getCarList(goodsIds){
    return request({
        method:'get',
        url: '/car/getCarList/' + goodsIds,
        // params: {
        //     goodsIds
        // }
    })
}

// 购物车购买提交订单
export function submitCart(carIds, leaveMessage, num){
    return request({
        method:'post',
        url: '/order/submitCart',
        params: {
            carIds, leaveMessage, num
        }
    })
}





// ---------------------我的订单

// 订单列表
export function orderList(pageNum, pageSize, status , orderId){
    return request({
        method:'get',
        url: '/order/list',
        params: {
            pageNum, pageSize, status, orderId
        }
    })
}

// 订单状态对应的数量
export function listTotal(){
    return request({
        method:'get',
        url: '/order/listTotal',
        // params: {
        //     pageNum, pageSize, status
        // }
    })
}


// 删除订单
export function removeOne(parentOrderId){
    return request({
        method:'put',
        url: '/order/remove/' + parentOrderId,
    })
}

// 取消订单
export function OrdelCancel(parentOrderId){
    return request({
        method:'put',
        url: '/order/cancel/' + parentOrderId,
    })
}
