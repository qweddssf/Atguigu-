// 这个模块是对 API 进行统一管理
// import request from "./request";
import mockReques from './mockAjax'
import myrequest from './myrequest'
// import request from './request'
// 请求产品仓库信息列表
export const reqCategoryList = () => {
    return myrequest({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 获取 banner 的mock 数据
export const reqBannerList = () => {
    return mockReques({ url: '/banner', method: 'get' })
}
// 请求floor组件信息的列表
export const reqfloorList = () => {
    return mockReques({ url: '/floor', method: 'get' })
}
// 请求搜索结果列表
export const reqSearchList = (params) => {
    return myrequest({ url: '/list', method: 'post', data: params })
}
// 请求 id商品的详细信息
export const reqItemInfo = (skuId) => {
    return myrequest({ url: `/item/${skuId}`, method: 'get' })
}
// 返回购物的商品 id 和数量 给服务器
export const reqUpdateCartShop = (skuId, skuNum) => {
    return myrequest({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
// 请求购物车列表
export const reqCartShopList = () => {
    return myrequest({ url: '/cart/cartList', method: 'get' })
}
// 删除购物车 商品id的 物品
export const deleteShopCartId = (skuId) => {
    return myrequest({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}
// 修改商品 skuId的isChecked 属性
export const updateCartShopAtt = (skuId, isChecked) => {
    return myrequest({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}

// 用户登录
export const login = (data) => {
    return myrequest({
        url: '/user/passport/login',
        method: 'post',
        data
    })
}

// 用户注册
export const register = (data) => {
    return myrequest({
        url: '/user/passport/register',
        method: 'post',
        data
    })
}

// 获取验证码
export const getCode = () => {
    return myrequest({
        url: '/user/passport/code',
        method: 'get'
    })
}

// 根据token获取用户信息
export const reqUserInfo = () => {
    return myrequest({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}

// 退出登录
export const reqLogout = () => {
    return myrequest({
        url: '/user/passport/logout',
        method: 'get'
    })
}

// 获取用户地址列表
export const reqAddressList = () => {
    return myrequest({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}

// 获取订单交易页信息
export const reqOrderInfo = () => {
    return myrequest({
        url: '/order/auth/trade',
        method: 'get'
    })
}