// 路由鉴权
import router from './router'
import pinia from "./store";
import useUserStore from "./store/userModule/user.ts";
let userStore = useUserStore(pinia);


// 全局前置守卫
router.beforeEach((to, _, next) => {
    let token = userStore.token;
    let username = userStore.username;
    if(token){
        if(to.path == '/login'){
            next('/')
        }else{
            // 是否有用户信息
            if(username){
                next()
            }else{
                // next()
                // 请求用户信息
                userStore.getUserInfo().then( ()=>{
                    next()
                }).catch(()=>{
                    // 通常token过期时 获取不到用户信息 退出登录
                    userStore.logout();
                    next({path:'/login',query:{redirect:to.path}});
                })
            }
        }
    }else{
        //未登录 跳转至登录
        if(to.path == '/login'){
            //当前已经是登录 路由
            next()
        }else {
            // 当前不是登录界面  保留当前路由路径，登陆后跳转
            next({path:'/login',query:{redirect:to.path}});
        }
    }
    // next()
})
// 全局后置守卫
router.afterEach((to:any):void => {
    document.title = to.meta.title;
})