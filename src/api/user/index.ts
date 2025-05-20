// 导入二次封装的request
import request from "../../utils/request.ts";
import type {loginForm,loginResponseData,userInfoResponseData} from "./types.ts";
enum API {
    // LOGIN_URL = '/admin/acl/index/login',
    // USERINFO_URL = '/admin/acl/index/info',
    // LOGOUT_URL = '/admin/acl/index/logout',
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info',
    LOGOUT_URL = '/user/logout',
}

export const reqLogin = (data:loginForm) => request.post<any,loginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = ()=> request.get<any,userInfoResponseData>(API.USERINFO_URL);
export const reqLogout = ()=> request.post<any,any>(API.LOGOUT_URL);