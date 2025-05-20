import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './pages/Home/TypeNav/TypeNav'
// import { reqCategoryList } from './api'
import store from './store'

import Carousel from "@/components/Carousel";
import Pagination from '@/components/Pagination/Pagination'
import { MessageBox } from 'element-ui'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 图片加载中显示的图片 
  loading: require('@/assets/images/loading.gif'),
  // 图片加载失败显示的图片
  error: require('@/assets/images/error.png'),
  // 图片预加载的倍数
  preLoad: 1.3,
  // 图片加载失败后重试的次数
  attempt: 1
})
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.config.productionTip = false;


Vue.component(Carousel.name, Carousel);
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);

// 引入mock数据
import '@/mock/mockserve.js'
// swiper轮播图样式
import 'swiper/css/swiper.css'



new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount('#app')

