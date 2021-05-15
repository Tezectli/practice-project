<template>
  <div id="app">
    <!-- 显示当前路由地址所对应的内容-->
    <transition name="van-slide-left" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    // 处理刷新
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
