<template>
  <div class="main">
    <van-nav-bar title="好友管理" left-arrow @click-left="$router.back(-1);"></van-nav-bar>
    <class-picker v-model="classId" />
    <van-tabs title-active-color="white" animated type="card" title-inactive-color="black" class="friend">
      <van-tab title="已加好友">
        <friend-added v-model="classId"></friend-added>
      </van-tab>
      <van-tab title="好友申请">
        <fri-apply v-model="classId"></fri-apply>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ClassPicker from "@/components/Student/ClassPicker.vue";
import FriApply from "@/components/Student/FriApply.vue";
import FriendAdded from "@/components/Student/FriendAdded.vue";
import { NavBar, Tab, Tabs } from "vant";
import Vue from "vue";
Vue.use(NavBar)
  .use(Tab)
  .use(Tabs);
export default {
  name: "AddFriend",
  components: {
    "class-picker": ClassPicker,
    "fri-apply": FriApply,
    "friend-added": FriendAdded
  },
  data() {
    return {
      classId: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.friend /deep/ .van-tabs__nav--card {
  margin: 0;
  border: 0;
}
.friend /deep/ .van-tab.van-tab--active {
  background-color: rgb(22, 97, 246);
}
.friend /deep/ .van-tabs__nav--card .van-tab {
  border: 0;
}
.main /deep/ .van-tabs--card > .van-tabs__wrap {
  height: 45px;
}
.main /deep/ .van-tabs__nav.van-tabs__nav--card {
  height: 45px;
  padding-top: 0px;
}
.friend /deep/ .van-tab span {
  display: block;
  font-size: 14px;
  margin: 10px;
}
/deep/.van-tabs--card {
  padding-top: 0px;
}
</style>