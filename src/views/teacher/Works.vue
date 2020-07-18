/* 作品管理 */
<template>
  <van-tabs :ellipsis="false" swipe-threshold="2" color="#78909c" @click="onPopupConfirm">
    <van-tab title="学生作品评价" name="学生作品评价">
      <div class="works">
        <teach-class-picker v-model="classes" @change="getWorks" />
        <student-picker v-model="student" :classId="classes"></student-picker>
        <van-dropdown-menu active-color="#1ab394">
          <van-dropdown-item v-model="worksType" :options="optionWorkType" @change="getWorks" />
          <van-dropdown-item v-model="sortMode" :options="optionSortMode" @change="getWorks" />
        </van-dropdown-menu>
        <div class="feed-wrapper">
          <transition-group name="van-slide-down" mode="in-out" class="feed-wrapper__transition">
            <works-feed v-for="item of works" :key="item.postId" :work="item" />
          </transition-group>
        </div>
      </div>
    </van-tab>
    <van-tab title="活动作品评价" name="活动作品评价">
      <activity-work></activity-work>
    </van-tab>
  </van-tabs>
</template>
<script>
import TeachClassPicker from "@/components/TeachClassPicker";
import StudentPicker from "@/components/StudentPicker";
import WorksFeed from "@/components/WorksFeed";
import ActivityWork from "@/components/ActivityWork";
import { Button, DropdownMenu, DropdownItem, Tabs, Tab } from "vant";
import Vue from "vue";
Vue.use(Button)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Tabs)
  .use(Tab);
export default {
  components: {
    "teach-class-picker": TeachClassPicker,
    "student-picker": StudentPicker,
    "works-feed": WorksFeed,
    "activity-work":ActivityWork
  },
  data() {
    return {
      classes: "",
      student: "",
      worksType: "works",
      sortMode: "0",
      optionWorkType: [
        { text: "作品", value: "works" },
        { text: "作品应用", value: "application" }
      ],
      optionSortMode: [
        { text: "热度优先", value: "1" },
        { text: "时间优先", value: "0" }
      ],
      works: []
    };
  },
  methods: {
    async getWorks() {
      if (!this.classes) {
        return false;
      }
      try {
        let res = await this.$api.works.getWorks(
          this.classes,
          this.worksType,
          this.sortMode,
          this.student
        );
        if (this.sortMode == "0") {
          this.works = res.data;
        } else {
          this.works = res.data;
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
  },
  watch: {
    student() {
      this.getWorks();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.feed-wrapper {
  margin-bottom: 50px;
  &__transition {
    @include flex-col;
  }
}
</style>