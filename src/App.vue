<template>
  <div>
    <Header> </Header>
    <router-view></router-view>
    <!--  在Home Search下显示  在登录 注册 因此Footer -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    this.$store.dispatch("reqCategoryList");
  },
};
</script>

<style>
</style>
