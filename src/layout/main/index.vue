<script setup lang="ts">
import layoutStore from '../../store/layoutModule/layout.ts'
let layoutSetting = layoutStore()
import {nextTick, ref, watch} from "vue";

let flag = ref(true)
watch(() => layoutSetting.refsh, () => {
  flag.value = false;
  nextTick(() => {
    flag.value = true;
  })
})

</script>

<template>
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
</template>

<style scoped lang="scss">
.fade-enter-from{
  opacity: 0;
}
.fade-enter-active{
  transition: all 1s;
}

.fade-enter-to{
  opacity: 1;
}
</style>