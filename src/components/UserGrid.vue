<template>
  <van-grid :column-num="3">
    <van-grid-item to="/t/teachPlan">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-ppt" />
      </svg>
      <span class="grid-title">教案审批</span>
    </van-grid-item>
    <van-grid-item  to="/t/RequestPass">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-leasingcloud_qingjiashenhe" />
      </svg>
      <span class="grid-title">请假审批</span>
    </van-grid-item>
    <van-grid-item to="/t/LeaveRequest">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-leasingcloud_xiaojiashenhe" />
      </svg>
      <span class="grid-title">请假申请</span>
    </van-grid-item>
    <van-grid-item to="/t/ResetStudentPassword">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-mima" />
      </svg>
      <span class="grid-title">重置学生</span>
    </van-grid-item>
    <van-grid-item to="/t/teachScore">
      <svg class="color-icon" aria-hidden="true">
        <use xlink:href="#zhsj-icon-test" />
      </svg>
      <span class="grid-title">督导打分</span>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { Grid, GridItem } from "vant";
import Vue from "vue";
Vue.use(Grid).use(GridItem);
export default {
  name: "UserGrid"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-title {
  padding-top: 10px;
  font-size: 85%;
  font-weight: 600;
}
</style>
