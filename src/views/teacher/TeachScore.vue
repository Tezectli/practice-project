/* 批改成绩 */
<template>
  <div class="page">
    <van-nav-bar class="page-nav" title="督导打分" left-arrow @click-left="$router.back(-1);" fixed></van-nav-bar>
    <van-notice-bar class="page-notice" left-icon="info-o" style="margin-top:45px">单元格向左滑动进行评分哦。</van-notice-bar>
    <van-skeleton :row="15" class="page-content" :loading="loading">
      <van-cell-group class="page-content__loaded">
        <van-swipe-cell v-for="(item,index) of plans" :key="index">
          <van-cell
            :border="false"
            size="large"
            :value="item.teacherName"
            @click="onDetailShow(index)"
          >
            <template slot="title">
              <span class="van-ellipsis">
                <span class="title van-ellipsis">{{item.className}}</span>&nbsp;
                <van-tag plain type="success" v-if="item.status">已评分</van-tag>
              </span>
            </template>
          </van-cell>
          <template slot="right">
            <van-button
              square
              block
              type="primary"
              @click="onScoreShow(index)"
              class="page-content__setScore"
              text="评分"
            ></van-button>
          </template>
        </van-swipe-cell>
      </van-cell-group>
    </van-skeleton>
    <van-action-sheet v-model="scoreShow" :title="detail.name" @cancel="scoreShow = false">
      <div class="score-wrapper">
        <van-rate
          class="score-wrapper__rate"
          v-model="score"
          allow-half
          void-icon="star"
          void-color="#eee"
          size="50"
        />
        <van-button class="score-wrapper__btn" type="primary" round @click="saveTeacherScore()">评分</van-button>
      </div>
    </van-action-sheet>
    <van-action-sheet v-model="detailShow" :title="detail.name" @cancel="detailShow = false">
      <van-cell icon="user-circle-o" :title="detail.teacher" />
      <van-cell icon="location-o" :title="detail.classroom" />
      <van-cell icon="clock-o" :title="detail.date" />
    </van-action-sheet>
  </div>
</template>
<script>
import { deleteSec } from "@/common/time";
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
  Popup,
  ActionSheet,
  Rate,
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
  .use(Tag)
  .use(Popup)
  .use(ActionSheet)
  .use(Rate)
  .use(Toast);
export default {
  name: "TeachScore",
  data() {
    return {
      // 页面加载
      loading: false,
      // 评分提交等待
      scoreLoading: false,
      // 评分显隐
      scoreShow: false,
      // 分数
      score: 5,
      cellIndex: "",
      // 教案列表
      plans: [],
      // 详情显隐
      detailShow: false,
      // 详细信息的底部菜单
      detail: {
        id: "",
        name: "",
        classroom: "",
        teacher: "",
        date: ""
      }
    };
  },
  methods: {
    // 修改数据为当前操作对象的数据
    changeDetail(index) {
      const classes = this.plans[index];
      this.detail = {
        id: classes.scheduleId,
        teacherId: classes.teacherId,
        classId: classes.classId,
        name: classes.className,
        classroom: classes.classroomName || "不详",
        teacher: classes.teacherName,
        date: `${classes.courseDate}  ${deleteSec(
          classes.courseStartTime
        )}~${deleteSec(classes.courseEndTime)}`
      };
    },
    // 显示评分栏
    onScoreShow(index) {
      this.changeDetail(index);
      this.scoreShow = true;
    },
    // 显示细节
    onDetailShow(index) {
      this.changeDetail(index);
      this.detailShow = true;
    },
    // 评分课程列表接口
    async getList() {
      //   this.loading = true;
      try {
        // 获取教案列表
        let res = await this.$api.user.getAllSchedules();
        this.plans = res.data;
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    // 课程评分接口
    async saveTeacherScore() {
      try {
        //提交
        await this.$api.user.saveTeacherScore(
          this.detail.teacherId,
          this.detail.id,
          this.detail.classId,
          this.score
        );
        this.score = 5;
        Toast.success("成功提交成绩");
        this.scoreShow = false;
        // this.$api.user.getList();
        this.getList();
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.home {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.score-wrapper {
  height: 180px;
  width: 100%;
  @include m-auto;
  display: flex;
  flex-direction: column;
  &__rate {
    margin-bottom: 32px;
  }
  &__btn {
    width: 70%;
  }
}
.page {
  @include page;
  // background: $white;
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