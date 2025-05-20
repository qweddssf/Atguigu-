<script setup lang="ts">
import {reqSkuList} from "@/api/product/sku";
import {onMounted, ref} from "vue";
import type{skuResponseData,skuItem} from "@/api/product/types";

onMounted(() => {
  getAllSku()
})

let skuList = ref<skuItem[]>([])
let pageNo = ref(1)
let pageSize = ref(3)
let total = ref(100)
const getAllSku = async () => {
  let res:skuResponseData = await reqSkuList(pageNo.value,pageSize.value)
  if (res.code == 200) {
    skuList.value = res.data.records;
    pageNo.value = res.data.current
    pageSize.value = res.data.size
    total.value = res.data.total
  }
}
const updataPageSize = (current:number,size:number)=>{
  pageNo.value = current;
  pageSize.value = size
  getAllSku()
}
let iconChange = ref<boolean>(true)
let viewImg = ref<string>('')
let isView = ref<boolean>(false)
const ViewInfo = (row) => {
  viewImg.value = row.skuDefaultImg
  isView.value = true
}
</script>

<template>
  <div>
    <el-card style="margin:10px">
      <el-table border :data="skuList">
        <el-table-column label="序号" align="center" width="80" type="index"></el-table-column>
        <el-table-column label="名称"  prop="skuName"></el-table-column>
        <el-table-column label="描述"  prop="skuDesc"></el-table-column>
        <el-table-column label="默认图片"  prop="skuDefaultImg" align="center"  >
          <template #default="{row}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px;" />
          </template>
        </el-table-column>
        <el-table-column label="重量(g)" align="center" width="80" prop="weight"></el-table-column>
        <el-table-column label="价格(元)" align="center" width="80" prop="price"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template #default="{row,index}">
            <el-button size="small" :icon="iconChange?'Download':'Upload'" type="info" @click="iconChange = !iconChange"></el-button>
            <el-button size="small" icon="Edit" type="primary" ></el-button>
            <el-button size="small" icon="infoFilled" type="info" @click="ViewInfo(row)"></el-button>
            <el-button size="small" icon="Delete" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background :total="total" @change="updataPageSize" :default-page-size="3"
                     :page-sizes="[3,5,7]" layout="total, prev, pager, next,sizes,jumper" style="margin-top: 20px;"
      />
<!--      <el-dialog v-model="isView" @close="isView = false " center>-->
<!--        <img :src="viewImg" alt=""/>-->
<!--      </el-dialog>-->
      <el-drawer
          v-model="isView"
          title="查看商品详情"
      >
        <template #default>
          <el-row  style="margin: 10px 0;">
            <el-col :span="6">名称</el-col>
            <el-col :span="18"></el-col>
          </el-row >

          <el-row style="margin: 10px 0;">
            <el-col :span="6">描述</el-col>
            <el-col :span="18"></el-col>
          </el-row>
          <el-row style="margin: 10px 0;">
            <el-col :span="6">价格</el-col>
            <el-col :span="18"></el-col>
          </el-row>

        </template>
      </el-drawer>

    </el-card>
  </div>

</template>

<style scoped lang="scss">

</style>