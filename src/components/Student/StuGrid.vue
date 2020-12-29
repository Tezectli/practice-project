<template>
  <van-grid :column-num="4">
    <van-grid-item to="/s/addFriend">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-jiahaoyou" />
      </svg>
      <span class="grid-title">好友管理</span>
    </van-grid-item>
    <van-grid-item to="/s/myorder">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-dingdan" />
      </svg>
      <span class="grid-title">我的订单</span>
    </van-grid-item>

    <van-grid-item to="/s/team">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-tuanduixiezuo" />
      </svg>
      <span class="grid-title">我的小队</span>
    </van-grid-item>
    <van-grid-item to="/s/workWall">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-xc" />
      </svg>
      <span class="grid-title">精彩瞬间</span>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { Grid, GridItem } from "vant";
import Vue from "vue";
Vue.use(Grid).use(GridItem);
export default {
  name: "StuGrid"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.grid-title {
  padding-top: 10px;
  font-size: 80%;
  font-weight: 600;
}
/deep/.van-grid-item__content--center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  border-radius: 7px;
}
</style>
