<template>
  <div>
    <nav-bar title="消息通知" />
    <van-tabs color="#1989FA" v-model="type">
      <van-tab title="通知" name="0">
        <week-picker v-model="week" mode="all" />
        <notice-list :week="week" />
      </van-tab>
      <van-tab title="选课" name="1">
        <massage v-for="item of msgs[1]" :key="item.id" :content="item"></massage>
      </van-tab>
      <van-tab title="考勤" name="2">
        <massage v-for="item of msgs[2]" :key="item.id" :content="item"></massage>
      </van-tab>
      <van-tab title="评价" name="3">
        <massage v-for="item of msgs[3]" :key="item.id" :content="item"></massage>
      </van-tab>
      <van-tab title="好友" name="4">
        <friend-application />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import Massage from "@/components/Student/Massage";
import FriendApplication from "@/components/Student/FriendApplication";
import NoticeList from "@/components/Student/NoticeList";
import WeekPicker from "@/components/Student/WeekPicker";
import NavBar from "@/components/NavBarColor";

Vue.use(Tab).use(Tabs);
export default {
  name: "Notify",
  components: {
    massage: Massage,
    "friend-application": FriendApplication,
    "week-picker": WeekPicker,
    "notice-list": NoticeList,
    "nav-bar": NavBar
  },
  data() {
    return {
      msgs: [[], [], [], []],
      type: "0",
      week: undefined
    };
  },
  methods: {
    // 学生通知接口
    async getMessages() {
      try {
        // 获取学生通知
        let res = await this.$api.inform.getMessages(1);
        for (let i of res.data) {
          this.msgs[i.type].push(i);
        }
        // 逆序，靠近今天的排在前面
        for (let i = 0; i < this.msgs.length; i++) {
          this.msgs[i] = this.msgs[i].reverse();
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    }
  },
  created() {
    this.getMessages();
  }
};
</script>