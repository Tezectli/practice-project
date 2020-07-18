// 2020/4/1 邦 广告详情
<template>
  <div>
    <van-nav-bar title="课外天地" left-arrow @click-left="$router.go(-1)" @click-right="onClickRight">
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs
      :ellipsis="false"
      swipe-threshold="2"
      color="#1ab394"
      @click="onConfirm"
      v-model="active"
    >
      <van-tab v-for="(item,index) of currencyItem" :key="index" :title="item" :name="item">
        <div class="cardContainer">
          <van-card thumb="https://img.yzcdn.cn/vant/ipad.jpeg" style="margin-bottom:5px" v-for="(item,index) in arr" :key="index">
            <template #title>
              <div class="title">我是大大大大大大标题</div>
            </template>
            <template #desc>
              <div style="desc">我是文本描述描述我是文本描述描述我是文本描述描述我是文本描述描述我是文本描述描述</div>
            </template>
          </van-card>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, NavBar, Card } from "vant";

Vue.use(Tab)
  .use(Tabs)
  .use(NavBar)
  .use(Card);
export default {
  name: "AdvetisementDetail",
  data() {
    return {
      currencyItem: ["111", "222", "3333"],
      active: 0,
      arr:["111", "222", "3333"]
    };
  },
  model:{
    prop: 'mes',
    event: 'change'
  },
  props:{
      mes:Number
  },
  mounted() {},
  methods: {
    onConfirm() {
      
    },
    onClickRight() {
      this.$emit("change", 2);
    }
  }
};
</script>

<style lang="scss" scoped>
.cardContainer {
  background-color: white;
  height: 667px;
}
.title{
  font-size:13px;
  font-weight: 600;
}
</style>