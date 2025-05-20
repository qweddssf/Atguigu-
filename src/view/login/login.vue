<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue'
import {reactive,ref} from "vue";
import useUserStore from "../../store/userModule/user.ts";
import {ElNotification} from "element-plus";
import {useRouter,useRoute} from "vue-router";

let LoginForm = ref()
let $router = useRouter();
let $route = useRoute();
let loginform = reactive({
  username: 'admin',
  password: '123456',
})

let userStore = useUserStore()
const login_click = async () => {

  // 校验
  try{
    await LoginForm.value.validate()
    userStore.userLogin(loginform).then(() => {
      let redirect:any = $route.query.redirect;
      $router.push({path:redirect || '/'})

      ElNotification.success({
        type: 'success',
        title: '登录成功',
      })
    }).catch((err) => {
      ElNotification.error({
        type: 'error',
        message: (err as Error).message,
      })
    })
  }catch(error:any){
    ElNotification.error({
      type: 'error',
      message: error.username[0].message,
    })
  }
}

const rules = {
  username: [
    {required: true,message:'用户名不能为空',trigger:'blur'},
    {required:true,min:5,max:10,message: '账号长度只少5位',trigger:'blur'},
  ],
  password: [
    {required: true,message:'密码不能为空',trigger:'blur'},
    {required:true,min:6,max:15,message:'密码长度只是6位',trigger:'blur'},
  ],
}

</script>

<template>
    <div class="container">
        <el-row>
          <el-col :span="12" :xs="0"></el-col>

          <el-col :span="12" :xs="24">
            <el-form class="login-form" :model="loginform" :rules="rules">
                <h1>Hello</h1> <br>
                <h2>硅谷甄选</h2>
              <el-form-item prop="username" ref="LoginForm">
                <el-input :prefix-icon="User" v-model="loginform.username"> </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input :prefix-icon="Lock" v-model="loginform.password" :show-password="true"> </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%" size="default" @click="login_click"> 登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">

    .container {
      width: 100%;
      height:100vh;
      background:url("src/assets/images/background.jpg") no-repeat;
      background-size: cover;
      .login-form {
        position: relative;
        padding: 40px;
        width: 80%;
        top: 30vh;
        background:url("src/assets/images/login_form.png") no-repeat;
        background-size: cover;

        h2 {
          color: white;
          margin:10px 0
        }
        h1 {
          font-size:40px;
          color: white;
          //margin: 10px 0;
        }
      }

    }
</style>