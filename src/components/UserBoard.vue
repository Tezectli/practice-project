/* 主页 */
<template>
  <div :style="{backgroundImage:`url(${img}) 100`}">
    <div class="container">
      <van-row>
        <van-col span="18">
          <div style="font-weight:520;font-size:19px;z-index:3;">Hi，{{user}} &nbsp;&nbsp;</div>
          <div style="font-size:12px;margin-top:5px;z-index:3;">
            今天是{{day}} , 欢迎回来!
          </div>
          <!-- <img src="@/assets/img/nav_bg.png" class="titlepic_nav"> -->
        </van-col>
        <van-col span="6">
          <avatar :src="'@/assets/img/userpic.png'" :size="50" style="margin-left:88px"></avatar>
        </van-col>
      </van-row>
    </div>
    <img src="@/assets/img/nav_bg.png" class="titlepic_nav">
  </div>
</template>

<script>
import store from "store";
import dayjs from "dayjs";
import Avatar from "@/components/Avatar";
import Vue from "vue";
import { Row, Col } from "vant";
Vue.use(Row).use(Col);
export default {
  name: "UserBoard",
  data() {
    return {
      //本地存储获取用户名
      user: store.get("user").username,
      identity: store.get("user").role,
      day: "",
      img: require("@/assets/img/nav_bg.png")
    };
  },
  computed: {
    role() {
      if (this.identity == "student") {
        return "同学";
      } else if (this.identity == "teacher") {
        return "老师";
      }
      return "";
    }
  },
  mounted: function() {
    let arr = [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    let daynum = dayjs().day();
    this.day = arr[daynum];
  },
  components: {
    avatar: Avatar
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  padding: 10px 20px 10px 25px;
  font-size: 15px;
  // background-color: #a7ccf8;
  background-color: transparent;
  text-align: left;
  color: #fff;
  z-index: 3;
}
.titlepic_nav {
  position: absolute;
  // padding: 0 !important;
  margin: 0;
  width: 100%;
  z-index: 0;
  // float: none;
  // background: url("/assets/img/nav_bg.png");
}
</style>
