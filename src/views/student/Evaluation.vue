<template>
  <div class="page">
    <evaluation-grid></evaluation-grid>
    <transition name="van-slide-right">
      <router-view />
    </transition>
  </div>
</template>

<script>
import EvaluationGrid from "../../components/Student/EvaluationGrid";
export default {
  name: "Evaluation",
    components: {EvaluationGrid},
    data () {
      return {
        target: 0
      }
    }
}
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
</style>