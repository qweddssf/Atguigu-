import {defineStore} from 'pinia'
import {reqLogin,reqUserInfo} from "../../api/user";
import type {loginForm,loginResponseData,userInfoResponseData} from "../../api/user/types.ts";
import {GET_TOKEN,SET_TOKEN,CLEAR_TOKEN} from "../../utils/token.ts";
import {constRoutes} from "../../router/routes.ts";
import type {RouteRecordRaw} from "vue-router";

interface UserState {
    token: string|null,
    menuRoutes:RouteRecordRaw[],
    username:string,
    avatar:string,
}

let useUserStore = defineStore('user',{
    state:():UserState=>{
        return {
            token:GET_TOKEN(),
            menuRoutes:constRoutes,
            username:"",
            avatar:"",
        }
    },
    actions:{
        async userLogin(data:loginForm){
            let res:loginResponseData = await reqLogin(data)
            if(res.code === 200){
                this.token = res.data;
                SET_TOKEN(res.data);
                return 'success'
            }else{
                return Promise.reject(new Error(res.message))
            }
        },
        async getUserInfo(){
            let res:userInfoResponseData = await reqUserInfo()
            if(res.code == 200){
                this.avatar = res.data.avatar;
                this.username = res.data.name;
                return 'success'
            }else{
                return Promise.reject(new Error('获取失败'))
            }
        },
        logout(){
            this.token = '';
            this.avatar = '';
            this.username = '';
            CLEAR_TOKEN()
        }
    },
    getters:{

    }
})

export default useUserStore