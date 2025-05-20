<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(itemInfo, idx) in cartInfolist"
          :key="idx"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="itemInfo.isChecked == 1"
              @click="updateCartShopisChecked(itemInfo.id)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="itemInfo.imgUrl" />
            <div class="item-msg">
              {{ itemInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ itemInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="handler('mins', -1, itemInfo)" class="mins">-</a>
            <input
              @click="handler('chan', $event.target.value * 1, itemInfo)"
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
              v-model="itemInfo.skuNum"
            />
            <a @click="handler('plus', 1, itemInfo)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ itemInfo.skuNum * itemInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteItemById(itemInfo.id)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @click="AllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedItem">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfolist() {
      return this.cartList.cartInfolist || [];
    },
    // 计算购买产品总价
    totalPrice() {
      let sum = 0;
      this.cartInfolist.forEach((element) => {
        if (element.isChecked == 1) sum += element.skuNum * element.skuPrice;
      });
      return sum;
    },
    isAllCheck() {
      if (this.cartInfolist.length == 0) return false;
      return this.cartInfolist.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartShopList");
    },
    handler: throttle(async function (type, value, cart) {
      switch (type) {
        case "plus":
          value = 1;
          break;
        case "mins":
          value = cart.skuNum > 1 ? -1 : 0;
          break;
        default:
          if (isNaN(value) || value < 1) value = 0;
          else {
            value = parseInt(value) - cart.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("updateCartShop", {
          skuId: cart.id,
          skuNum: value,
        });
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 1000),

    async deleteItemById(id) {
      try {
        await this.$store.dispatch("deleteShopCartId", id);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async updateCartShopisChecked(id) {
      const ischeck = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("updateCartShopisCheck", {
          skuId: id,
          isChecked: ischeck,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteAllCheckedItem() {
      try {
        await this.$store.dispatch("deleteAllCheckedItem");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async AllChecked(e) {
      const isChecked = e.target.checked;
      console.log(isChecked);

      try {
        await this.$store.dispatch("AllChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 16%;
        }

        .cart-list-con2 {
          width: 34%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 30%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>