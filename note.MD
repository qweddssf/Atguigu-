// 防抖的手动实现
function deBounce(fn,time){
    let timer
    return function(){
        if(timer) clearTimeout(timer)
        timer = setTimeout(function(){
            fn()
        },time)
    }
}
// 节流
function throttle(fn,time){
    let timer = null
    return function(){
        if(!timer){
            timer = setTimeout(function(){
                fn()
                // 清空  定时器里无法清除定时器 不能用clearTimeout 
                timer = null
            },time)
        }
    }

}

三级联动业务需求
	动态展示数据 通过服务器请求 使用vuex
	通过JS实现目录动态背景变换 以及 控制二三级的显示与隐藏
	节流，防止用户操作过快导致卡顿
	路由跳转，点击a标签实现 路由跳转到/search
    	需要传递对应级别的名字和参数

Search 模块的业务需求
1. 需要TypeNav 在search里面默认不显示 mouted  this.$route.path != '/home
    1.鼠标进入和移出 显示和不显示
2. 过度动画 transition
3. 优化服务器请求次数，使用在app的mounted里面执行 request 后续只需读取state里面即可,不需要重复请求服务器
4. 参数合并 query和 params

ListContainer 和floor 
1. 使用mockjs 插件 拦截 ajax  随机生成数据
2. 准备mock文件夹 在src下  记得格式化  准备相关的图片数据





Search 模块
1. 静态页面 + 静态页面拆分
2. 发请求（API）
3. vuex 三连
4. 组件获取数据仓库 动态展示数据
5.  细节处理