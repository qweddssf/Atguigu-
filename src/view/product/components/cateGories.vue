<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import GoryStore from "@/store/attrModule/attr";
import {hColgroup} from "element-plus/es/components/table/src/h-helper";

defineProps(['screen'])
let cateGoryStore = GoryStore()

const getC1 = () => {
  cateGoryStore.getC1()
}

onMounted(() => {
  cateGoryStore.c1Id=''
  cateGoryStore.c2Id=''
  cateGoryStore.c3Id=''
  getC1()
})
const c1IdChange = () => {
  cateGoryStore.c2Id=''
  cateGoryStore.c3Id=''
  cateGoryStore.c3Arr=[]
  cateGoryStore.getC2(cateGoryStore.c1Id)
}

const c2IdChange = () => {
  cateGoryStore.c3Id=''
  cateGoryStore.getC3(cateGoryStore.c2Id)
}

</script>

<template>
  <el-card style="margin:10px">
    <el-form>
      <el-form-item>
        <div class="container">
          <div>
            <span style="margin-right: 10px">一级分类</span>
            <el-select :disabled="screen!=0" v-model="cateGoryStore.c1Id" placeholder="Select" size="large" style="width: 240px" @change="c1IdChange">
              <el-option v-for="c1 in cateGoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
            </el-select>
          </div>
          <div>
            <span style="margin-right: 10px">二级分类</span>
            <el-select :disabled="screen!=0" v-model="cateGoryStore.c2Id" placeholder="Select" size="large" style="width: 240px" @change="c2IdChange">
              <el-option v-for="c2 in cateGoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
            </el-select>
          </div>
          <div>
            <span style="margin-right: 10px">三级分类</span>
            <el-select :disabled="screen!=0" v-model="cateGoryStore.c3Id" placeholder="Select" size="large" style="width: 240px">
              <el-option v-for="c3 in cateGoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<style scoped lang="scss">
.container{
  display: flex;
  flex:1;
  //align-items: center;
  justify-content: space-between;
  margin-top: 15px;

}
</style>