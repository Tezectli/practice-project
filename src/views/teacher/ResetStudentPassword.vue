/* 重置学生密码 */
<template>
  <div class="page">
    <van-nav-bar class="page-nav" title="学生重置" left-arrow @click-left="$router.back(-1);" fixed></van-nav-bar>
    <teach-class-picker v-model="classes" @change="getList" />
    <van-skeleton :row="15" class="page-content" :loading="loading">
      <van-cell-group class="page-content__loaded">
        <van-cell v-for="(item,index) of student" :key="index" :border="false" size="large">
          <template slot="right-icon">
            <van-button plain type="primary" hairline round size="small" text="重置" @click="resetPassword(item.studentId)" :loading="btnLoading"></van-button>
          </template>
          <template slot="title">
            <span class="van-ellipsis">
              <span class="title van-ellipsis">{{item.studentName}}</span>&nbsp;
            </span>
          </template>
          <template slot="label">
            <span class="van-ellipsis">
              <span class="Id">{{item.idcard}}</span>
            </span>
          </template>
        </van-cell>
      </van-cell-group>
    </van-skeleton>
  </div>
</template>
<script>
import TeachClassPicker from "@/components/TeachClassPicker";
import {
  NavBar,
  Icon,
  CellGroup,
  Skeleton,
  NoticeBar,
  Button,
  Cell,
  Tag
} from "vant";
import Vue from "vue";
Vue.use(NavBar)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Skeleton)
  .use(NoticeBar)
  .use(Button)
  .use(Tag);
export default {
  name: "resetStuPw",
  data() {
    return {
      // 页面加载
      loading: false,
      btnLoading:false,
      student: [],
      classes: ""
    };
  },
  components: {
    "teach-class-picker": TeachClassPicker
  },
  methods: {
    // 评分学生列表接口
    async getList() {
      //   this.loading = true;
      try {
        // 获取教案列表
        let res = await this.$api.common.getClassStudent(this.classes);
        this.student = res.data;
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    // 重置学生密码
    async resetPassword(student){
       this.btnLoading = true;
        try {
          await this.$api.user.resetStudentPassword(student)
         this.btnLoading = false;
        } catch (error) {
          // eslint-disable-next-line
          console.log("​catch -> e", error);
          this.btnLoading = false;
        }
    }
  },
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