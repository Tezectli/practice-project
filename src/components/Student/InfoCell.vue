// 用于用户中心的信息显示组件
<template>
  <van-row type="flex" justify="space-around">
    <van-col
      span="8"
      v-for="[key,value] of Object.entries(numList)"
      :key="key"
      v-show="isShowKey(key)"
    >
      <div class="card-cell">
        <div class="card-cell__num">{{value}}</div>
        <div class="card-cell__name" style="margin-top:10px">{{showMap[key]}}</div>
      </div>
    </van-col>
  </van-row>
</template>
<script>
import { Row, Col } from "vant";
import {gradeMap} from '@/common/keyMap'
import Vue from "vue";
Vue.use(Row).use(Col);
export default {
  data() {
    return {
      numList: [],
      showMap: {
        gradeId: "年级",
        postNum: "作品",
        thumbUpNum: "点赞",
        integral: "积分"
      }
    };
  },
  computed:{
  },
  methods: {
    // 学生基本信息接口
    async getStudentInfo() {
      try {
        // 获取学生信息列表
        let res = await this.$api.user.getStudentInfo();
        this.numList = res;
        this.numList.gradeId = gradeMap[this.numList.gradeId]
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    isShowKey(key) {
      return typeof this.showMap[key] != "undefined";
    }
  },
  created() {
    this.getStudentInfo();
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.card-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__name {
    font-size: 14px;
    color: #888888;
  }
  &__num {
    font-size: 14px;
    font-weight: bold;
    color: black;
  }
}
.van-col {
  margin-bottom: 5px;
}
</style>