<template>
  <div>
    <van-tabs v-model="tabs" sticky color="#22a37c">
      <van-tab title="作品提交">
        <submit-works></submit-works>
      </van-tab>
      <van-tab title="查询作品">
        <query-works></query-works>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
import SubmitWorks from "../../components/Student/SubmitWorks";
import QueryWorks from "../../components/Student/QueryWorks";

Vue.use(Tab).use(Tabs);
export default {
  name: "MyWorks",
  components: {QueryWorks, SubmitWorks},
  data () {
    return {
      tabs: ''
    }
  }
}
</script>

<style scoped>
</style>