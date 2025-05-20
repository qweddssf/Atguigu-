<template>
  <div class="spec-preview">
    <img :src="skuImageList[defaultIdx].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImageList[defaultIdx].imgUrl" ref="big" />
    </div>
    <!-- 绿色的遮罩块 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
// import { nextTick } from 'vue';
export default {
  name: "ZoomPart",
  props: ["skuImageList"],
  data() {
    return {
      defaultIdx: 0,
    };
  },
  mounted() {
    this.$bus.$on("getDefaultIdx", (idx) => {
      this.defaultIdx = idx;
    });
  },
  methods: {
    handler(e) {
      const mask_dom = this.$refs.mask;
      const big_dom = this.$refs.big;
      let left = e.offsetX - mask_dom.offsetWidth / 2;
      let top = e.offsetY - mask_dom.offsetHeight / 2;
      if (left < 0) left = 0;
      if (left > mask_dom.offsetWidth) left = mask_dom.offsetWidth;
      if (top < 0) top = 0;
      if (top > mask_dom.offsetHeight) top = mask_dom.offsetHeight;
      mask_dom.style.left = left + "px";
      mask_dom.style.top = top + "px";

      big_dom.style.left = -2 * left + "px";
      big_dom.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>