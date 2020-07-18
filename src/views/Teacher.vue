/*  页面容器 */
<template>
  <div id="Main">
    <!-- 显示当前路由地址所对应的内容-->
    <keep-alive :include="include">
      <!-- 需要缓存的视图组件 -->
      <transition name="fade" mode="out-in">
        <router-view v-if="$route.meta.keepAlive" />
      </transition>
    </keep-alive>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
    <van-tabbar route>
      <van-tabbar-item to="/t/home">
        <!-- <span>首页</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="home" size="25" />
      </van-tabbar-item>
      <van-tabbar-item to="/t/course">
        <!-- <span>课程</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="read" size="25" />
      </van-tabbar-item>
      <van-tabbar-item to="/t/attendance">
        <!-- <span>考勤</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="calendar-check" size="25" />
      </van-tabbar-item>
      <van-tabbar-item to="/t/works">
        <!-- <span>作品</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="experiment" size="25" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/t/user">
        <!-- <span>中心</span> -->
        <van-icon slot="icon" class-prefix="zhsj-icon" name="user" size="25" />
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
  name: "Teacher",
  data() {
    return {
      include:[],
    }
  },
  watch:{
     $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.path);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
};
</script>

<style>
</style>
