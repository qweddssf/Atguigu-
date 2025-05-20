<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'

let chart = ref()
onMounted(()=>{
  let myCharts = echarts.init(chart.value)
  myCharts.setOption({
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      textStyle: {
        color: 'white'
      }
    },
    series:[{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside',
        fontSize: 15,
        color: 'skyblue'
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
        { value: 16, name: '10岁以下' },
        { value: 8, name: '10-18岁' },
        { value: 12, name: '18-30岁' },
        { value: 24, name: '30-40岁' },
        { value: 20, name: '40-60岁' },
        { value: 20, name: '60岁以上' }
      ]
    }
    ]
  })
})
</script>

<template>
  <div class="container3">
    <div class="top">
      <p>年龄比例</p>
      <img src="../images/dataScreen-title.png" alt="">
    </div>
    <div class="chart" ref="chart">

    </div>
  </div>
</template>

<style scoped lang="scss">
.container3 {
  background: url("../images/dataScreen-main-lb.png") no-repeat;
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