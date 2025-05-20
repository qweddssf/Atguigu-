import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

import home from './home/home'
import search from "./search/seach";
import detail from './detail/detail'
import shopcart from "./cartshop/shopcart";
import user from './modules/user'
import trade from './modules/trade'

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})