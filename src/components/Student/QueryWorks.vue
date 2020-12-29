<template>
  <div>
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">可以选择课程查询已提交的作品哟！</van-notice-bar>
    <class-picker v-model="course" mode="all" @change="getMyProduct" />
    <van-dropdown-menu active-color="#1ab394">
      <van-dropdown-item v-model="sortMode" :options="optionSortMode" />
    </van-dropdown-menu>
    <section class="feed-wrapper">
      <transition-group name="van-slide-down" mode="in-out" class="feed-wrapper__transition">
        <student-works-feed v-for="item of sortedWorks" :key="item.postId" :work="item" />
      </transition-group>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Cell,
  CellGroup,
  Toast,
  NoticeBar,
  DropdownMenu,
  DropdownItem
} from "vant";
import ClassPicker from "./ClassPicker";
import StudentWorksFeed from "./StudentWorksFeed";
import dayjs from "dayjs";
import { postTypeMap } from "@/common/keyMap";

Vue.use(Cell)
  .use(CellGroup)
  .use(Toast)
  .use(NoticeBar)
  .use(DropdownMenu)
  .use(DropdownItem);
export default {
  name: "QueryWorks",
  components: { StudentWorksFeed, ClassPicker },
  data() {
    return {
      course: {},
      works: [],
      activeName: "1",
      topic: "",
      sortMode: "0",
      optionSortMode: [
        { text: "好评优先", value: "0" },
        { text: "时间优先", value: "1" }
      ]
    };
  },
  computed: {
    sortedWorks() {
      const temp = this.works;
      const modeMap = {
        "0": () =>
          temp.sort((work1, work2) => {
            return work2.thumbUpNumbers - work1.thumbUpNumbers;
          }),
        "1": () =>
          temp.sort((work1, work2) => {
            return parseFloat(
              dayjs(work1.buildTime).isBefore(work2.buildTime) - 1
            );
          })
      };
      return modeMap[this.sortMode]();
    }
  },
  methods: {
    async getMyProduct() {
      try {
        const map = {
          form_post_shijian: "实践",
          form_post_yanxue: "研学",
          form_post_fuwu: "服务",
          form_post_yishu: "兴趣"
        };
        let res = await this.$api.submitWork.getMyProduct(this.course);
        this.works = res.data.map(item => {
          item.topic =
            typeof map[item.topicId] != "undefined"
              ? map[item.topicId]
              : "不详";
          item.postType =
            typeof postTypeMap[item.postType] != "undefined"
              ? postTypeMap[item.postType]
              : "其它";
          return item;
        });
        if (!this.works.length) {
          Toast("暂时没有已提交的作品");
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.feed-wrapper {
  margin-bottom: 60px;
  &__transition {
    @include flex-col;
  }
}
/deep/.van-tabs--card {
  padding-top: 0px;
}
/deep/.spanborder[data-v-757ad19c] .van-tabs__nav--card .van-tab {
  border: none;
  margin-right: 3px;
}
</style>