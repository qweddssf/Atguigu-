import { reqBannerList, reqfloorList, reqCategoryList } from "@/api"

const state = {
    goryList: [],
    bannerList: [],
    floorList: []
}

const actions = {
    async reqCategoryList({ commit }) {
        let res = await reqCategoryList()
        if (res.code == 200)
            commit('GETGORYLIST', res.data)

    },
    async getBannerList({ commit }) {
        let res = await reqBannerList()
        if (res.code == 200)
            commit('GETBANNERLIST', res.data)
    },
    async getFloorList({ commit }) {
        let res = await reqfloorList()
        if (res.code == 200)
            commit('GETFLOORLIST', res.data)
    }
}

const mutations = {
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    },
    GETGORYLIST(state, goryList) {
        state.goryList = goryList
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}