/* 综合评价 */
<template>
  <div class="Radar">
    <nav-bar title="综合评价" />
    <class-picker v-model="classId" />
    <week-picker v-model="week" />
    <radar-chart :classId="classId" :week="week" class="radar" />
  </div>
</template>
<script>
import ClassPicker from "@/components/Student/ClassPicker";
import RadarChart from "@/components/Student/RadarChart";
import WeekPicker from "@/components/Student/WeekPicker";
import NavBar from "@/components/NavBar";
export default {
  components: {
    "class-picker": ClassPicker,
    "week-picker": WeekPicker,
    "radar-chart": RadarChart,
    "nav-bar": NavBar
  },
  data() {
    return {
      classId: "",
      week: undefined
    };
  }
};
</script>
<style lang="scss" scoped>
.radar {
  margin-bottom: 50px;
}
</style>
