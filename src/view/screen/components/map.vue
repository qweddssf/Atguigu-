<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'
import chinaJson from '../utils/china.json'

echarts.registerMap('china',chinaJson)

let map = ref()
onMounted(() => {
  let mychart = echarts.init(map.value)
  mychart.setOption({
    geo:{
      map:'china',
      roam:true,
      bottom:80,
      zoom:2.5,
      label:{
        show: true,
        fontSize: 10
      },
      itemStyle:{
        color:'#62bcd6',
      }
    },
    series: [{
        type:'lines',
        data:[
            {
              coords:[
                  [116.405285,39.904989],
                   [119.306239,26.075302]

              ],
              lineStyle:{
                color:'#131313',
                width:1
              },
           },
          {
            coords:[
              [116.405285,39.904989],
              [114.298,30.4854]
            ],
            lineStyle:{
              color:'#131313',
              width:1
            },
          }
        ],

        effect:{
          show:true,
          color:'#f6f5f5',
          symbol:'circle',
          symbolSize:10,
        }
    }]
  })
})
</script>

<template>
  <div class="containerMap" ref="map">

  </div>
</template>

<style scoped lang="scss">
.containerMap{
  margin-top: 40px;
}
</style>