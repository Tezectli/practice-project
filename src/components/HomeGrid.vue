/* 用于主页的导航组件 */
<template>  
  <van-grid  :column-num="5">
    <van-grid-item to="/t/home/rankList">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-rank" />
      </svg>
      <span class="grid-title">排行榜</span>
    </van-grid-item>
    <van-grid-item to="/t/home/inform">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-mails" />
      </svg>
      <span class="grid-title">通知</span>
    </van-grid-item>
    <van-grid-item to="/t/home/evaluationAudit">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-test1" />
      </svg>
      <span class="grid-title">审核</span>
    </van-grid-item>
    <van-grid-item  to="/t/home/activityWall">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-drawing" />
      </svg>
      <span class="grid-title">活动墙</span>
    </van-grid-item>
    <van-grid-item  to="/t/home/classMangement">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-tongxunlu" />
      </svg>
      <span class="grid-title">班级</span>
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
