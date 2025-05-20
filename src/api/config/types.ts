export interface response  {
    code: number;
    message: string;
    ok: boolean;
}
// 用户信息接口
export type userInfoItem = {
    id:? number;
    createTime?:string;
    updateTime?:string;
    username:string;
    password:string;
    name: string;
    phone?: null;
    roleName?: string;
}

export interface userInfoResponse extends response {
    data:{
        records: userInfoItem[];
        total: number;
        size: number;
        current: number;
        orders:[],
        optimizeCountSql:boolean;
        hitCount:boolean;
        countId:null;
        maxLimit:null;
        searchCount:boolean;
        pages:number;
    }
}
export interface createUserInfoResponse extends response {
    data:null;
}
// 职位
export type roleItem = {
    id?:number;
    createTime?:string;
    updateTime?:string;
    roleName: string;
    remarks?:null;
}

export interface rolesResponse extends response {
    data:{
        assignRoles:roleItem[];
        allRolesList:roleItem[];
    }
}
export type rolesLoaderData = {
    userId:number;
    roleIdList:number[]
}
// roleConfig
export interface rolesListResponse extends response {
    data:{
        records: roleItem[];
        total: number;
        size: number;
        current: number;
        orders:[],
        optimizeCountSql:boolean;
        hitCount:boolean;
        countId:null;
        maxLimit:null;
        searchCount:boolean;
        pages:number;
    }
}

// permission
export type PermissionNode = {
    id:number;
    createTime?:string;
    updateTime?:string;
    pid:number;
    name: string;
    code:null;
    toCode:null;
    type:number;
    level:number;
    select:boolean;
    children:permissionList | [];
}

type permissionList = PermissionNode[];

export interface PermissionResponse extends response {
    data:PermissionNode[];
}
// menu
export type menuPostData = {
    id?:number|string;
    name: string;
    pid:number;
    code:string;
    level:number;
}
