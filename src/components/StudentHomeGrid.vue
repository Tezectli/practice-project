/* 用于学生主页的导航组件 */
<template>
  <van-grid square :column-num="5">
    <van-grid-item to="/s/submitWork">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-written" />
      </svg>
      <span class="grid-title">作品提交</span>
    </van-grid-item>
    <van-grid-item>
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-mails" />
      </svg>
      <span class="grid-title">消息通知</span>
    </van-grid-item>
    <van-grid-item>
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-monitor" />
      </svg>
      <span class="grid-title">在线选课</span>
    </van-grid-item>
    <van-grid-item>
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-edit-tools" />
      </svg>
      <span class="grid-title">在线申报</span>
    </van-grid-item>
    <van-grid-item>
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-paper-plane" />
      </svg>
      <span class="grid-title">活动报名</span>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { Grid, GridItem } from "vant";
import Vue from "vue";
Vue.use(Grid).use(GridItem);
export default {
  name: "HomeGrid"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-title{
    font-size: 85%;
    font-weight: 600;
    margin-top: 5px;
}
</style>
