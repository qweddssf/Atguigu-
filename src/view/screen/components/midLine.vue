<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'
let chart = ref()
onMounted(() => {
  let myCharts = echarts.init(chart.value)
  myCharts.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data:['周一','周二','周三','周四','周五','周六','周日'],
      splitLine: {
        show: false
      },
      axisTick:{
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisTick:{
        show: true
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      containLabel: true,
    },
    series: [
      {
        name: 'Line 1',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(217,221,122)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
    ]
  })
})

</script>

<template>
  <div class="containerLine">
    <div class="top">
      <p>未来7天游客预测图</p>
      <img src="../images/dataScreen-title.png" alt="">
    </div>
    <div class="chart" ref="chart">

    </div>
  </div>
</template>

<style scoped lang="scss">
.containerLine{
  background: url("../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin-left:20px;
  .top{
    font-size: 20px;
    color: #fff;
  }
  .chart{
    height: 180px;
  }
}
</style>