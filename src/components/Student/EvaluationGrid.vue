<template>
  <div>
    <van-grid :column-num="3" clickable>
      <van-grid-item icon="shop-collect-o" text="家庭评价" :key="target[0].value" to="/s/evaluation" />
      <van-grid-item icon="user-o" text="自我评价" :key="target[1].value" to="/s/evaluation/studentEvaluation" />
      <van-grid-item icon="friends-o" text="同伴评价" :key="target[2].value" to="/s/evaluation/friendsEvaluation" />
    </van-grid>
  </div>
</template>

<script>
import Vue from "vue";
import { Grid, GridItem } from "vant";

Vue.use(Grid).use(GridItem);
export default {
  name: "EvaluationGrid",
  data() {
    return {
      target: [
        {
          key: "familyTarget",
          value: 4
        },
        {
          key: "studentTarget",
          value: 2
        },
        {
          key: "friendTarget",
          value: 5
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>