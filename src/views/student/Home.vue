/* 主页 */
<template>
  <div class="home">
    <user-board />
    <home-grid />
    <week-board />
    <course-schedule :startDate="today" :endDate="today" />
    <div style="height:70px"></div>
  </div>
</template>
<script>
import HomeGrid from "@/components/Student/HomeGrid";
import UserBoard from "@/components/UserBoard";
import WeekBoard from "@/components/WeekBoard";
import CourseSchedule from "@/components/Student/CourseSchedule";
import dayjs from "dayjs";
export default {
  components: {
    "home-grid": HomeGrid,
    "user-board": UserBoard,
    "week-board": WeekBoard,
    "course-schedule": CourseSchedule,
  },
  data() {
    return {
      today:dayjs().format("YYYY-MM-DD")
    }
  },
  // mounted(){
  //   console.log(this.today)
  // }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 667px;
}
</style>
