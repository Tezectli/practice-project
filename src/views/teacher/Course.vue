/* 课程 */
<template>
  <div class="page">
    <van-tabs v-model="tabs" color="#78909c" animated sticky class="mb-5">
      <van-tab title="课程表">
        <time-table role="teacher"></time-table>
        <div style="height:70px"></div>
      </van-tab>
      <van-tab title="课程内容">
        <teach-class-picker v-model="classId"></teach-class-picker>
        <course-content :classId="classId"></course-content>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { Tab, Tabs } from 'vant';
  import Vue from 'vue'
  import TimeTable from '@/components/Student/TimeTable'
  import CourseContent from "../../components/CourseContent";
  import TeachClassPicker from "../../components/TeachClassPicker";
  Vue.use(Tab).use(Tabs);
  export default {
    name:"Course",
    components: {TeachClassPicker, CourseContent,TimeTable},
    data () {
      return {
        tabs: '',
        classId: ""
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/scss/base.scss";
  .page {
    @include page
  }
</style>
