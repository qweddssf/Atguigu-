<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span v-if="!userName">
              <router-link to="/login">登录</router-link>
              <router-link to="/register" class="register"
                >免费注册</router-link
              >
            </span>
            <span v-else>
              <a>{{ userName }}</a>
              <!-- <a>{{ nickname }}</a> -->
              <a class="register" @click="handleLogout">退出登录</a>
            </span>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "HeaderIndex",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.userInfo.name,
      // nickname: (state) => state.user.userInfo.nickname,
    }),
  },
  methods: {
    ...mapActions(["getUserInfo", "logout"]),
    goSearch() {
      let loc = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };

      if (this.$route.query) loc.query = this.$route.query;
      this.$router.push(loc, () => {});
      this.keyword = "";
    },
    async handleLogout() {
      try {
        // 调用退出登录的action
        await this.logout();
        // 跳转到登录页
        this.$router.push("/login");
      } catch (error) {
        alert("退出登录失败");
      }
    },
  },
  async mounted() {
    // 如果有token，获取用户信息
    if (this.$store.state.user.token) {
      try {
        await this.getUserInfo();
      } catch (error) {
        console.error("获取用户信息失败:", error);
      }
    }
  },
};
</script>

<style scoped lang='less'>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>