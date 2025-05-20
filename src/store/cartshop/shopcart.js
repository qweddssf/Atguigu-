import { deleteShopCartId, reqCartShopList, updateCartShopAtt } from "@/api"

const state = {
    carShopList: []
}
const actions = {
    async getCartShopList({ commit }) {
        let res = await reqCartShopList()
        if (res.code == 200)
            commit('GETCARTSHOPLIST', res.data)
    },
    async deleteShopCartId(_, skuId) {
        let res = await deleteShopCartId(skuId)
        if (res.code == 200)
            return '请求成功'
        else
            return Promise.reject(new Error('faile'))
    },
    async updateCartShopisCheck(_, Obj) {
        const { skuId, isChecked } = Obj
        let res = await updateCartShopAtt(skuId, isChecked)
        if (res.code == 200)
            return '请求成功'
        else
            return Promise.reject(new Error('faile'))
    },
    deleteAllCheckedItem({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartList.cartInfolist.forEach(element => {
            if (element.isChecked == '1') {
                let p = dispatch('deleteShopCartId', element.id)
                PromiseAll.push(p)
            }
        });
        // 一个 失败 全是 失败；全部成功 则成功
        return Promise.all(PromiseAll)
    },
    AllChecked({ dispatch, getters }, isChecked) {
        let PromiseAll = []
        const v = isChecked ? '1' : '0'

        getters.cartList.cartInfolist.forEach(e => {

            if (e.isChecked != v) {
                let p = dispatch('updateCartShopisCheck',
                    { skuId: e.id, isChecked: v == '1' ? '1' : '0' })
                PromiseAll.push(p)
            }
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTSHOPLIST(state, data) {
        state.carShopList = data
    }
}
const getters = {
    cartList() {
        return state.carShopList[0] || {}
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}