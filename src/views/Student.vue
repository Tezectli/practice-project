/*  页面容器 */
<template>
  <div id="main">
    <!-- 显示当前路由地址所对应的内容-->
    <transition name="van-slide-left" mode="out-in">
      <router-view />
    </transition>
    <van-tabbar route>
      <van-tabbar-item to="/s/home" class="item">
        <!-- <span>首页</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="home" size='25' />
      </van-tabbar-item>
      <van-tabbar-item to="/s/evaluation" class="item">
        <!-- <span>综合评价</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="crown1" size='25' />
      </van-tabbar-item>
      <van-tabbar-item to="/s/radar" class="item">
        <!-- <span>考勤</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="radarchart" size='25' />
      </van-tabbar-item>
      <van-tabbar-item to="/s/user" class="item">
        <!-- <span>中心</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="user" size='25' />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";
vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon);
export default {
  name: "Student"
};
</script>
<style lang="scss" scoped>
/* #main{
  background: url('/BG.jpg') center center no-repeat;
} */
.van-tabbar {
  background-color: rgb(248, 248, 248);
}
</style>
