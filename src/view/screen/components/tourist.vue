<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let number = ref('216908')
let charts = ref()
onMounted(()=>{
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title:{
      text:"水球图"
    },
    series:[{
      type:'liquidFill',
      data:[0.6,0.3],
      radius:'100%',
      color:'#6094cc'
    }]
  })
})

</script>

<template>
    <div class="container2">
        <div class="top">
          <p>实时游客统计</p>
          <img src="../images/dataScreen-title.png" alt="">
          <div class="pre">可预约总人数<i>66666</i></div>
        </div>
      <div class="content">
        <div class="number">
          <span v-for="(item,index) in number" :key="index">{{item}}</span>
          <span>人</span>
        </div>
        <div class="charts" ref="charts">
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
.container2 {
  background: url("../images/dataScreen-main-lt.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .top{
    font-size: 20px;
    color: #fff;
    .pre{
      margin-top: 15px;
      float: right;
      i{
        color:orange;
      }
    }
  }

  .content{
    .number{
      padding: 10px;
      display: flex;
      margin-top:40px;
      span{
        flex: 1;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: url("../images/total.png") no-repeat;
        background-size: 100% 100%;
        font-size: 30px;
        color:#29fcff;
        font-weight: bold;
      }
    }
    .charts{
      width: 100%;
      height: 270px;
    }
  }
}
</style>