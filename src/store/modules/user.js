import { login, register, getCode, reqUserInfo, reqLogout } from '@/api'

const state = {
    userInfo: {},
    token: localStorage.getItem('TOKEN'),  // 从本地存储获取token
    code: ''
}

const mutations = {
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
    },
    SET_TOKEN(state, token) {
        state.token = token
        localStorage.setItem('TOKEN', token)  // 保存token到本地存储
    },
    SET_CODE(state, code) {
        state.code = code
    },
    CLEAR_TOKEN(state) {
        state.token = ''
        localStorage.removeItem('TOKEN')  // 清除本地存储的token
    }
}

const actions = {
    // 用户登录
    async login({ commit }, userInfo) {
        const result = await login(userInfo)
        if (result.code === 200) {
            commit('SET_USER_INFO', result.data)
            commit('SET_TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message || '登录失败'))
        }

    },

    // 用户注册
    async register(_, userInfo) {
        const result = await register(userInfo)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message || '注册失败'))
        }
    },

    // 获取验证码
    async getCode({ commit }) {
        const result = await getCode()
        if (result.code === 200) {
            commit('SET_CODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('获取验证码失败'))
        }
    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        try {
            const result = await reqUserInfo()
            if (result.code === 200) {
                commit('SET_USER_INFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        } catch (error) {
            return Promise.reject(error)
        }
    },

    // 退出登录
    async logout({ commit }) {
        try {
            const result = await reqLogout()
            if (result.code === 200) {
                // 清除用户信息
                commit('SET_USER_INFO', {})
                // 清除token
                commit('CLEAR_TOKEN')
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
    userInfo: state => state.userInfo,
    token: state => state.token,
    code: state => state.code
}

export default {
    state,
    mutations,
    actions,
    getters
} 