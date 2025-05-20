export interface loginForm{
    password: string,
    username: string
}

export interface ResponseData{
    code:number,
    message:string,
    ok:boolean,
}

// interface DataType{
//     token: string,
//     message?: string
// }

export interface loginResponseData extends ResponseData{
    data:string
}
// get 请求得到用户相关信息
export interface userInfoResponseData extends ResponseData{
    data:{
        avatar:string,
        name: string,
        roles: Array<string>,
        buttons: Array<string>,
        routes: Array<string>,
    }
}

