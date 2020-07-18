/* 主页 */
<template>
  <div>
  <van-cell :title="label" :value="week[day]" size="large" />
  </div>
</template>

<script>
import { Cell, Toast } from "vant";
import Vue from "vue";
Vue.use(Cell).use(Toast);

export default {
  name: "WeekBoard",
  data() {
    return {
      week: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      day: 0,
      course: [],
      today: "",
      label: "今天没课！好好休息"
    };
  },
  created() {
    this.getWeek();
    this.getTodayCourse();
  },
  methods: {
    getWeek() {
      let date = new Date();
      this.day = date.getDay();
      this.today = `${date.getFullYear()}-${date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate()<10 ? '0' + date.getDate() : date.getDate()}`;
    },
    async getTodayCourse() {
      let res = await this.$api.course.getMySchedule(this.today, this.today);
      if(res.data.length !== 0){
        this.label = `今天有${res.data.length}节课`;
      }
      this.course = res.data;
    }
  }
};
</script>
 
<style scoped>
.van-cell {
  border-left: 8px solid rgb(12, 125, 212);
}
.van-cell__title span {
  font-size: 13px;
  font-weight: 900;
}
.van-cell__value span {
  font-size:13px;
  font-weight: 900;
  color: black;
}
</style>
