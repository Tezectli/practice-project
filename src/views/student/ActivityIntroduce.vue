<template>
  <div>
    <van-tabs sticky class="activitytabs" title-active-color="white" type="card" title-inactive-color="black">
      <van-tab title="活动详细">
        <ActivityDetail></ActivityDetail>
      </van-tab>
      <van-tab title="小队信息">
        <TeamList></TeamList>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import TeamList from "../../components/Student/TeamList";
import ActivityDetail from "../../components/Student/ActivityDetail";
Vue.use(Tab)
  .use(Tabs);
export default {
  name: "ActivityIntroduce",
  components: { TeamList,ActivityDetail },
  data() {
    return {
    };
  },

  
};
</script>
<style lang="scss" scoped>
.activitytabs /deep/ .van-tabs__nav--card {
    box-sizing: border-box;
    height: 40px;
    margin: 0px;
    border: 0px;
    border-radius: 2px;
}
.activitytabs /deep/ .van-tabs__nav--card .van-tab.van-tab--active {
    background-color: rgb(22,97,246);
}
.activitytabs /deep/ span.van-ellipsis {
    margin: 6px;
}
.activitytabs /deep/ .van-tabs__nav--card .van-tab {
    line-height: 28px;
    border-right: 0px;
}
</style>