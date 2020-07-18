/* 请假审批（教师个人中心请假审批） */
<template>
  <div class="page">
    <van-nav-bar title="请假审批" left-arrow @click-left="$router.back(-1);"></van-nav-bar>
    <van-notice-bar class="page-notice" left-icon="info-o">若无申请,页面将不显示内容哦。</van-notice-bar>
    <van-panel
      v-for="(item,key) in data"
      :key="key"
      class="mb-1"
      :title="item.teacherName"
      :status="item.statusName"
      :desc="item.applyTime"
    >
      <van-cell-group v-show="!showsick">
        <van-cell title="请假时间" :value="`${item.leaveStartTime}~${item.leaveEndTime}`" />
        <van-cell title="原上课日期" :value="item.courseDate" />
        <van-cell title="新上课日期" :value="item.newcourseDate" />
        <van-cell
          title="上课时间"
          icon="underway-o"
          :value="`${item.newCourseStartTime}~${item.newCourseEndTime}`"
        />
        <van-cell title="上课教室" icon="location-o" :value="item.newClassroomName" />
        <van-cell title="上课教师" icon="contact" :value="item.newTeacherName" />
      </van-cell-group>
      <div slot="footer" style="text-align:right;">
        <van-button plain hairline type="danger" size="small" @click="checkApply(0,item)" icon="cross" />&nbsp;&nbsp;
        <van-button plain hairline type="primary" size="small" @click="checkApply(1,item)" icon="success" />
      </div>
    </van-panel>
  </div>
</template>

<script>
import {
  NavBar,
  NoticeBar,
  Panel,
  Cell,
  CellGroup,
  Icon,
  Button,
  Toast
} from "vant";
import Vue from "vue";
Vue.use(NavBar)
  .use(NoticeBar)
  .use(Panel)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Button)
  .use(Toast);
export default {
  name: "RequstPass",
  data() {
    return {
      data: [],
      teacherName: ""
    };
  },
  methods: {
    //获取请假申请列表
    async getApply() {
      try {
        const res = await this.$api.user.getApply();
        this.data = res.data.map(item => {
          // 插入是否病假、事假
          if (["病假", "事假"].includes(item.statusName)) {
            item.showSick = true;
          } else {
            item.showSick = false;
          }
          return item;
        });
        if (!this.data.length) {
          Toast("尚未有请假申请");
          this.$router.back(-1);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 教案审批接口
    async checkApply(isPass, item) {
      const {
        teacherId,
        applyTime,
        scheduleId,
        newTeacherId,
        classId,
        newCourseDate,
        newCourseStartTime,
        newCourseEndTime,
        newClassroomId,
        status
      } = item;
      try {
        //提交
        await this.$api.user.checkApply(
          isPass,
          teacherId,
          applyTime,
          scheduleId,
          newTeacherId,
          classId,
          newCourseDate,
          newCourseStartTime,
          newCourseEndTime,
          newClassroomId,
          status
        );
        this.getApply();
        Toast.success("审核成功");
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        Toast.fail(e);
      }
    }
    // 同意审批
  },
  created() {
    this.getApply();
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/base.scss";
.page {
  @include page;
  &-notice {
    margin-bottom: 10px;
  }
  .mb-1 {
    margin-bottom: 10px;
  }
}
</style>
