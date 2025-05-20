<script setup lang="ts">
import {useRouter} from "vue-router";
import {onBeforeUnmount, onMounted, ref} from 'vue'
import moment from 'moment'
const $router = useRouter();
const goHome = () => {
  $router.push("/home");
}
let time = ref(moment().format('YYYY-MM-DD HH:mm:ss'));
let timer
onMounted(()=>{
  // timer = setInterval(() => {
  //   time.value = ref(moment().format('YYYY-MM-DD HH:mm:ss'));
  // },1000)
})
onBeforeUnmount(()=>{
  clearInterval(timer)
})

</script>

<template>
  <div class="topBox">
    <div class="left">
      <button @click="goHome">首页</button>
    </div>
    <div class="mid">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <button>统计报告</button>
      <div class="time">当前时间:{{time}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.topBox{
  display: flex;
  width: 100%;
  height: 40px;

  .left{
    flex: 1;
    background: url("./images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;
    button{
      float: right;
      width: 140px;
      font-size: 20px;
      height: 100%;
      color:#29fcff;
      background: url("./images/dataScreen-header-btn-bg-l.png");
    }
  }
  .mid{
    flex:2;

    .title {
      width: 100%;
      height: 74px;
      line-height: 74px;
      text-align: center;
      font-size: 30px;
      color: #29fcff;
      background: url("./images/dataScreen-header-center-bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .right{
    flex: 1;
    background: url("./images/dataScreen-header-right-bg.png") no-repeat;
    background-size: cover;
    button{
      float: left;
      width: 140px;
      font-size: 20px;
      height: 100%;
      color:#29fcff;
      background: url("./images/dataScreen-header-btn-bg-r.png");
    }
    .time{
      float: right;
      color:#29fcff;
      margin-right: 10px;
      font-size: 20px;
      height: 100%;
      line-height: 40px;
    }
  }
}
</style>