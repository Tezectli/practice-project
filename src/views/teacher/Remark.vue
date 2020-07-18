/* 主页 */
<template>
  <div class="page">
    <week-picker v-model="week" class="mb-1" :mode="weekMode"/>
    <teach-class-picker v-model="classId" class="mb-1" />
    <van-tabs v-model="tab" color="#78909c" animated sticky>
      <van-tab title="提交评价" name="submit">
        <student-selector v-model="student" :classId="classId" class="mb-1" />
        <remark-selector v-model="evaluations" :classId="classId" class="mb-1" />
        <van-row type="flex" justify="center">
          <van-col span="20">
            <van-button
              type="primary"
              color="#78909c"
              size="large"
              class="mb-8 btn-submit"
              round
              :loading="loading"
              @click="evaluateStudents()"
            >提交评价</van-button>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="历史评价" name="history">
        <history-remark :week="week" :classId="classId" ref="history" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import WeekPicker from "@/components/WeekPicker";
import TeachClassPicker from "@/components/TeachClassPicker";
import HistoryRemark from "@/components/HistoryRemark";
import RemarkSelector from "@/components/RemarkSelector";
import StudentGridSelector from "@/components/StudentGridSelector";
import { Tab, Tabs, Uploader, Divider, Button, Toast } from "vant";
import Vue from "vue";
Vue.use(Tab)
  .use(Tabs)
  .use(Uploader)
  .use(Divider)
  .use(Button);
export default {
  components: {
    "week-picker": WeekPicker,
    "teach-class-picker": TeachClassPicker,
    "history-remark": HistoryRemark,
    "student-selector": StudentGridSelector,
    "remark-selector": RemarkSelector
  },
  data() {
    return {
      week: 1,
      classId: "",
      student: [],
      tab: "",
      evaluations: [],
      resourceId: "",
      loading: false
    };
  },
  computed:{
    weekMode(){
      if(this.tab !== 'submit'){
        return 'all'
      }
      return 'single'
    }
  },
  methods: {
    async evaluateStudents() {
      this.loading = true;
      try {
        if (!this.student.length) {
          Toast.fail("还未选择学生");
        } else if (!this.evaluations.length) {
          Toast.fail("还未进行评价");
        } else {
          // 上传评价
          await this.$api.remark.evaluateStudents(
            this.student,
            this.evaluations,
            this.week,
            this.classId,
            this.resourceId
          );
          Toast('评价成功！')
        }
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.page {
  // @include page;
  .mb-1 {
    margin-bottom: 10px;
  }
  .mb-8 {
    margin-bottom: 80px;
  }
  .btn-submit{
    background: #78909c;
  }
  // .home-grid {
  //   // @include fixed-top;
  // }
}
</style>
