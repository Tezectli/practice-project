// 待加好友与通过 -润 2019/12/4
<template>
  <div>
    <van-cell
      v-for="application of applications"
      :key="application.studentIdApply"
      :value="application.checkTime"
      size="large"
      :label="application.applyContent"
      v-show="!application.isCheck"
    >
      <template slot="title">
        <span class="custom-title">{{application.applyName}}</span>
      </template>
      <van-button icon="success" size="mini" type="primary" @click="review(application.id,1)" />&nbsp;
      <van-button icon="cross" size="mini" type="danger"   @click="review(application.id,2)" />
    </van-cell>
  </div>
</template>
<script>
import Vue from "vue";
import { Cell, CellGroup } from "vant";
Vue.use(Cell).use(CellGroup);
export default {
  name: "FriendApplication",
  data() {
    return {
      applications: []
    };
  },
  methods: {
    //   获取好友申请列表
    async getFriendApplication() {
      try {
        const res = await this.$api.user.getFirendApplication();
        this.applications = res.data;
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    },
    // 提交好友申请，不通过状态值为2，通过状态值为1，默认为0
    async review(applyId, optCode) {
      try {
        await this.$api.user.reviewFriend(applyId, optCode);
        this.getFriendApplication()
      }catch(error){
           // eslint-disable-next-line
        console.log(error);
      }
    }
  },
  created() {
    this.getFriendApplication();
  }
};
</script>