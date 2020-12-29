<template>
  <div class="page">
    <nav-bar title="自我评价" />
    <evaluation-grid></evaluation-grid>
    <transition name="van-fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import EvaluationGrid from "../../components/Student/EvaluationGrid";
import NavBar from "@/components/NavBar";
export default {
  name: "Evaluation",
  components: {
    EvaluationGrid,
    "nav-bar": NavBar
  },
  data() {
    return {
      target: 0
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
</style>