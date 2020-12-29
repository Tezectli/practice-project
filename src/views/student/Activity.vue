<template>
  <div class="page">
    <nav-bar title="活动报名" />
    <van-search placeholder="搜索课程" shape="round" class="van-hairline--bottom" v-model="srhVal" @search="srh">
    </van-search>
    <ActivityCard class="card" v-for="activity of activityPost" :key="activity.activityId" :content="activity">
    </ActivityCard>
    <div class="bottom-text">没有更多了</div>
  </div>
</template>
<script>
import Vue from "vue";
import { Search } from "vant";
import NavBar from "@/components/NavBar";
import ActivityCard from "../../components/Student/ActivityCard";
Vue.use(Search);
export default {
  name: "Activity",
  components: { ActivityCard, "nav-bar": NavBar },
  data() {
    return {
      activityPost: [],
      srhVal: ""
    };
  },
  methods: {
    //获取活动列表
    async getAllActivities(keyword = "") {
      try {
        let res = await this.$api.activity.getAllActivities(keyword);
        this.activityPost = res.data;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    srh() {
      this.getAllActivities(this.srhVal);
    }
  },
  created() {
    this.getAllActivities();
  },
  watch: {
    //搜索框的同步搜索
    srhVal: function(newVal) {
      this.getAllActivities(newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
.bottom-text {
  width: 100%;
  height: 25px;
  color: #d4d4d4;
  font-size: 90%;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 55px;
}
</style>