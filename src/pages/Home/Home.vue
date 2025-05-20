<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />

    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer.vue";
import Recommend from "./Recommend/Recommed.vue";
import Rank from "./Rank/Rank.vue";
import Like from "./Like/Like.vue";
import Floor from "./Floor/Floor.vue";
import Brand from "./Brand/Brand.vue";

import { mapState } from "vuex";
export default {
  name: "HomePage",
  computed: {
    ...mapState({ floorList: (state) => state.home.floorList }),
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style>
</style>