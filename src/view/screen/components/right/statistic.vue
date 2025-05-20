<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'

let chart = ref()
onMounted(() => {
  let myChart = echarts.init(chart.value)
  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left:'15%',
      type: 'scroll',
      orient: 'vertical',
      textStyle: {
        color: 'white'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 42, name: '搜索引擎' },
          { value: 10, name: '导演' },
          { value: 20, name: '邮箱' },
          { value: 38, name: '视频广告' }
        ]
      }
    ]
  })
})
</script>

<template>
<div class="containerSta">
  <div class="top">
    <p>预约通道数据统计</p>
    <img src="../../images/dataScreen-title.png" alt="">
  </div>
  <div class="chart" ref="chart">

  </div>
</div>
</template>

<style scoped lang="scss">
.containerSta {
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top{
    font-size: 20px;
    color: #fff;
  }
  .chart{
    margin-top: 15px;
    width: 100%;
    height: 210px;
    //background: #fff;
  }
}
</style>