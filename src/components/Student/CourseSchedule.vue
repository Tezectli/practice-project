// 学生课表组件 -润 2019/12/01 startDate开始日期,endDate结束日期,以上都为yy-mm-dd格式.showDate为要不要显示日期的分割线
<template>
  <div class="container">
    <div v-if="showDate">
      <van-cell-group v-for="(courses,key,index) of sortedCourses" :key="index" :title="key">
        <van-cell
          v-for="(course,index) of courses"
          :key="index"
          size="large"
          :value="course.className"
        >
          <template slot="title">
            <van-icon name="clock-o" color="#1989fa"/>
            <span class="cell-title">{{course.time}}</span>
          </template>
          <template slot="label">
            <div>
              <van-icon name="contact"/>
              <span>负责教师：{{course.teacherName}}</span>
            </div>
            <div>
              <van-icon name="home-o"/>
              <span>教室：{{course.classroomName}}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div v-else>
      <van-cell
        v-for="(course,index) of courses"
        :key="index"
        size="large"
        :value="course.className"
      >
        <template slot="title">
          <van-icon name="clock-o" color="#1989fa"/>
          <span class="cell-title">{{course.time}}</span>
        </template>
        <template slot="label">
          <div>
            <van-icon name="contact"/>
            <span>{{course.teacherName}}</span>
          </div>
          <div>
            <van-icon name="home-o"/>
            <span>{{course.classroomName}}</span>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import { deleteSec } from "@/common/time";
import Vue from "vue";
import { Cell, CellGroup, Icon } from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon);
export default {
  name: "CourseSchedule",
  props: {
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    showDate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      courses: []
    };
  },
  computed: {
    //   按日期排序后的课表
    sortedCourses() {
      let dateMap = {};
      for (let course of this.courses) {
        let date = course.courseDate;
        dateMap.hasOwnProperty(date)
          ? dateMap[date].push(course)
          : (dateMap[date] = [course]);
      }
      return dateMap;
    }
  },
  methods: {
    // 获取课表
    async getSchedule() {
      try {
        let res = await this.$api.user.getStudentSchedule(
          this.startDate,
          this.endDate
        );
        this.courses = res.data.map(course => {
          course.time = `${deleteSec(course.courseStartTime)} ~ ${deleteSec(
            course.courseEndTime
          )}`;
          course.teacherName = `${course.teacherName}`;
          course.classroomName = `${course.classroomName || "不详"}`;
          return course;
        });
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    }
  },
  created() {
    this.getSchedule();
  },
  watch: {
    startDate() {
      this.getSchedule();
    },
    endDate() {
      this.getSchedule();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.container {
  background-color: white;
}
.cell-title {
  font-size: 16px;
  font-weight: bold;
  color: rgb(12, 125, 212);
}
.van-cell:not(:first-child) {
  background-color: rgb(243, 242, 242);
  border-radius: 10px;
  width: 375px;
  margin-top: 10px;
}
.van-cell:first-child {
  background-color: rgb(243, 242, 242);
  border-radius: 10px;
}
.van-cell__value{
  color: rgb(12, 125, 212)
}
</style>