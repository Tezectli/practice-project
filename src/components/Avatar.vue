/* 圆形头像组件 -润 */
/* 2020.10.8修改-圆角头像组件 -诗婷 */
<template>
  <van-image :src="img" :width="size" :height="size" radius="7px" fit="cover">
    <template v-slot:loading>
      <van-loading type="spinner" size="20" />
    </template>
  </van-image>
</template>
<script>
import Vue from "vue";
import { Image, Loading } from "vant";
Vue.use(Image).use(Loading);
export default {
  name: "Avatar",
  props: {
    textColor: String,
    src: {
      type: String,
      required: false
    },
    size: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      // img: require(`https://zhsj.bnuz.edu.cn/ComprehensiveSys/${this.src}`)
      // img: require('@/assets/img/avatar.png')
      img: require("@/assets/img/userpic.png")
    };
  }
};
</script>
<style scoped>
</style>
