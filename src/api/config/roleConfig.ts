import request from "@/utils/request";
import type{rolesListResponse,response,roleItem,PermissionResponse} from "@/api/config/types";

enum API {
    GET_ALL_ROLES_LIST = '/config/roles/rolesAllList/',
    CREATE_ROLE_INFO = '/config/roles/createRoles',
    UPDATE_ROLE_INFO = '/config/roles/updateRoles',
    GET_ROLES_PERMISSION = '/config/roles/permissions/',
    UPDATE_ROLE_PERMISSION = '/config/roles/updatePermissions',
    DELETE_ROLE_INFO = '/config/roles/deleteRoles/',
}

export const reqRoleNameInfo = (page: number, size: number,roleName?:string) => {
    if(roleName)
        return request.get<any,rolesListResponse>(API.GET_ALL_ROLES_LIST +  `${page}/${size}?roleName=${roleName}`);
    else
        return request.get<any,rolesListResponse>(API.GET_ALL_ROLES_LIST +  `${page}/${size}`);
}

export const reqCreateUpdateRole = (data:roleItem) => {
    if(data.id)
        return request.put<any,response>(API.UPDATE_ROLE_INFO, data);
    else{
        return request.post<any,response>(API.CREATE_ROLE_INFO, data);
    }
}
export const getRolePermission = (roleId:number) => {
    return request.get<any,PermissionResponse>(API.GET_ROLES_PERMISSION + roleId);
}
export const reqUpdatePermission = (roleId,permissionIds:number[]) => {
    return request.post<any,response>(API.UPDATE_ROLE_PERMISSION + `?roleId=${roleId}&permissionIds=${permissionIds}`);
}

export const reqDeleteRole = (Id:number) => {
    return request.delete<any,response>(API.DELETE_ROLE_INFO + Id);
}