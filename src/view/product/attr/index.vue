<script setup lang="ts">
import category from '../components/cateGories.vue'
import GoryStore from "@/store/attrModule/attr";
import {watch, ref, reactive, nextTick} from "vue";
import {reqAttrInfoList,attrAdd_Update,deleteAttr} from "@/api/product/att"
import type {attrResponseData,attrItem} from "@/api/product/types";
import {ElNotification} from "element-plus";

let cateGoryStore = GoryStore()
const items = ref<Array<Item>>(['primary', 'success', 'info', 'warning', 'danger',
])
let attrList = ref<attrItem[]>()
let screen = ref<boolean>(true)
let attrForm = reactive<attrItem>({
  id:"",
  attrName:"",
  attrValueList:[],
  categoryId:"",
  categoryLevel:3
})
let inputArr = ref<any>([])
watch(()=>cateGoryStore.c3Id, (newVal, oldVal) => {
  if(newVal){
    getAttr()
  }else{
    attrList.value = []
  }
})

const getAttr = async () => {
  const {c1Id,c2Id,c3Id} = cateGoryStore
  let res:attrResponseData = await reqAttrInfoList(c1Id,c2Id,c3Id)
  if(res.code == 200){
    attrList.value = res.data
  }else{
    ElNotification.error({
      type: 'error',
      title: res.message,})
  }
}

const addAttrList = () => {
  attrForm.attrValueList.push({
    id:'',
    valueName:"",
    attrId:"",
    isShow:true,
  })
  nextTick(()=>{
    inputArr.value[attrForm.attrValueList.length-1].focus()
  })
}

const saveCallback = async () => {
  attrForm.categoryId = cateGoryStore.c3Id
  console.log(attrForm)
  let res = await attrAdd_Update(attrForm)
  if(res.code == 200){
    ElNotification.success({
      type: "success",
      title: res.message,})
    getAttr()
  }else{
    ElNotification.error({
      type: 'error',
      title: res.message,})
  }
  screen.value = !screen.value
}

const restForm = (obj) =>{
  if (Object.keys(obj).length === 0){
    Object.assign(attrForm,{
      attrName:'',
      attrValueList:[],
      categoryId:'',
      categoryLevel:3,
    })
  }else{
    Object.assign(attrForm,obj)
  }


}
const cancelCallback = () => {
  restForm({})
  screen.value = !screen.value
}

const attrBlur = (row,index) => {
  let errorMsg = ""
  if(!row.valueName){
    row.isShow = true
    errorMsg = "属性值名称不能为空"
  }

  let repeat = attrForm.attrValueList.find( item => {
    if(item != row)
      return item.valueName === row.valueName
  })
  if(repeat){
    errorMsg = '属性值不能重复'
  }
  if(errorMsg){
    ElNotification.error({
      type: 'error',
      title: errorMsg,
    })
    deleteAttrValue(index)
    return
  }
  row.isShow = false
}
const deleteAttrValue = (index) => {
  attrForm.attrValueList.splice(index,1)
}
const editButton = (row) => {
  screen.value = false
  restForm(JSON.parse(JSON.stringify(row)))
}
const deletAttrButton = async (id:number) => {
  let res:ResponseData = await deleteAttr(id)
  if(res.code == 200){
    ElNotification.success({
      type: 'success',
      title: res.message,})
    getAttr()
  }else{
    ElNotification.error({
      type: 'error',
      title: res.message,})
  }
}

</script>

<template>
  <div >
    <category :screen="screen"></category>
    <el-card style="margin:10px">
      <div v-show="screen">
        <el-button type="primary" size="default" icon="Plus" :disabled="!cateGoryStore.c3Id" @click="screen = !screen;restForm({})">添加属性平台</el-button>
        <el-table border style="margin:10px" :data="attrList">
        <el-table-column align="center" type="index" label="序号" width="100"></el-table-column>
        <el-table-column align="center" label="属性名称" width="120" prop="attrName">
        </el-table-column>
        <el-table-column align="center" label="属性值名称" prop="attrValueList">
          <template #="{row,index}">
                <el-tag :type="items[index % items.length]" v-for="(item,index) in row.attrValueList" :key="item.name" style="margin: 4px">{{item.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template #default="{row}">
            <el-button icon="Edit" size="small" @click="editButton(row)">
              编辑
            </el-button>
            <el-popconfirm title="确认删除?" @confirm="deletAttrButton(row.id)" >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      </div>

      <div  v-show="!screen">
        <el-form>
          <el-form-item label="属性名称" >
            <el-input v-model="attrForm.attrName" style="width: 150px" placeholder="请输入属性名称"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" size="default" icon="Plus" :disabled="!attrForm.attrName" @click="addAttrList">添加属性值</el-button>
            <el-button  size="default" @click="cancelCallback">取消</el-button>
          </el-form-item>
        </el-form>
        <el-table border style="margin:10px" :data="attrForm.attrValueList">
          <el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
          <el-table-column label="属性值名称" align="center" prop="valueName">
            <template #default="{row,$index}">
              <el-input :ref="(vc:any) => inputArr[$index] = vc " v-if="row.isShow" v-model="row.valueName" @blur="attrBlur(row,$index)" :autofocus="true"></el-input>
              <div v-else @click="row.isShow = true">{{row.valueName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120x" >
            <template #default="{row,$index}">
              <el-button size="small" type="danger" icon="Delete" @click="deleteAttrValue($index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="saveCallback" :disabled="!attrForm.attrName">保存</el-button>
        <el-button  size="default" @click="cancelCallback">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>