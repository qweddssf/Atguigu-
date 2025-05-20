<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          v-model="registerForm.phone"
          placeholder="请输入你的手机号"
        />
        <span class="error-msg" v-show="!registerForm.phone">请输入手机号</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          v-model="registerForm.code"
          placeholder="请输入验证码"
        />
        <button @click="handleGetCode" style="width: 100px; height: 38px">
          点击获取验证码
        </button>
        <span class="error-msg" v-show="!registerForm.code"
          >验证码不能为空</span
        >
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          v-model="registerForm.password"
          placeholder="请输入你的登录密码"
        />
        <span class="error-msg" v-show="!registerForm.password"
          >密码不能为空</span
        >
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          v-model="registerForm.confirmPassword"
          placeholder="请输入确认密码"
        />
        <span class="error-msg" v-show="!registerForm.confirmPassword"
          >确认密码不能为空</span
        >
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg" v-show="!registerForm.agree">错误提示信息</span> -->
      </div>
      <div class="btn">
        <button @click="handleRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegisterPage",
  data() {
    return {
      registerForm: {
        phone: "",
        code: "",
        password: "",
        confirmPassword: "",
      },
      agree: false,
    };
  },
  methods: {
    ...mapActions(["register", "getCode"]),
    async handleGetCode() {
      if (!this.registerForm.phone) {
        alert("请输入手机号");
        return;
      }
      // if (!/^(13|14|15|16|17|18|19)\d{9}$/.test(this.registerForm.phone)) {
      //   alert("请输入正确的手机号");
      //   return;
      // }
      try {
        await this.getCode();
        alert("验证码已发送");
        this.registerForm.code = this.$store.state.user.code;
      } catch (error) {
        alert("获取验证码失败");
      }
    },
    async handleRegister() {
      if (!this.agree) {
        alert("请同意用户协议");
        return;
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert("两次输入的密码不一致");
        return;
      }

      try {
        const result = await this.register(this.registerForm);
        if (result == "ok") {
          alert("注册成功");
          this.$router.push("/login");
        } else {
          alert(result.message || "注册失败");
        }
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>