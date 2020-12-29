/* 主页 */
<template>
  <div class="home">
    <user-board />
    <!-- <course-schedule :startDate="today" :endDate="today" /> -->
    <!-- <div style="width:100%"> -->
    <img src="@/assets/img/new_title_pic.png" class="titlepic">
    <!-- </div> -->
    <!-- <van-cell title="综合实践系统" size="large" /> -->
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
    "course-schedule": CourseSchedule
  },
  data() {
    return {
      today: dayjs().format("YYYY-MM-DD")
    };
  }
  // mounted(){
  //   console.log(this.today)
  // }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 667px;
  background-color: white;
}
.titlepic {
  display: flex;
  width: 100%;
  // position: fixed;
  height: 275px;
  // opacity: 100%;
  transition: all 0.5s;
  border: none;
}
.van-cell {
  border-left: 8px solid rgb(12, 125, 212);
}
.van-cell__title span {
  font-size: 13px;
  font-weight: 900;
}
.van-cell__value span {
  font-size: 13px;
  font-weight: 900;
  color: black;
}
</style>
