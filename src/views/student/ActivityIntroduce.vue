<template>
  <div>
    <nav-bar title="活动详情" />
    <van-tabs class="activitytabs" title-active-color="white" type="card" title-inactive-color="black">
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
import NavBar from "@/components/NavBar";
Vue.use(Tab).use(Tabs);
export default {
  name: "ActivityIntroduce",
  components: { TeamList, ActivityDetail, "nav-bar": NavBar },
  data() {
    return {};
  }
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
  background-color: rgb(22, 97, 246);
}
.activitytabs /deep/ span.van-ellipsis {
  // margin: 6px;
}
.activitytabs /deep/ .van-tabs__nav--card .van-tab {
  line-height: 28px;
  border-right: 0px;
}
.van-tabs--card {
  padding-top: 0px;
}
/deep/.head[data-v-58b6dae4] {
  width: 100%;
  height: 53.33333vw;
  background-size: cover;
  margin-top: 0px;
}
</style>