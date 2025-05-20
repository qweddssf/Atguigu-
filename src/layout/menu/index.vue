<script setup lang="ts">

defineProps(['menulist'] as const);

</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<template>
  <template v-for="item in menulist" :key="item.path">
    <el-menu-item v-if="!item.children" :index="item.path">
      <img :src="item.meta.icon" alt="" style="height: 20px;width: 20px;margin-right: 10px" />
      <span>{{item.meta.title}}</span>
    </el-menu-item>
    <el-menu-item v-if="item.children&&item.children.length == 1" :index="item.children[0].path">
      <template #title>
        <img :src="item.children[0].meta.icon" alt="" style="height: 20px;width: 20px;margin-right: 10px" />
        <span>{{item.children[0].meta.title}}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-if="item.children&&item.children.length > 1" :index="item.path">
        <template #title>
          <img :src="item.meta.icon" alt="" style="height: 20px;width: 20px;margin-right: 10px" />
          <span>{{item.meta.title}}</span>
        </template>
        <Menu :menulist="item.children"></Menu>
    </el-sub-menu>
  </template>

</template>

<style scoped lang="scss">

</style>