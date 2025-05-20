import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import './assets/style/reset.css'
import pinia from './store/index.ts'
import './permission.ts'

const app = createApp(App)
app.use(ElementPlus,{
    locale:zhCn
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia)
app.use(router)
app.mount('#app')
