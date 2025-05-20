<script setup lang="ts">
import getRolesList_ from "@/view/config/roleConfig/hooks/getRolesList";
import {onMounted,ref} from "vue";
import updateRoleInfo from "@/view/config/roleConfig/hooks/updateRoleInfo";
import allocatePower from "@/view/config/roleConfig/hooks/allocatePower";
import type { TreeInstance } from 'element-plus'

onMounted(() => {
  getRolesList();
})
let formRef = ref()
let {page,size,total,rolesList,getRolesList,
    changePage,searchKey,searchButton,resetKey
} = getRolesList_();
let {dialogVisible, tmpRoleName,rules,addRoleName,editRoleName,
  cancelRoleName,confirmRoleName,deleteRole} = updateRoleInfo(formRef,getRolesList);

const treeRef = ref<TreeInstance>()
let {drawer2,data,defaultProps,checkedPermission,
allocateButton,getCheckedKey,confirmButton}= allocatePower(treeRef);


</script>

<template>
  <div>

    <el-card style="margin:10px;height: 70px">
      <el-form class="demo-form-inline">
        <el-form-item label="角色名称" style="">
          <el-input v-model="searchKey" style="width: 150px"  placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchButton" :disabled="!searchKey">搜索</el-button>
          <el-button @click="resetKey">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin:10px">
      <el-button type="primary" icon="Plus" @click="addRoleName">添加职业</el-button>
      <el-table border style="margin: 10px 0;" :data="rolesList" >
        <el-table-column label="#" type="index" align="center" width="100"></el-table-column>
        <el-table-column prop="id" label="id" align="center" width="150"></el-table-column>
        <el-table-column show-overflow-tooltip prop="roleName" label="角色名称" align="center" width="100"></el-table-column>
        <el-table-column show-overflow-tooltip width="180" prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip width="180" prop="updateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" >
          <template #="{row,index}">
            <el-button type="primary" size="small" icon="User" @click="allocateButton(row.id)">分配权限</el-button>
            <el-button type="warning" size="small" icon="Edit" @click="editRoleName(row)">编辑</el-button>
            <el-popconfirm title="确定删除" @confirm="deleteRole(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next,,total,sizes, jumper" :total="total" :default-page-size="5"
                     :page-sizes="[3,5,7]" @change="changePage"
      />
    </el-card>
    <el-dialog v-model="dialogVisible" width="500" >
      <template #header>
          <span>添加</span>
      </template>
      <el-form label-position="right" style="width: 100%;margin-top: 10px" ref="formRef" :rules="rules">
        <el-form-item label="角色名称" prop="roleName" required>
          <el-input v-model="tmpRoleName" label-width="150px" placeholder="请填写角色名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelRoleName">取消</el-button>
          <el-button type="primary" @click="confirmRoleName">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <el-drawer v-model="drawer2">
      <template #header>
        <span>权限分配</span>
      </template>
      <template #default>
        <el-tree
            style="max-width: 600px"
            :data="data"
            ref="treeRef"
            show-checkbox
            node-key="id"
            :default-checked-keys="checkedPermission"
            :props="defaultProps"
            auto-expand-parent
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer2 = false">取消</el-button>
          <el-button type="primary" @click="confirmButton">确认</el-button>
        </div>
      </template>
    </el-drawer>
    <el-button @click="getCheckedKey"></el-button>
  </div>
</template>

<style scoped lang="scss">
.demo-form-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>