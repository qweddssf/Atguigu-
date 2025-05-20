import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
// 进度条包 并引入相关样式 

// 1.利用 axios对象的方法create 创建一个axios实例
// 2：request 就是 axios 不过稍微配置一些内容
const request = axios.create({
    // 配置对象
    // 基础路径 发送请求时 路径当中会出现api
    baseURL: '/mock',
    timeout: 5000,
})
// 请求 拦截器 在发送请求之前，拦截器可用检测到 ，在请求之前设置其他业务等等
request.interceptors.request.use((config) => {
    // 返回的config 是配置对象，里面有个header属性 很重要 请求头
    // 进度条开始
    nprogress.start()
    return config
})
// 响应拦截器
request.interceptors.response.use((res) => {
    //响应成功回调函数  响应拦截器检测 可用加入其他业务

    // 进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error(error.message))
})
export default request