<script setup lang="ts">
import {reqGetAllTrademarks,reqTmImglist,reqSaleAttr,reqSaleAttrList} from "@/api/product/spu";
import {Plus} from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from 'element-plus'
import {
  spuItem,
  AlltradeMark,
  spuImgResponse,
  SaleAttrResponse,
  SaleAttrListResponse,
} from "@/api/product/types";
import {nextTick, reactive, ref} from "vue";

let $emit = defineEmits(['changeScreen']);
const fileList = ref<UploadUserFile[]>([])
let spuForm = reactive({
  AllTradeMarks:[],
  saleAttrList:[],
  saleAttrValueList:[],
  spuTM:'',
  spuName:'',
  description:'',
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const operateButton = (op) => {
  if(op == 'cancel') {
    $emit('changeScreen');
  }
}

const initSpuData = async (item:spuItem) => {
  if(Object.keys(item).length == 0){
    spuForm.spuName=''
    spuForm.description=''
    spuForm.saleAttrList=[]
    spuForm.saleAttrValueList=[]
    spuForm.AllTradeMarks=[]
    fileList.value=[]
    return
  }
  spuForm.spuName = item.spuName
  spuForm.description = item.description
  let res1:AlltradeMark = await reqGetAllTrademarks()
  if(res1.code == 200){
      spuForm.AllTradeMarks = res1.data
  }
  const spuId  = item.tmId
  spuForm.spuTM = spuForm.AllTradeMarks[spuId].tmName
  let res2:spuImgResponse = await reqTmImglist(spuId);
  //  获取TM的所有图片
  if(res2.code == 200){
    fileList.value = res2.data.map(item=>{
      return{
        name:item.imgName,
        url:item.imgUrl,
      }
    })
  }
  //  table里面的值
  let res3:SaleAttrResponse = await reqSaleAttr(spuId);
  if(res3.code == 200){
    spuForm.saleAttrList = res3.data
    console.log(res3.data)
  }
  // 所欲属性列表
  let res4:SaleAttrListResponse = await reqSaleAttrList(spuId);
  if(res4.code == 200){
    spuForm.saleAttrValueList = res4.data

  }
}

defineExpose({initSpuData})

</script>

<template>
  <el-form>
    <el-form-item label-width="100px" label="SPU名称">
      <el-input placeholder="请输入SPU名称" style="width: 150px;" v-model="spuForm.spuName"></el-input>
    </el-form-item>
    <el-form-item label-width="100px" label="SPU品牌" style="width: 250px;">
      <el-select v-model="spuForm.spuTM">
        <el-option v-for="item in spuForm.AllTradeMarks" :key="item.id" :label="item.tmName" :value="item.tmName"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label-width="100px" label="SPU描述">
      <el-input type="textarea" placeholder="请输入描述" v-model="spuForm.description"></el-input>
    </el-form-item>
    <el-form-item label-width="100px" label="SPU照片">
      <el-upload
          v-model:file-list="fileList"
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label-width="100px" label="SPU销售属性" >
      <el-select style="width: 200px;margin-right: 10px">
        <el-option v-for="item in spuForm.saleAttrValueList" :key="item.id" :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-button type="primary" size="default" icon="Plus">添加销售属性</el-button>
      <el-table border style="margin: 10px 0" :data="spuForm.saleAttrList">
        <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名字" prop="saleAttrName" align="center"></el-table-column>
        <el-table-column label="销售属性值" prop="spuSaleAttrValueList" align="center">
          <template #="{row}">
            <el-tag closable v-for=" item in row.spuSaleAttrValueList" :key="item.id" style="margin: 4px">{{item.saleAttrValueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80px">
          <template #default="{row}">
            <el-popconfirm title="确认删除?" >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" >保存</el-button>
      <el-button type="info" size="default" @click="operateButton('cancel')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped >
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>