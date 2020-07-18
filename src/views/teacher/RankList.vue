/* 排行榜 */
<template>
  <div>
    <week-picker v-model="week" />
    <teach-class-picker v-model="classId" />
    <van-tabs
      v-model="tab"
      color="#78909c"
      animated sticky
      class="mb-5"
    >
      <van-tab title="学生积分排行">
        <student-integral :week="week" :classId="classId" />
      </van-tab>
      <van-tab title="教师关注率排行">
        <teacher-attention-rate :week="week" />
      </van-tab>
      <van-tab title="教师积分排行">
        <teacher-integral :week="week" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { Tab, Tabs } from 'vant';
  import Vue from 'vue';
  import TeacherIntegral from "@/components/TeacherIntegral";
  import WeekPicker from "@/components/WeekPicker";
  import TeachClassPicker from "@/components/TeachClassPicker";
  import TeacherAttentionRate from "@/components/TeacherAttentionRate";
  import StudentIntegral from "@/components/StudentIntegral";
  Vue.use(Tab).use(Tabs);
  export default {
    name: "RankList",
    components: {
      StudentIntegral,
      TeacherAttentionRate,
      TeachClassPicker,
      WeekPicker,
      TeacherIntegral
    },
    data () {
      return {
        tab: "",
        week: 0,
        classId: ""
      }
    }
  }
</script>

<style scoped>
.mb-5 {
  margin-bottom: 50px;
}
</style>
