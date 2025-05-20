<script setup lang="ts">
import getAllPermission from "@/view/config/menuConfig/hooks/getAllPermission";
import updatePermission from "@/view/config/menuConfig/hooks/updatePermission";
import {ref} from "vue";

let formRef = ref()
let {initList,permissionList} = getAllPermission()
const {dialogVisible,name,code,rules,addNameCode,editNameCode,
      cancelDialog,confirmDialog,deleteMenu} = updatePermission(initList,formRef)

</script>

<template>
  <div>
    <el-card style="margin: 10px">
      <el-table
          :data="permissionList"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
      >
        <el-table-column align="center" prop="name" label="名称" width="250"></el-table-column>
        <el-table-column align="center" prop="code" label="权限值" width="150"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{row,index}">
            <el-button type="warning" size="small" icon="Edit" :disabled="row.level == 4" @click="addNameCode(row)">添加菜单</el-button>
            <el-button type="primary" size="small" icon="User" :disabled="row.level == 1" @click="editNameCode(row)">编辑</el-button>
            <el-popconfirm title="确定删除" @confirm="deleteMenu(row.id)"> >
              <template #reference>
                <el-button type="info" size="small" icon="Delete" :disabled="row.level == 1">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" width="500" >
      <template #header>
        <span>添加菜单</span>
      </template>
      <el-form label-position="right" style="width: 100%;margin-top: 10px" ref="formRef" :rules="rules">
        <el-form-item label="菜单名称" prop="name" label-width="100">
          <el-input v-model="name" label-width="150px" placeholder="请填写角色名称"></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="code" label-width="100">
          <el-input v-model="code" label-width="150px" placeholder="请填写角色名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelDialog">取消</el-button>
          <el-button type="primary" @click="confirmDialog">确定</el-button>
        </div>
      </template>

    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>