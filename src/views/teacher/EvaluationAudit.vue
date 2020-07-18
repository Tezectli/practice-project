/*审核页面*/
<template>
  <div>
    <week-picker v-model="week"></week-picker>
    <teach-class-picker v-model="classId"></teach-class-picker>
    <van-tabs v-model="tab" color="#78909c" animated sticky class="mb-5">
      <van-tab title="评价审核">
        <check-audit :week="week" :classId="classId"></check-audit>
      </van-tab>
      <van-tab title="审核结果">
        <audit-result :classId="classId" :week="week"></audit-result>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import WeekPicker from "../../components/WeekPicker";
  import TeachClassPicker from "../../components/TeachClassPicker";
  import { Tab, Tabs } from 'vant';
  import Vue from 'vue';
  import AuditResult from "../../components/AuditResult";
  import CheckAudit from "../../components/CheckAudit";
  Vue.use(Tab).use(Tabs);
  export default {
    name: "EvaluationAudit",
    components: {
      CheckAudit,
      AuditResult,
      TeachClassPicker,
      WeekPicker
    },
    data () {
      return {
        week: undefined,
        classId: '',
        tab:''
      }
    }
  }
</script>

<style scoped>
.mb-5 {
  margin-bottom: 50px;
}
</style>
