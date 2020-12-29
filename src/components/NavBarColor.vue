<template>
  <!-- <transition name="slide-left"> -->
  <van-nav-bar class="navBar" left-text="返回" left-arrow :title="title" @click-left="onClickLeft"
    :style="[{backgroundImage:`url(${img})`},{backgroundSize:`414px 85px`},{height:`85px`}]" />
  <!-- <van-nav-bar class="navBar" left-text="返回" left-arrow :title="title" @click-left="onClickLeft"
    :style="{backgroundImage:`url(${img}) 100px 100px`}" /> -->
  <!-- </transition> -->
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
  },
  data() {
    return {
      img: require("@/assets/img/nav_bg_2.png")
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.van-nav-bar {
  .van-nav-bar__title {
    font-weight: bold;
    color: white;
    float: left;
    margin-left: 96px;
  }
  .van-nav-bar__text {
    font-weight: bold;
    color: white;
    margin-top: -80px;
  }
}
.navbar {
  z-index: 1;
  background: #892be2c0;
  width: 100%;
}
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0px;
}
.van-nav-bar .van-icon {
  color: #ffffff;
  vertical-align: middle;
  margin-top: -81px;
}
</style>
