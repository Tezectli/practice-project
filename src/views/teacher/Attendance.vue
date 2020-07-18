/* 考勤 */
<template>
  <div class="page">
    <teach-class-picker v-model="classId" mode="all" class="mb-1" />
    <van-tabs v-model="tab" color="#78909c" animated>
      <van-tab title="当前考勤">
        <current-member :classId="classId"/>
      </van-tab>
      <van-tab title="考勤总览">
          <total-member :classId="classId"/>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import TeachClassPicker from "@/components/TeachClassPicker";
import CurrentMember from "@/components/CurrentMember"
import TotalMember from "@/components/TotalMember"
import { Panel,Tab, Tabs, } from "vant";
import Vue from "vue";
Vue.use(Tab)
   .use(Tabs)
   .use(Panel)
export default {
  components:{
    "teach-class-picker": TeachClassPicker,
    "current-member": CurrentMember,
    "total-member": TotalMember
  },
  data() {
    return {
      classId: "",
      student: [],
      tab: "",
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.page {
  @include page;
  .mb-1 {
    margin-bottom: 10px;
  }
}
</style>
