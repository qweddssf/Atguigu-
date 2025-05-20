import request from "@/utils/request";
import type {userInfoResponse,userInfoItem,
    response,rolesResponse,rolesLoaderData} from "@/api/config/types";

enum API {
    GET_USER_INFO_LIST = '/config/user/getUserInfo/',
    CREATE_USER_INFO = '/config/user/createUserInfo',
    UPDATE_USER_INFO = '/config/user/updateUserInfo',
    GET_ROLES_AND_LIST = '/config/roles/rolesList/',
    UPDATE_ROLE_INFO = '/config/roles/assign',
    DELETE_USER_URL = '/config/user/deleteUserInfo/',
    DELETE_USER_BATCH = '/config/user/batchRemove',
    SEARCH_USER_INFO = '/config/user/searchUserInfo/',
}

export const reqUserInfoConfigList = (page: number, size: number) => {
    return request.get<any,userInfoResponse>(API.GET_USER_INFO_LIST + `${page}/${size}`);
}

export const reqCreateUserInfo = (userInfo: userInfoItem) => {
    return request.post<any,userInfoItem>(API.CREATE_USER_INFO, userInfo);
}

export const reqUpdateUserInfo = (userInfo: userInfoItem) => {
    return request.post<any,response>(API.UPDATE_USER_INFO, userInfo);
}
export const reqRolesAndList = (id:number) => {
    return request.get<any,rolesResponse>(API.GET_ROLES_AND_LIST + id);
}

export const reqUpdateRole = (data:rolesLoaderData) => {
    return request.post<any,response>(API.UPDATE_ROLE_INFO, data);
}

export const reqDeleteUser = (userId:number) => {
    return request.delete<any,response>(API.DELETE_USER_URL + userId);
}

export const reqBatchRemove = (idList:number[]) => {
    return request.delete<any,response>(API.DELETE_USER_BATCH ,{data:idList});
}

export const reqSearchUserInfo = (page:number,size:number,username:string) => {
    return request.get<any,userInfoResponse>(API.SEARCH_USER_INFO + `${page}/${size}?username=${username}`);
}