<script setup lang="ts">

import {ref, watch} from "vue";
import layoutStore from '../../store/layoutModule/layout.ts'
import {useRoute,useRouter} from "vue-router";
import useUserStore from '../../store/userModule/user.ts'

let $router = useRouter();
let $route = useRoute();
let ishow = layoutStore()
const isShowMenu = () =>{
  ishow.value = !ishow.value;
}
// 刷新按钮事件
const refresh = () => {
  layoutStore().refsh= !layoutStore().refsh;
}
// 全屏按钮事件
const fullScreen = ()=>{
  let  isfull = document.fullscreenElement;
  if(!isfull){
    document.documentElement.requestFullscreen()
  }else {
    document.exitFullscreen()
  }
}
//  获取头像和名字
let userinfo = useUserStore();
userinfo.getUserInfo().then( ()=>{
}).catch(err => {
  console.log('err',err)
})
//退出登录
const logout = () => {
  userinfo.logout()
  $router.push({path:"/login",query:{redirect:`${$route.path}`}});
}

let theme = ref(true);
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

watch(theme,()=>{
  // console.log(theme);
  const html = document.documentElement
  theme.value ? html.className = 'dark' : html.className = ''
})

watch(color,()=>{
  console.log(color.value)
  const html = document.documentElement
  html.style.setProperty('--el-color-primary',color.value)
})

</script>

<template>
      <div class="tabbar">

        <div class="table_left">
          <el-button :icon="ishow?'Expand':'Fold'" circle @click="isShowMenu" style="margin-right: 10px"></el-button>
          <el-breadcrumb separator="/" >
            <el-breadcrumb-item  v-for="(item,key) in $route.matched" :key="key" :to="item.path">
              {{ item.meta.title || 'null'}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
<!--        右侧导航-->
        <div class="table_right">
          <el-button circle @click="refresh" icon="Refresh"></el-button>
          <el-button circle @click="fullScreen" icon="FullScreen"></el-button>
          <el-popover width="200" trigger="click" >
            <template #default>
                <el-form >
                  <el-form-item label="主题颜色" label-width="80">
                    <el-color-picker :teleported="false" style="margin-left: 24px"
                    v-model="color" show-alpha :predefine="predefineColors" />
                  </el-form-item >
                  <el-form-item label="暗黑模式" label-width="80">
<!--                    active-text="开启" inactive-text="关闭"-->
                    <el-switch v-model="theme" style="margin-left: 24px" inline-prompt size="default"  active-icon="Moon" inactive-icon="Sunny"></el-switch>
                  </el-form-item>
                </el-form>
            </template>
            <template #reference>
              <el-button circle icon="Setting"></el-button>
            </template>
          </el-popover>

          <img :src="userinfo.avatar" style="height: 24px;width: 24px;margin:0 12px;"/>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{userinfo.username}}
              <img src="../../assets/icons/下拉.svg" style="margin-left:10px ">
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
</template>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(to right, #eff3f0, #b7bdb7);
  .table_left {
    display: flex;
    align-items: center;
    img{
      height: 24px;
      width: 24px;
      margin:0 10px;
    }
  }
  .table_right {
    display: flex;
    align-items: center;
    img{
      height: 16px;
      width: 16px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;
    }
  }
}
</style>