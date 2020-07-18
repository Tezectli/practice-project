/* 教案审批 -润 */
<template>
  <div class="page">
    <van-nav-bar class="page-nav" title="教案审批" left-arrow @click-left="$router.back(-1);" fixed/>
    <van-notice-bar class="page-notice" left-icon="info-o" style="margin-top:45px">单元格向右滑动可以下载，审批教案哦。</van-notice-bar>
    <van-skeleton :row="15" class="page-content" :loading="loading">
      <van-cell-group class="page-content__loaded">
        <van-swipe-cell v-for="item of plans" :key="item.planId">
          <van-cell :border="false" :value="item.teacherName">
            <template slot="title">
              <span class="custom-title van-ellipsis">{{item.nowFileName}}</span>&nbsp;
              <van-tag plain type="success" v-if="item.isCheck">已通过</van-tag>
            </template>
          </van-cell>
          <template slot="right">
            <van-button square type="primary" v-if="!item.isCheck" @click="planCheck(1,item.planId)">
              <van-icon class-prefix="zhsj-icon" name="check-circle" size="30" />
            </van-button>
            <van-button square type="info" text="下载" :url="item.resourceURL">
              <van-icon class-prefix="zhsj-icon" name="download" size="30" />
            </van-button>
          </template>
        </van-swipe-cell>
      </van-cell-group>
    </van-skeleton>
  </div>
</template>
<script>
import {
  NavBar,
  Icon,
  CellGroup,
  SwipeCell,
  Skeleton,
  NoticeBar,
  Button,
  Cell,
  Tag,
  Toast
} from "vant";
import Vue from "vue";
Vue.use(NavBar)
  .use(Icon)
  .use(CellGroup)
  .use(SwipeCell)
  .use(Cell)
  .use(Skeleton)
  .use(NoticeBar)
  .use(Button)
  .use(Tag);
export default {
  name: "TeachPlan",
  data() {
    return {
      loading: false,
      plans: [
        {
          planId: 1,
          teacherName: "李世民",
          nowFileName: "把握现金流",
          resourceURL:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563250294587&di=51d1e84ca5682c3ad6429b7ce199ea72&imgtype=0&src=http%3A%2F%2Fdepot.nipic.com%2Ffile%2F20190530%2F28689490_17450752672.jpg",
          isCheck: 0
        },
        {
          planId: 2,
          teacherName: "张三",
          nowFileName: "开高达",
          resourceURL:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563250294587&di=51d1e84ca5682c3ad6429b7ce199ea72&imgtype=0&src=http%3A%2F%2Fdepot.nipic.com%2Ffile%2F20190530%2F28689490_17450752672.jpg",
          isCheck: 1
        }
      ]
    };
  },
  methods: {
    // 教案列表接口
    async getPlans() {
      //   this.loading = true;
      try {
        // 获取教案列表
        let res = await this.$api.user.getPlans();
        this.plans = res.data;
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    // 教案审批接口
    async planCheck(passStatus, planId) {
      try {
        //提交
        await this.$api.user.planCheck(passStatus, planId);
        Toast.success("教案审批成功")
        this.getPlans()
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        Toast.fail(e)
      }
    }
  },
  mounted(){
      this.getPlans()
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.page {
  @include page;
  background: $white;
  &-notice {
    margin-bottom: 16px;
  }
  &-content {
    height: 80%;
    &_loaded {
      width: 100%;
      height: 100%;
      background: $bg;
    }
  }
}
</style>