// 作品墙页面 -润 2019/12/2
<template>
  <div class="workWall">
    <class-picker v-model="classId" />
    <work-masonry class="masonry" :classId="classId"/>
  </div>
</template>
<script>
import ClassPicker from "@/components/Student/ClassPicker";
import WorksMasonry from "@/components/Student/WorksMasonry";
export default {
  name: "WorkWall",
  components: {
    "class-picker": ClassPicker,
    "work-masonry":WorksMasonry
  },
  data() {
    return {
      classId: "",
    };
  },
};
</script>
<style lang="scss" scoped>
    .masonry{
        margin-bottom: 50px;
    }
</style>