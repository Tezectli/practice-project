// 作品墙页面 -润 2019/12/2
<template>
  <div class="workWall">
    <nav-bar title="精彩瞬间" />
    <class-picker v-model="classId" />
    <work-masonry class="masonry" :classId="classId" />
  </div>
</template>
<script>
import NavBar from "@/components/NavBarColor";
import ClassPicker from "@/components/Student/ClassPicker";
import WorksMasonry from "@/components/Student/WorksMasonry";
export default {
  name: "WorkWall",
  components: {
    "class-picker": ClassPicker,
    "work-masonry": WorksMasonry,
    "nav-bar": NavBar
  },
  data() {
    return {
      classId: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.masonry {
  margin-bottom: 50px;
}
/deep/.van-tabs--card {
  padding-top: 0px;
}
</style>