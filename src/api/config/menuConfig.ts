import request from "@/utils/request";
import type{PermissionResponse,menuPostData,response} from "@/api/config/types";

enum API  {
    GET_PERMISSION = '/config/menu/permissions',
    CREATE_MENU_URL = '/config/menu/createMenu',
    UPDATE_MENU_INFO = '/config/menu/updateMenu',
    DELETE_MENU_INFO = '/config/menu/deleteMenu/',
}

export const reqAllPermissions = () => {
    return request.get<any,PermissionResponse>(API.GET_PERMISSION);
}

export const reqUpdateMenu = (data:menuPostData) => {
    if(data.id){
        return request.put(API.UPDATE_MENU_INFO, data);
    }else
        return request.post<any,response>(API.CREATE_MENU_URL, data);
}
export const reqDeleteMenu = (id:number) => {
    return request.delete(API.DELETE_MENU_INFO + id);
}