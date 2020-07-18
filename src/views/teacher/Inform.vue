/*通知页面*/
<template>
  <div>
    <week-picker v-model="week"></week-picker>
    <teach-class-picker v-model="classId"></teach-class-picker>
    <van-tabs v-model="tab" color="#78909c" animated sticky class="mb-5">
      <van-tab title="发送通知">
        <student-grid-selector v-model="student" :classId="classId"></student-grid-selector>
        <inform-detail
          class="mb-1"
          @informInfoChange="getInformInfo"
          @getUploadedInfo="getUploadedInfo"
        ></inform-detail>
        <van-row type="flex" justify="center">
          <van-col span="20">
            <van-button
              type="primary"
              size="large"
              class="mt-1"
              round
              :loading="loading"
              @click="noticeStudents()"
            >发送通知</van-button>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="历史通知">
        <history-inform :week="week" :classId="classId"></history-inform>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast, Tab, Tabs, Button} from 'vant';
import Vue from 'vue'
import WeekPicker from "../../components/WeekPicker";
import TeachClassPicker from "../../components/TeachClassPicker";
import InformDetail from "../../components/InformDetail";
import StudentGridSelector from "@/components/StudentGridSelector";
import HistoryInform from "../../components/HistoryInform";
Vue.use(Tab).use(Tabs).use(Button).use(Toast);
export default {
  name: "Inform",
  components: {
    HistoryInform,
    InformDetail,
    TeachClassPicker,
    WeekPicker,
    StudentGridSelector
  },
  data () {
    return {
      week: 1,
      classId: "",
      student: [],
      content: "",
      tab: "",
      resourceId: "",
      loading: false
    }
  },
  methods: {
    async noticeStudents() {
      this.loading = true;
      try {
        if (!this.student.length) {
          Toast.fail("还未选择学生");
        }  else {
          // 发送通知
          await this.$api.inform.noticeStudents(
              this.student,
              this.content,
              this.week,
              this.classId,
              this.resourceId
          );
          Toast.success('成功发送通知')
        }
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    getInformInfo (content) {
      this.content = content
    },
    getUploadedInfo (resourceId) {
      this.resourceId = resourceId;
    }
  }
}
</script>

<style scoped>
.mt-1 {
  margin-top: 10px;
}
.mb-5 {
  margin-bottom: 60px;
}
</style>
