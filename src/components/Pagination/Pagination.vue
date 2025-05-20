<template>
  <div class="pagination" @click="getPage">
    <button
      :disabled="StarEnd.start == 1"
      @click="$emit('getPageNo', pageNo - 1)"
    >
      上一页
    </button>
    <button v-if="StarEnd.start >= 2">1</button>
    <button v-if="StarEnd.start >= 3">···</button>

    <template v-for="(page, idx) in StarEnd.end">
      <button
        v-if="page >= StarEnd.start"
        :key="idx"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </template>

    <button v-if="StarEnd.end < pageTotal - 1">···</button>
    <button v-if="StarEnd.end < pageTotal">{{ pageTotal }}</button>
    <button
      :disabled="pageNo == pageTotal"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>


<script>
export default {
  name: "PaginationPart",
  props: ["pageSize", "continues", "total", "pageNo"],
  computed: {
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    StarEnd() {
      const { continues, pageTotal, pageNo } = this;
      let start = 0;
      let end = 0;

      if (continues > pageTotal) {
        start = 1;
        end = pageTotal;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end >= pageTotal) {
          start = pageTotal - continues;
          end = pageTotal;
        }

        // [start, end] = [pageTotal - continues, pageTotal];
      }
      return { start, end };
    },
  },
  methods: {
    getPage(e) {
      if (e.target.nodeName == "DIV") return;
      const page = e.target.innerText.replace(/[^0-9]/gi, "");
      if (page) this.$emit("getPageNo", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
