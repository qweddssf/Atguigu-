<script setup lang="ts">
import {ref, onMounted, reactive} from "vue";
import {getTrademarkList,updateTrademark,deleteTrademark} from '@/api/product/trademark.ts'
import type {tradeMarkList,trademarkListResponse,tradeMarkItem,ResponseData} from '@/api/product/types'
import {ElMessage, ElNotification} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(100)
let trademarkArr = ref<tradeMarkList>([])
// 添加内容的弹窗控制
const dialogVisible = ref(false)
const title = ref<string>('')
let formRef = ref()

const GettrademarkList = async () => {
  let res:trademarkListResponse = await getTrademarkList(pageNo.value,pageSize.value)
  if(res.code ==200){
    trademarkArr.value = res.data.records;
    pageNo.value = res.data.current;
    pageSize.value = res.data.size;
    total.value = res.data.total;
  }
}

onMounted(() => {
  GettrademarkList()
})

const updataPageNo = (current:number,size:number)=>{
  pageNo.value = current;
  pageSize.value = size
  GettrademarkList()
}

const addForm = reactive<tradeMarkItem>({
  id:-1,
  tmName:"",
  logoUrl:""
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  addForm.logoUrl = response.data.url
  formRef.value.clearValidate('logoUrl')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('必须为jpg形式图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片文件大小不得超过2M!')
    return false
  }
  return true
}
// 更新TM的接口回调
const updataTM = async () => {
  // 校验表单
  let isValidate = false
  await formRef.value.validate().then(()=>{
    isValidate = true
  }).catch( (error)=> {
    for(let item in error){
      ElNotification.error({
        type: 'error',
        title: error[item][0].message,
      })
    }

  })
  if(!isValidate) return
  // 发送请求
  let res:ResponseData = await updateTrademark(addForm)
  if(res.code ==200){
    ElNotification.success({
      type: 'success',
      title: res.message,
    })
    GettrademarkList()
  }else{
    ElNotification.error({
      type: 'error',
      title: res.message,
    })
  }
  addForm.id = -1
  addForm.logoUrl = ''
  addForm.tmName = ''
  dialogVisible.value = false
}
// 弹窗中的取消和确认回调
const operate = (op) => {
  if(op == 'confirm'){
    updataTM()
  }else{
    addForm.id = -1
    addForm.logoUrl = ''
    addForm.tmName = ''
    dialogVisible.value = false
    formRef.value.clearValidate('logoUrl')
    formRef.value.clearValidate('tmName')

  }
}
// 增加TM的按钮回调
const addTrademark = () => {
  title.value = '添加品牌'
  addForm.tmName = '';
  addForm.logoUrl = '';
  dialogVisible.value = true
}
// 编辑按钮
const editButton = (row)=>{
  title.value = "修改品牌"
  addForm.logoUrl = row.logoUrl
  addForm.tmName = row.tmName
  addForm.id = row.id
  dialogVisible.value = true;
}
// 删除TM 的接口回调
const deleteTM = async ()=>{
  let res:ResponseData = await deleteTrademark(addForm.id)
  if(res.code ==200){
    ElNotification.success({
      type: 'success',
      title: res.message,
    })
    GettrademarkList()
  }else{
    ElNotification.error({
      type: 'error',
      title: res.message,
    })
  }
}

// 校验规则
const tmNameValidator = (rule:any,value:any,callBack:any)=>{
  if(value.trim().length>2) {callBack()}
  else{callBack(new Error('品牌名称需要大于两位'))}
}
const logoValidator = (rule:any,value:any,callBack:any)=>{
  if(value){
    callBack()
  }else{
    callBack(new Error('logo必须上传'))
  }
}
const rules = {
  tmName: [{required:true,trigger:'blur',validator:tmNameValidator}],
  logoUrl: [{required:true,validator:logoValidator}],
}
</script>

<template>
  <div>
    <el-card style="margin:10px">
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <el-table border style="margin:10px 0" :data="trademarkArr">
        <el-table-column prop="id" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称" align="center"></el-table-column>
        <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
          <template #="{row}">
            <img :src="row.logoUrl" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column  label="品牌操作" align="center">
          <template #default="{row}">
            <el-button icon="Edit" size="small" @click="editButton(row)">
              编辑
            </el-button>
            <el-popconfirm title="确认删除?" @confirm="deleteTM">
              <template #reference>
                <el-button size="small" type="danger" icon="Delete" @click="addForm.id = row.id">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background :total="total" @change="updataPageNo" :default-page-size="3"
       :page-sizes="[3,5,7]" layout="total, prev, pager, next,sizes,jumper"
      />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="title" width="500" @close="operate('close')">
      <el-form :model="addForm" label-position="right" style="width: 80%" :rules="rules" ref="formRef">
        <el-form-item label="品牌名字" label-width="100px" prop="tmName">
          <el-input v-model="addForm.tmName" label-width="150px" placeholder="输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
          <el-upload
              class="avatar-uploader"
              action="myServer/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="addForm.logoUrl" :src="addForm.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>


      <template #footer>
        <div class="dialog-footer">
          <el-button @click="operate('cancel')">取消</el-button>
          <el-button type="primary" @click="operate('confirm')">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>

  </div>

</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
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