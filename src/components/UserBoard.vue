/* 主页 */
<template>
  <div class="container">
    <van-row>
      <van-col span="18">
        <div style="font-weight:900">Hi，{{user}} &nbsp;&nbsp; {{day}}</div>
        <div style="font-size:12px;margin-top:5px">
          欢迎回来!
        </div>
      </van-col>
      <van-col span="6">
        <avatar  :src="'@/assets/img/avatar.png'" :size="50" style="float:right"></avatar>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import store from "store";
import dayjs from 'dayjs';
import Avatar from "@/components/Avatar";
import Vue from 'vue';
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
export default {
  name: "UserBoard",
  data() {
    return {
      //本地存储获取用户名
      user: store.get("user").username,
      identity: store.get("user").role,
      day:""
    };
  },
  computed:{
    role(){
      if(this.identity == 'student'){
        return '同学'
      }else if(this.identity == 'teacher'){
        return '老师'
      }
      return ''

    }
  },
  mounted:function(){
    let arr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let daynum = dayjs().day();
    this.day = arr[daynum];
  },
  components: {
    "avatar": Avatar,
  },
};
</script>
<style scoped>
.container {
  padding: 10px;
  font-size: 15px;
  background-color: rgb(12,125,212);
  text-align: left;
  color: #fff;
}
</style>
