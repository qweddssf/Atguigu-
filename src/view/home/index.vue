<script setup lang="ts">
import useUserStore from '../../store/userModule/user.ts'
import {getTimes} from '@/utils/times';
import logo_setting from "@/logo_setting";
let userStore = useUserStore()


</script>

<template>
  <div class="container">
    <el-card style="margin: 10px" >
      <div class="content">
        <img class="innerBack" :src="userStore.avatar" alt="">
        <div class="title">
          <span class="greet">{{getTimes()}}好,{{userStore.username}}</span>
          <span class="theme">{{logo_setting.title}}</span>
        </div>

      </div>
    </el-card>
    <div  class="outback">
      <img src="@/assets/icons/welcome.svg" alt="">
    </div>

  </div>
      

</template>

<style scoped>
.container {
  .innerBack{
    width:100px;
    height:100px;
    margin-right:20px;
    border-radius: 50%;
  }
  .outback{
    display:flex;
    justify-content: center;
    img {
      width:500px;
      height:500px;
    }
  }
  .content{
    display: flex;
  }
  .title{
    padding-top: 20px;
    font-size: 18px;
    .greet{
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .theme{
      display: block;
      font-weight: lighter;
      text-decoration: darkgrey;
    }
  }
}
</style>