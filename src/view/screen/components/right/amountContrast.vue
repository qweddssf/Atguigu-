<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'

let chart = ref()
onMounted(() => {
  let myCharts = echarts.init(chart.value)
  myCharts.setOption({
    color: ['#0ffa54', '#f40e3a', '#0787f4'],
    title: {
      text: '年度游客对比量'
    },
    legend: {
      data: ['2021年', '2022年', '2023年'],
      right:20,
      textStyle: {
        color: '#fff',
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data:['1','2','3','4','5','6','7','8','9','10','11','12'],
      containLabel: true,
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
    },
    series: [
      {
      name: '2021年',
      type: 'line',
      stack: 'Total',
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
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250,140, 232, 101, 264, 90, 340, 250]
    },
      {
      name: '2022年',
      type: 'line',
      stack: 'Total',
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
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310,120, 282, 111, 234, 220, 340, 310]
    },
      {
        name: '2023年',
        type: 'line',
        stack: 'Total',
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
              color: 'rgb(55, 162, 255)'
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 132, 201, 334, 190, 130, 220,320, 132, 201, 334, 190, 130, 220]
      }
    ]

  })
})
</script>

<template>
<div class="containerA">
  <div class="top">
    <p>年度游客量对比</p>
    <img src="../../images/dataScreen-title.png" alt="">
  </div>
  <div class="content" ref="chart">

  </div>
</div>
</template>

<style scoped lang="scss">
.containerA{
  background: url("../../images/dataScreen-main-lt.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top{
    font-size: 20px;
    color: #fff;
  }
  .content{
    height: 225px;
  }
}
</style>