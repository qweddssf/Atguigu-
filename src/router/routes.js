// 使用路由懒加载
const Login = () => import('@/pages/Login/Login')
const Register = () => import('@/pages/Register/Register')
const Detail = () => import('@/pages/Detail/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess/AddCartSucesss')
const ShopCart = () => import('@/pages/ShopCart/ShopCart')
const Trade = () => import('@/pages/Trade/Trade')
const Pay = () => import('@/pages/Pay/Pay')
const Center = () => import('@/pages/Center/Center')
const PaySuccess = () => import('@/pages/PaySuccess/PaySuccess')
const Home = () => import('@/pages/Home/Home')
const Search = () => import('@/pages/Search/Search')

export default [
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { showFooter: true },
        beforeEnter(to, from, next) {
            document.title = '购物车'
            next()
        }
    },
    {
        name: 'addcartsucesss',
        path: '/addcartsucesss',
        component: AddCartSuccess,
        meta: { showFooter: true },
        beforeEnter(to, from, next) {
            document.title = '添加购物车成功'
            next()
        }
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { showFooter: true },
        beforeEnter(to, from, next) {
            document.title = '首页'
            next()
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { showFooter: true },
        beforeEnter(to, from, next) {
            document.title = '搜索'
            next()
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: Detail,
        meta: { showFooter: true },
        beforeEnter(to, from, next) {
            document.title = '商品详情'
            next()
        }
    },
    {
        path: '/login',
        component: Login,
        meta: { showFooter: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { showFooter: false },
        beforeEnter(to, from, next) {
            document.title = '注册'
            next()
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            document.title = '结算'
            if (from.path === '/shopcart') {
                next()
            } else {
                // 如果从其他页面跳转过来，则不进行跳转
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            document.title = '支付'
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: PaySuccess,
        meta: { showFooter: true },
        beforeEnter(to, from, next) {
            document.title = '支付成功'
            next()
        }
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: { showFooter: true },
        beforeEnter(to, from, next) {
            document.title = '个人中心'
            next()
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
]