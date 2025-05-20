<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'

let chart = ref()
onMounted(()=>{
  let myCharts = echarts.init(chart.value)
  myCharts.setOption({
    title:{
      text:'男女比例',
      left:'center',
      top:'-5%'
    },
    xAxis: {
      show:false,
      min:0,
      max:100
    },
    yAxis: {show:false,type:'category'},
    series:[{
      type:'bar',
      data:[58],
      color:'#2e89ff',
      barWidth:20,
      barGap:'-95%',
      itemStyle:{
        borderRadius:20
      },
      z:100
    },
      {
        type:'bar',
        data:[100],
        color:'#5fafda',
        barWidth:20,
        itemStyle:{
          borderRadius:20
        },
      }
    ],
    grid:{
      top:0,
      bottom:0,
      left:0,
      right:0,
    }
  })
})
</script>

<template>
  <div class="container3">
    <div class="top">
      <p>男女比例</p>
      <img src="../images/dataScreen-title.png" alt="">
    </div>
    <div class="imgTitle">
      <div class="men">
        <span>男士</span>
        <img src="../images/man.png" alt="">
      </div>
      <div class="women">
        <span>女士</span>
        <img src="../images/woman.png" alt="">
      </div>
    </div>
    <div class="genderRatio">
      <span>男士比例58%</span>
      <span>女士比例42%</span>
    </div>
    <div class="chartArea1" ref='chart'>

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
  .imgTitle{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    column-gap: 40px;
    span{
      padding-bottom: 10px;
      color: #fff;
    }
    .men{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding:0 20px;
      background: url("../images/man-bg.png") no-repeat;
      background-size: 100% 100%;

    }
    .women{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding:0 20px;
      background: url("../images/woman-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    img{
      width: 80px;
      height:80px;
    }
  }

  .genderRatio{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    span{
      color: #fff;
      font-size: 15px;
    }
  }
  .chartArea1{
    margin-top: 5px;
    //background: #fff;
    height: 60px;
  }
}
</style>