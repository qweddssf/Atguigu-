<script setup lang="ts">
import logo from './logo/logo.vue'
import Menu from './menu/index.vue'
import useUserStore from '../store/userModule/user.ts'
import Main from '../layout/main/index.vue'
import TabBar from './tabbar/index.vue'
import layoutStore from '../store/layoutModule/layout.ts'
let userStore = useUserStore().menuRoutes.filter((item)=> {
  if(item.path !== '/404') return true
})
userStore = userStore.filter((item)=> {
  if(item.path !== '/login') return true
})

let flod = layoutStore()
</script>

<template>

    <div class="layout_container" >
      <div class="layout_slider" :class="{fold:flod.value}">
        <logo></logo>
        <el-scrollbar class="scrollbar">
          <el-menu background-color="#234568" text-color="white" router :collapse="flod.value">
            <Menu :menulist="userStore"> </Menu>
          </el-menu>
        </el-scrollbar>

      </div>
      <div class="layout_tabnav" :class="{fold:flod.value}">
        <TabBar></TabBar>
      </div>
      <div class="layout_main" :class="{fold:flod.value}">
        <Main></Main>
      </div>
    </div>
</template>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;
    ::-webkit-scrollbar{
      width: 10px;
    }
    ::-webkit-scrollbar-track{
      background: #7695b3;
    }
    ::-webkit-scrollbar-thumb{
      width: 10px;
      background: greenyellow;
      border-radius: 10px;
    }

    .layout_slider {
      width: 260px;
      height: 100vh;
      background: #234568;

      .scrollbar{
        width:100%;
        height:calc(100vh - 60px);
        .el-menu {
          border: none;
        }
      }
      &.fold{
        width:56px
      }
      transition: width 0.3s ease-in-out;
    }
    .layout_tabnav {
      position: fixed;
      width: calc(100% - 260px);
      height: 50px;
      top: 0;
      left: 260px;
      &.fold{
        width:calc(100% - 56px);
        left:56px
      }
      transition: all 0.3s ease-in-out;
    }
    .layout_main {
      position:absolute;
      top: 50px;
      left: 260px;
      width: calc(100% - 260px);
      height: calc(100% - 50px);
      //background: greenyellow;
      overflow: auto;
      &.fold{
        width:calc(100% - 56px);
        left:56px
      }
      transition: all 0.3s ease-in-out;
    }
  }
</style>