<template>
  <div class="container">
    <nav-bar title="课表与资源" />
    <van-tabs v-model="active" color="blue">
      <van-tab title="课程表">
        <!-- <van-row type="flex" justify="space-between">
      <van-col span="11">
        <date-picker v-model="startDate" />
      </van-col>
      <van-col span="1">
        <span class="mid-text">~</span>
      </van-col>
      <van-col span="11">
        <date-picker v-model="endDate" :minDate="startDate"/>
      </van-col>
    </van-row>
    <course-schedule class="schedule" :startDate="startDate" :endDate="endDate" showDate/> -->
        <time-table role="student"></time-table>
        <div style="height:55px"></div>
      </van-tab>
      <van-tab title="课程资源">
        <teach-resource />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Vue from "vue";
import { Row, Col, Tab, Tabs } from "vant";
// import CourseSchedule from "@/components/Student/CourseSchedule";
// import DatePicker from "@/components/DatePicker";
import TeachResource from "@/components/Student/TeachResource";
import TimeTable from "@/components/Student/TimeTable";
import NavBar from "@/components/NavBar";
import dayjs from "dayjs";
Vue.use(Row)
  .use(Col)
  .use(Tab)
  .use(Tabs);
export default {
  name: "myCourse",
  components: {
    // "course-schedule": CourseSchedule,
    // "date-picker": DatePicker,
    "teach-resource": TeachResource,
    "time-table": TimeTable,
    "nav-bar": NavBar
  },
  data() {
    return {
      startDate: dayjs()
        .subtract(1, "month")
        .format("YYYY-MM-DD"),
      endDate: dayjs()
        .add(1, "month")
        .format("YYYY-MM-DD"),
      role: "student"
    };
  },
  methods: {}
};
</script>
<style scoped>
.container {
  background-color: white;
}
.schedule {
  margin-bottom: 50px;
}
.mid-text {
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
}
</style>