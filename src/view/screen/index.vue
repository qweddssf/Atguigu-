<script setup lang="ts">
import {ref,onMounted} from 'vue'
import topNav from './topNav.vue'
import ageSRatio from './components/age.vue'
import genderRatio from './components/gender.vue'
import touristSta from './components/tourist.vue'

import mapVue from './components/map.vue'
import midLine from './components/midLine.vue'

import rankVue from './components/right/rank.vue'
import amountContrast from './components/right/amountContrast.vue'
import statistic from './components/right/statistic.vue'

let screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
})

function getScale(w=1920,h=1080){
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}
window.onresize = function(){
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
}

</script>

<template>
    <div class="container">
      <div class="screen" ref='screen'>
        <topNav></topNav>
        <div class="bottomBox">
          <div class="Left">
            <tourist-sta class="tourist"></tourist-sta>
            <genderRatio class="gender"></genderRatio>
            <ageSRatio class="age"></ageSRatio>
          </div>
          <div class="Mid">
            <map-vue class="map"></map-vue>
            <midLine class="midline"></midLine>
          </div>
          <div class="Right">
            <rank-vue class="rank"></rank-vue>
            <amount-contrast class="amount"></amount-contrast>
            <statistic class="statistic"></statistic>
          </div>
        </div>
      </div>

    </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("@/view/screen/images/bg.png") no-repeat;
  background-size: cover;
  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top:50%;
    left:50%;
    transform-origin: top left;
  }

  .bottomBox{
    display: flex;

    .Left{
      flex: 1;
      display: flex;
      height: 1040px;
      flex-direction: column;
      .tourist{
        flex: 1.5;
        width: 100%;
      }
      .age {
        flex:1;
        width: 100%;
      }
      .gender {
        width: 100%;
        flex:1;
      }


    }
    .Mid{
      flex: 2;
      display: flex;
      flex-direction: column;
      .midline{
        flex:1;
      }
      .map{
        flex:3;
      }
    }
    .Right{
      flex: 1;
      display: flex;
      margin-left: 20px;
      height: 1040px;
      flex-direction: column;
      .rank{
        flex:1.5;
      }
      .amountContrast {
        flex: 1;
      }
      .statistic {
        flex: 1;

      }
    }
  }


}
</style>