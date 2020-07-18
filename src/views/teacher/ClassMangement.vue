// 教师班级管理 -润 2019/12/7
<template>
  <div class="mb-5">
    <teach-class-picker v-model="classId" @change="getStudents" />
    <van-cell-group class="page-content__loaded">
      <van-cell v-for="item of students" :key="item.studentId" :border="false" size="large">
        <template slot="right-icon">
          <van-button
            plain
            type="primary"
            hairline
            round
            size="small"
            text="密码重置"
            @click="askIfReset(item.studentId)"
          />&nbsp;
          <van-button
            plain
            type="danger"
            hairline
            round
            size="small"
            text="删除学生"
            @click="askIfDelete(item.studentId)"
          />
        </template>
        <template slot="title">
          <span class="van-ellipsis">
            <span class="title van-ellipsis">{{item.studentName}}</span>&nbsp;
          </span>
        </template>
        <!-- <template slot="label">
          <span class="van-ellipsis">
            <span class="Id">{{item.idcard}}</span>
          </span>
        </template> -->
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import TeachClassPicker from "@/components/TeachClassPicker";
import {
  NavBar,
  Icon,
  CellGroup,
  NoticeBar,
  Button,
  Cell,
  Tag,
  Dialog
} from "vant";
import Vue from "vue";
Vue.use(NavBar)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(NoticeBar)
  .use(Button)
  .use(Tag)
  .use(Dialog);

export default {
  name: "ClassMangement",
  components: {
    "teach-class-picker": TeachClassPicker
  },
  data() {
    return {
      students: [], // 学生列表
      classId: "" // 班级Id
    };
  },
  methods: {
    // 获取指定班级的学生
    async getStudents() {
      try {
        let res = await this.$api.common.getClassStudent(this.classId);
        this.students = res.data;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 询问用户是否删除学生
    askIfDelete(studentId) {
      Dialog.confirm({
        title: "移除学生",
        message: "将学生从课程移除后无法恢复，要继续吗？",
      }).then(() => {
        // on confirm
        this.deleteStudent(studentId);
      });
    },
    askIfReset(studentId) {
      Dialog.confirm({
        title: "重置学生密码",
        message: "要重置该生的密码吗？"
      }).then(() => {
        // on confirm
        this.resetPassword(studentId);
      });
    },

    // 删除学生
    async deleteStudent(studentId) {
      try {
        await this.$api.user.cancelStudentCourse(this.classId, studentId);
        this.getStudents();
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 重置学生密码
    async resetPassword(studentId) {
      try {
        await this.$api.user.resetStudentPassword(studentId);
      } catch (error) {
        // eslint-disable-next-line
        console.log("​catch -> e", error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
    .mb-5{
        margin-bottom: 50px;
    }
</style>