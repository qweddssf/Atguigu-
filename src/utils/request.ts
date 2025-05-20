import axios from "axios";
import {ElMessage} from "element-plus";


let request = axios.create({
    // baseURL:'/api',
    baseURL: "/myServer",
    timeout:5000,
})
// 请求拦截器
request.interceptors.request.use((config) => {
    if(window.localStorage.getItem("token")){
        config.headers.token = window.localStorage.getItem("token");
    }
    return config;
})

request.interceptors.response.use((response)=>{
    return response.data;
},(error)=>{
    let message = ''
    let status = error.response.status;
    switch(status){
        case 401:
            message = 'token过期';
            break;
        case 403:
            message = '无权访问';
            break;
        case 404:
            message = '地址错误!';
            break;
        default:
            message = error.response.data.message;
    }
    ElMessage({
        type: 'error',
        message: message,
    });
    return Promise.reject(error);
})
export default request;