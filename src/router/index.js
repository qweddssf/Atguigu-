import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
import store from '@/store'

Vue.use(VueRouter)

let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject)
        originalPush.call(this, location, resolve, reject)
    else
        originalPush.call(this, location, () => { }, () => { })
}

const router = new VueRouter({
    routes: routes,
    scrollBehavior() {
        return { y: 0 }
    }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 获取token
    // const token = store.state.user.token
    const userInfo = store.state.user.userInfo
    if (userInfo.userId) {
        // 如果有token
        if (to.path === '/login') {
            // 如果要去登录页，重定向到首页
            next('/')
        } else {
            // 未考虑token过期的情况
            // 去其他页面，放行
            next()
        }
    } else {
        let toPath = to.path
        if (toPath.indexOf('/center') !== -1 || toPath.indexOf('/shopcart') !== -1
            || toPath.indexOf('/paysuccess') !== -1 || toPath.indexOf('/pay') !== -1) {
            console.log('需要登录');

            next('/login')
        } else {
            next()
        }
    }
})

export default router