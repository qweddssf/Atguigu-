<script setup lang="ts">
import logo_setting from "../../logo_setting.ts";
</script>

<template>
  <div class="logo" v-if="logo_setting.hidden">
    <img :src="logo_setting.logo">
    <p>{{logo_setting.title}}</p>
  </div>
</template>

<style scoped lang="scss">
  .logo{
    display: flex;
    width:250px;
    align-items: center;
    padding: 10px;
    column-gap: 5px;
    img{
      width:40px;
      height:40px;
    }
    p{
      color:#fff;
      white-space: nowrap;
    }
  }
</style>