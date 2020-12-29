<template>
  <div>
    <nav-bar title="我的作品" />
    <van-tabs v-model="tabs" color="#1989FA" animated="true">
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
import Vue from "vue";
import { Tab, Tabs } from "vant";
import SubmitWorks from "../../components/Student/SubmitWorks";
import QueryWorks from "../../components/Student/QueryWorks";
import NavBar from "@/components/NavBarColor";
Vue.use(Tab).use(Tabs);
export default {
  name: "MyWorks",
  components: { QueryWorks, SubmitWorks, "nav-bar": NavBar },
  data() {
    return {
      tabs: "",
      show: true
    };
  }
};
</script>

<style lang="scss" scoped>
.slideleft-enter {
  transform: translateX(100%);
}
.slideleft-enter-active {
  transition: transform 0.3s;
}
.slideleft-enter-to {
  transform: translateX(0);
}
.slideleft-leave {
  transform: translateX(0);
}
.slideleft-leave-active {
  transition: transform 0.3s;
}
.slideleft-leave-to {
  transform: translateX(0);
}
</style>