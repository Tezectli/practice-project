<template>
  <div class="page">
    <van-skeleton :row="15" class="page-content" :loading="loading" avatar>
      <div class="feed-wrapper">
        <transition-group name="van-slide-down" class="feed-wrapper__transition">
          <weibo
            v-for="item of activityPost"
            :key="item.content"
            :content="item"
            @refresh="getActivity"
          />
        </transition-group>
        <AddActivity @added="getActivity"/>
      </div>
    </van-skeleton>
  </div>
</template>
<script>
import Weibo from "@/components/Weibo";
import AddActivity from "@/components/AddActivity";
import {
  Skeleton,
  Button,
  Icon,
  Popup,
  Cell,
  CellGroup,
  Field,
  Uploader
} from "vant";
import Vue from "vue";
Vue.use(Skeleton)
  .use(Button)
  .use(Icon)
  .use(Popup)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Uploader);
export default {
  data() {
    return {
      loading: true,
      activityPost: [],
      show: false,
      fileList: []
    };
  },
  components: {
    weibo: Weibo,
    AddActivity: AddActivity
  },
  methods: {
    // 活动接口
    async getActivity() {
      try {
        // 获取活动列表
        let res = await this.$api.activity.getActivityWall();
        this.activityPost = res.data;
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    showActivity() {
      this.show = true;
    }
  },
  created() {
    this.getActivity();
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
page-content {
  background: $bg;
}
.page {
  @include page;
  // background: $white;
}
.feed-wrapper {
  margin-bottom: 50px;
  &__transition {
    @include flex-col;
    height: 100%;
    width: 100%;
  }
}
</style>
