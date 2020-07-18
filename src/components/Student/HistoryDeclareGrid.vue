<template>
  <div class="grid mt-1">
    <van-card class="grid-card">
      <div slot="title">
        <van-row class="grid-card-title">申报内容</van-row>
        <van-divider class="grid-card-divider" />
      </div>
      <div slot="tags">
        <van-field
          v-model="message"
          rows="3"
          autosize
          readonly
          type="textarea"
          class="grid-card-content"
        />
      </div>
      <div slot="footer">
        <van-row class="grid-card-footer">
          <van-icon class="grid-card-footer-icon" name="clock-o" />
          <span class="grid-card-footer-time">申报时间：{{declare.submitTime}}</span>
        </van-row>
      </div>
    </van-card>
  </div>
</template>

<script>
import Vue from 'vue';
import { Card, Row, Divider, Field, Icon } from 'vant';

Vue.use(Card)
    .use(Row)
    .use(Divider)
    .use(Field)
    .use(Icon);
export default {
  name: "HistoryDeclareGrid",
  props: {
   declare: {
     type: Object,
     required: true
   }
  },
  data () {
    return {
      message: this.declare.content
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  width: 95%;
  margin: 0 auto;

  &-card {
    background-color: white;
    border-radius: 15px;

    &-title {
      font-size: 14px;
      margin-top: 10px;
    }
    &-content {
      padding: 0;
    }
    &-footer {
      color: gray;
      font-size: 10px;
      &-icon {
        vertical-align: middle;
        margin-right: 3px;
      }
      &-time {
        vertical-align: middle;
      }
    }
  }
}
.mt-1 {
  margin-top: 10px;
}
</style>