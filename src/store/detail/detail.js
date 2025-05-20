import { reqItemInfo, reqUpdateCartShop } from "@/api";
import uuId from '@/utils/uuid_token'
const state = {
    goodsinfo: {},
    uuid: uuId()
}
const actions = {
    async getGoodInfo({ commit }, skuId) {
        let res = await reqItemInfo(skuId)
        if (res.code == 200)
            commit('GETGOODSINFO', res.data)
    },
    async updateCartShop(_, params) {
        const { skuId, skuNum } = params
        let res = await reqUpdateCartShop(skuId, Number(skuNum))
        if (res.code == 200)
            return '请求成功'
        else
            return Promise.reject(new Error('faile'))
    }
}

const mutations = {
    GETGOODSINFO(state, goodsinfo) {
        state.goodsinfo = goodsinfo
    }
}
// 简化数组
const getters = {
    CategoryView(state) {
        // 防止服务器 还没请求时  的空对象
        return state.goodsinfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsinfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsinfo.spuSaleAttrList || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
