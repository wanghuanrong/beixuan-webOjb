import {
    request
} from './request';

// 商品分类列表
export function getShopZczx() {
    return request({
        method: 'get',
        url: '/mall/classList'
    })
}

// 商品列表
export function goodList(classifyId, pageNum, pageSize) {
    return request({
        method: 'get',
        url: '/mall/goodList',
        params: {
            classifyId,
            pageNum,
            pageSize
        }
    })
}

// 商品详细信息
export function details(goodsId) {
    return request({
        method: 'get',
        url: '/mall/' + goodsId,

    })
}

// 和推荐列表信息
export function recoList(classifyId, goodId, pageNum, pageSize) {
    // console.log(classifyId, goodId, pageNum, pageSize)
    return request({
        method: 'get',
        url: '/mall/recoList',
        params: {
            classifyId,
            goodId,
            pageNum,
            pageSize
        }
    })
}


// 提交订单，返回订单号
export function buyNow(goodsId, leaveMessage, num) {
    return request({
        method: 'post',
        url: '/order/buyNow',
        params: {
            goodsId,
            leaveMessage,
            num
        }
    })
}

// 支付宝支付（生成支付宝二维码）
export function ZFBpay(parentOrderId) {
    return request({
        method: 'put',
        url: '/pay/aliPay/' + parentOrderId
    })
}


// 微信支付（生成支付宝二维码）
export function WXpay(parentOrderId) {
    return request({
        method: 'put',
        url: '/pay/weChatPay/' + parentOrderId
    })
}

// 银联支付
export function unionPay(parentOrderId, payVoucher ) {
    return request({
        method: 'put',
        url: '/pay/unionPay/' + parentOrderId,
        params:{
            payVoucher 
        }
    })
}


// 查看订单是否支付成功
export function backPay(parentOrderId) {
    return request({
        method: 'get',
        url: '/pay/back/' + parentOrderId
    })
}


// 提交发票
export function invoice(form,parentOrderId) {
    const {
        addresseeName,
        bankAccount,
        bankName,
        companyAddress,
        companyPhone,
        contactPhone,
        emailAddress,
        invoiceTitle,
        invoiceType,
        taxpayerNumber
    } = form;
    return request({
        method: 'post',
        url: '/pay/invoice',
        params: {
            addresseeName,
            bankAccount,
            bankName,
            companyAddress,
            companyPhone,
            contactPhone,
            emailAddress,
            invoiceTitle,
            invoiceType,
            parentOrderId,
            taxpayerNumber
        }
    })
}