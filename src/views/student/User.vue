/* 学生个人中心 -润 2019/9/3 */
/* 用户中心 -润 */
<template>
  <div class="user">
    <div class="user-info">
      <div class="user-info__background"></div>
      <avatar  src="../assets/img/avatar.png" :size="65" style="margin-top:-50px"></avatar>
      <span style="font-weight:900;margin-top:20px">{{username}}</span>
      <div class="user-info__card">
        <div style="width:100%">
          <info-cell />
        </div>
      </div>
    </div>
    <stu-grid class="user-grid" />
    <user-cell style="margin-bottom:50px;" />
  </div>
</template>
<script>
import StuGrid from "@/components/Student/StuGrid";
import UserCell from "@/components/Student/StudentUserCell";
import Avatar from "@/components/Avatar";
import InfoCell from "@/components/Student/InfoCell";
import store from "store";
// import {Row,Col} from 'vant'
import { Tag, Button, Icon, Row, Col } from "vant";
import Vue from "vue";
Vue.use(Tag)
  .use(Button)
  .use(Icon)
  .use(Row)
  .use(Col);
export default {
  components: {
    "stu-grid": StuGrid,
    "user-cell": UserCell,
    "avatar": Avatar,
    "info-cell": InfoCell
  },
  data() {
    return {
      username: store.get("user").username,
      identity: store.get("user").role
    };
  },
  computed: {},
  methods: {
    async clearLogin() {
      await this.$api.login.studentLogout()
      localStorage.removeItem('user');
      localStorage.removeItem('authorize');
      this.$router.push('/')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.user {
  @include page;
  &-info {
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    &__background {
      width: 100%;
      height: 80px;
      background:rgb(12,124,212);
      color: $white;
      &-title {
        padding-left: 10%;
        font-size: 180%;
        color: $primary;
        font-size: bold;
      }
    }
    &__card {
      width: 90%;
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 15px;
      background: $white;
      border-radius: 20px;
      box-shadow: 0 5px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      &-wrap{
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 6px 0;
      }
      &__btn-group {
        width: 100%;
        margin-top: 5px;
        display: inline-flex;
        align-items: flex-end;
        justify-content: flex-end;
        &__btn {
          margin-right: 5px;
          background: $white;
        }
      }
      &__title {
        margin: 10px;
        margin-left: 20px;
        color: $primary;
        &__tag {
          padding: 3px;
          font-size: 80%;
        }
      }
    }
  }
  &-grid {
    margin-bottom: 10px;
  }
}
</style>
