/* 主页 */
<template>
  <div class="page">
    <user-board/>
    <home-grid/>
    <transition name="van-slide-right">
      <router-view />
    </transition>
  </div>
</template>
<script>
import HomeGrid from "@/components/HomeGrid";
import UserBoard from "@/components/UserBoard";
export default {
  components: {
    "home-grid": HomeGrid,
    "user-board": UserBoard,
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
</style>
