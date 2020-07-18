<template>
  <van-nav-bar class="navBar" left-text="返回" left-arrow :title="title" @click-left="onClickLeft" />
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";

Vue.use(NavBar);

export default {
  name: "NavBar",
  props: ["title"],
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/s/home" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.van-nav-bar {
  .van-nav-bar__title {
    font-weight: bold;
  }
  .van-nav-bar__text {
    font-weight: bold;
  }
}
</style>
