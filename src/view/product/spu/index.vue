<script setup lang="ts">
import category from '../components/cateGories.vue'
import GoryStore from "@/store/attrModule/attr";
import {ref, watch} from "vue";
import {reqSpuList} from "@/api/product/spu";
import type {spuItem,spuResponse} from "@/api/product/types";
import {ElNotification} from "element-plus";
import skuForm from './skuForm.vue'
import SpuForm from "@/view/product/spu/spuForm.vue";

let cateGoryStore = GoryStore()
let screen = ref<number>(0)
let total = ref(0)
let currentPage = ref(1)
let pageSize = ref(3)
let spuList = ref<spuItem[]>([])
let spu = ref<any>()

watch(()=>cateGoryStore.c3Id, (newVal, oldVal) => {
  if(newVal){
    getSpu()
  }else{
    spuList.value = []
  }
})

const getSpu = async () => {
  let res:spuResponse = await reqSpuList(currentPage.value, pageSize.value,cateGoryStore.c3Id)
  if(res.code == 200){
    spuList.value = res.data
    total.value = res.data.total
  }else{
    ElNotification.error({
      type: 'error',
      title: res.message,})
  }
}

const updataPage = (current:number,size:number)=>{
  currentPage.value = current;
  pageSize.value = size
  getSpu()
}

const editShowPage = () => {
  screen.value = 0
}
const addSpuButton = () => {
  screen.value = 1
  spu.value.initSpuData({})
}

const editSpuButton = (row:spuItem) => {
  screen.value = 1
  spu.value.initSpuData(row)

}
</script>

<template>
<div>
  <category :screen="screen"></category>
  <el-card>
    <div v-show="screen == 0">
      <el-button type="primary" size="default" icon="Plus" :disabled="!cateGoryStore.c3Id" @click="addSpuButton">添加SPU</el-button>
      <el-table  border style="margin:10px" :data="spuList.records" >
        <el-table-column label="序号"   align="center" type="index" width="80"></el-table-column>
        <el-table-column prop="spuName" label="SPU名称" align="center"></el-table-column>
        <el-table-column prop="description" label="SPU描述" align="center"></el-table-column>
        <el-table-column  label="SPU操作" align="center">
          <template #default="{row,index}">
            <el-button size="small" icon="Plus" type="primary"></el-button>
            <el-button size="small" icon="Edit" type="warning" @click="editSpuButton(row)"></el-button>
            <el-button size="small" icon="View" type="info"></el-button>
            <el-button size="small" icon="Delete" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background  :total="total"  :default-page-size="3" @change="updataPage"
                     :page-sizes="[3,5,7]" layout="total, prev, pager, next,sizes,jumper"
      />
    </div>
    <spu-form v-show="screen == 1" ref="spu" @changeScreen="editShowPage"></spu-form>
    <skuForm v-show="screen == 2"></skuForm>
  </el-card>
</div>
</template>

<style scoped lang="scss">

</style>