<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'
let chart = ref()

onMounted(() => {
  let myChart = echarts.init(chart.value)
  myChart.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },

    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        label:{
          show: true,
          position: 'inside'
        },
        itemStyle: {
          borderRadius:10,
          color:function (data:any) {
            let colorArr = ['skyblue','orange','yellow','purple','greenyellow','#2e89ff','white']
            return colorArr[data.dataIndex]
          }
        }
      },
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type:'line',
      }
    ]
  })
})
</script>

<template>
<div class="containerRank">
  <div class="top">
    <p>实时游客统计</p>
    <img src="../../images/dataScreen-title.png" alt="">
  </div>
  <div class="title">
    <div class="rank1">排名</div>
    <div class="sc">景区</div>
    <div class="am">预约数量</div>
  </div>
  <div class="content" ref="chart">

  </div>
</div>
</template>

<style scoped lang="scss">
.containerRank {
  background: url("../../images/dataScreen-main-lt.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  height: 265px;
  .top {
    font-size: 20px;
    color: #fff;
  }
  .title {
    display: flex;
    column-gap: 30px;
    color: orange;
    border: 1px solid #2e89ff;
    margin: 30px 20px 10px 20px;
    background: url("../../images/rankingChart-bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 10px;
    .rank1{
      flex:1
    }
    .sc {
      flex: 1;
    }
    .am{
      flex: 2;
    }
  }
  .content {
    height: 270px;
    //background: #fff;
  }
}
</style>