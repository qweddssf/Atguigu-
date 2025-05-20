import { reqAddressList, reqOrderInfo } from '@/api'

const state = {
    addressList: [], // 用户地址列表
    orderInfo: {}    // 订单信息
}

const mutations = {
    SET_ADDRESS_LIST(state, addressList) {
        state.addressList = addressList
    },
    SET_ORDER_INFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}

const actions = {
    // 获取用户地址列表
    async getAddressList({ commit }) {
        try {
            const result = await reqAddressList()
            if (result.code === 200) {
                commit('SET_ADDRESS_LIST', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        } catch (error) {
            return Promise.reject(error)
        }
    },

    // 获取订单信息
    async getOrderInfo({ commit }) {
        try {
            const result = await reqOrderInfo()
            if (result.code === 200) {
                commit('SET_ORDER_INFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

const getters = {
    // 收件人信息
    addressList: state => state.addressList || [],
    // 商品清单信息
    orderInfo: state => state.orderInfo || {}
}

export default {
    state,
    mutations,
    actions,
    getters
} 