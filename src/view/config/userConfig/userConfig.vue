<script setup lang="ts">
import {onMounted, ref} from "vue";

import allocateRoles from "@/view/config/userConfig/hooks/allocateRoles";
import refreshRolesList from '@/view/config/userConfig/hooks/refreshRoleList'
import {formUpdate} from "@/view/config/userConfig/hooks/updateRoleInfo";
import DeleteUser from "@/view/config/userConfig/hooks/deleteUser";
import searchUserInfo from "@/view/config/userConfig/hooks/searchUserInfo";

onMounted(() => {
  getUserInfoList()
})
let {page,size,total,userInfoList,changePage,getUserInfoList} = refreshRolesList()

let formRef = ref<any>()
let {
  showDrawer,title,userInfoForm,addUserConfig,rules,
    editUserConfig,clickCancel,clickConfirm
} = formUpdate(formRef,getUserInfoList)
let {usn,allocate,drawer2,checkAll,isIndeterminate,handleCheckAllChange,
  checkedRoles,handleCheckedRolesChange,roles,confirmRole}= allocateRoles(getUserInfoList)

const {DeleteUserConfirm,getListId,confirmBatchRemove} = DeleteUser(getUserInfoList)

let {searchButton,resetButton,searchKey} = searchUserInfo({page,size,total,userInfoList})

</script>

<template>
  <div>
    <el-card style="margin:10px;height: 70px">
      <el-form class="demo-form-inline">
        <el-form-item label="用户名" style="">
          <el-input style="width: 150px" v-model="searchKey" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="Plus" @click="searchButton" :disabled="!searchKey">搜索</el-button>
          <el-button icon="Delete" @click="resetButton">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin:10px">
      <el-button type="primary" icon="Plus" @click="addUserConfig">添加</el-button>
      <el-button type="primary" icon="Delete" @click="confirmBatchRemove">批量删除</el-button>
      <el-table border style="margin: 10px 0;" :data="userInfoList" @selectionChange="getListId">
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="#" type="index" align="center" width="50"></el-table-column>
        <el-table-column prop="id" label="id" align="center" width="80"></el-table-column>
        <el-table-column show-overflow-tooltip prop="username" label="用户名字" align="center" width="100"></el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="用户昵称" align="center" width="100"></el-table-column>
        <el-table-column show-overflow-tooltip prop="roleName" label="用户角色" width="100" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip width="150" prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip width="150" prop="updateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" >
          <template #="{row,index}">
            <el-button type="primary" size="small" icon="User" @click="allocate(row)">分配角色</el-button>
            <el-button type="warning" size="small" icon="Edit" @click="editUserConfig(row)">编辑</el-button>
            <el-popconfirm :title="`确定删除${row.username}`" @confirm="DeleteUserConfirm(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, prev, pager, next,sizes, jumper" :total="total" :default-page-size="5"
                     :page-sizes="[3,5,7]" @change="changePage"
      />
    </el-card>
    <el-drawer v-model="showDrawer">
      <template #header>
        <h4>{{title}}</h4>
      </template>
      <template #default>
        <el-form :model="userInfoForm" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input v-model="userInfoForm.username" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="userInfoForm.name" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item v-show="title!='编辑用户'" label="用户密码" prop="password">
            <el-input v-model="userInfoForm.password" placeholder="请输入用户密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="clickCancel">取消</el-button>
          <el-button type="primary" @click="clickConfirm">确认</el-button>
        </div>
      </template>
    </el-drawer>

    <el-drawer v-model="drawer2">
      <template #header>
        <span>角色分配</span>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="usn" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
            @change="handleCheckAllChange">
              全选</el-checkbox>
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
              <el-checkbox v-for="(role,index) in roles" :key="index"  :value="role">{{role}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer2 = false">取消</el-button>
          <el-button type="primary" @click="confirmRole">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.demo-form-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>