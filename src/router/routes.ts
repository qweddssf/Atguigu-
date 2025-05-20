export const constRoutes = [
    {
        path:'/login',
        component:() => import('../view/login/login.vue'),
        name:'login',
        meta:{
            title:'登录'
        }
    },
    {
        // 登录成功跳转
        path:'/',
        component:() => import('../layout/layout.vue'),
        name:'layout',
        redirect:'/home',
        meta:{
            title:'home',
            icon:''
        },
        children:[
            {
                path:'/home',
                component:() => import('../view/home/index.vue'),
                name:'home',
                meta:{
                    title:'首页',
                    icon:'src/assets/icons/首页.svg'
                }
            }
        ]
    },
    {
        path:'/screen',
        component:() => import('../view/screen/index.vue'),
        name:'screen',
        meta:{
            title:'数据大屏',
            icon:'src/assets/icons/dataScreen.svg'
        }
    },
    {
        path:'/config',
        component:() => import('@/layout/layout.vue'),
        name:'config',
        meta:{
            title:'权限管理',
            icon:'src/assets/icons/lock.svg'
        },
        redirect:'/Config/userConfig',
        children:[
            {
                path:'/Config/userConfig',
                component:() => import('@/view/config/userConfig/userConfig.vue'),
                name:'userConfig',
                meta:{
                    title:'用户管理',
                    icon:'src/assets/icons/用户管理.svg'
                }
            },
            {
                path:'/Config/roleConfig',
                component:() => import('@/view/config/roleConfig/roleConfig.vue'),
                name:'roleConfig',
                meta:{
                    title:'角色管理',
                    icon:'src/assets/icons/角色管理.svg'
                }
            },
            {
                path:'/Config/menuConfig',
                component:() => import('@/view/config/menuConfig/menuConfig.vue'),
                name:'menuConfig',
                meta:{
                    title:'菜单管理',
                    icon:'src/assets/icons/菜单管理.svg'
                }
            }
        ]
    },
    {
        path:'/product',
        component:() => import('@/layout/layout.vue'),
        name:'Acl',
        meta:{
            title: '商品管理',
            icon:'src/assets/icons/商品管理.svg'
        },
        redirect:'/product/attr',
        children:[
            {
                path:'/product/attr',
                component:() => import('../view/product/attr/index.vue'),
                name:'productAttr',
                meta:{
                    title: '属性管理',
                    icon: 'src/assets/icons/属性管理.svg'
                }
            },
            {
                path:'/product/trademark',
                component:() => import('../view/product/trademark/index.vue'),
                name:'productTrademark',
                meta:{
                    title:'品牌管理',
                    icon:'src/assets/icons/品牌管理.svg'
                }
            },
            {
                path:'/product/SKU',
                component:() => import('../view/product/sku/index.vue'),
                name:'productSKU',
                meta:{
                    title: 'SKU管理',
                    icon:'src/assets/icons/SKU管理.svg'
                }
            },
            {
                path: '/product/SPU',
                component:() => import('../view/product/spu/index.vue'),
                name:'productSPU',
                meta:{
                    title:'SPU管理',
                    icon:'src/assets/icons/SPU管理.svg'
                }
            }
        ]
    },
    {
        path:'/404',
        component:() => import('../view/404/index.vue'),
        name:'404',
        meta:{
            title:'404',
            icon:''
        }
    },

]

export const asyncRoutes = [
    {
        path:'/config',
        component:() => import('@/layout/layout.vue'),
        name:'config',
        meta:{
            title:'权限管理',
            icon:'src/assets/icons/lock.svg'
        },
        redirect:'/Config/userConfig',
        children:[
            {
                path:'/Config/userConfig',
                component:() => import('@/view/config/userConfig/userConfig.vue'),
                name:'userConfig',
                meta:{
                    title:'用户管理',
                    icon:'src/assets/icons/用户管理.svg'
                }
            },
            {
                path:'/Config/roleConfig',
                component:() => import('@/view/config/roleConfig/roleConfig.vue'),
                name:'roleConfig',
                meta:{
                    title:'角色管理',
                    icon:'src/assets/icons/角色管理.svg'
                }
            },
            {
                path:'/Config/menuConfig',
                component:() => import('@/view/config/menuConfig/menuConfig.vue'),
                name:'menuConfig',
                meta:{
                    title:'菜单管理',
                    icon:'src/assets/icons/菜单管理.svg'
                }
            }
        ]
    },
    {
        path:'/product',
        component:() => import('@/layout/layout.vue'),
        name:'Acl',
        meta:{
            title: '商品管理',
            icon:'src/assets/icons/商品管理.svg'
        },
        redirect:'/product/attr',
        children:[
            {
                path:'/product/attr',
                component:() => import('../view/product/attr/index.vue'),
                name:'productAttr',
                meta:{
                    title: '属性管理',
                    icon: 'src/assets/icons/属性管理.svg'
                }
            },
            {
                path:'/product/trademark',
                component:() => import('../view/product/trademark/index.vue'),
                name:'productTrademark',
                meta:{
                    title:'品牌管理',
                    icon:'src/assets/icons/品牌管理.svg'
                }
            },
            {
                path:'/product/SKU',
                component:() => import('../view/product/sku/index.vue'),
                name:'productSKU',
                meta:{
                    title: 'SKU管理',
                    icon:'src/assets/icons/SKU管理.svg'
                }
            },
            {
                path: '/product/SPU',
                component:() => import('../view/product/spu/index.vue'),
                name:'productSPU',
                meta:{
                    title:'SPU管理',
                    icon:'src/assets/icons/SPU管理.svg'
                }
            }
        ]
    },
]

export const anyRoutes = {
    path:'/:pathMatch(.*)*',
    redirect:'/404',
    name:'Any'
}