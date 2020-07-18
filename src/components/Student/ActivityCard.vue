<template>
  <div>
    <van-card
      class="card van-hairline--bottom"
      :desc="content.activityDescription"
      :thumb="`https://zhsj.bnuz.edu.cn/ComprehensiveSys/${content.imageUrl}`"
    >
      <div slot="tags">
        <span class="tags-info">
          <van-icon name="clock-o" size="20px" class="icon-s" />
          {{content.activityStartTime}} ~ {{content.activityEndTime}}
        </span>
        <span class="tags-info">
          <van-icon name="location" size="20px" class="icon-s" color="#FF8C00" />
          <span class="txtAddress">{{content.activityAddress}}</span>
        </span>
        <span class="tags-info">
          <van-icon name="friends" size="20px" class="icon-s" color="#1989fa" />
          <span class="txtPeopleNum">{{content.maxCount}}</span>
        </span>
        <!-- 跳转活动报名页面 -->
        <span class="tags-info">
          <van-button
            class="btn"
            round="true"
            size="small"
            :to="`/s/activityintroduce?id=${content.activityId}`"
          >进入</van-button>
        </span>
      </div>
      <div slot="title" class="title-size">{{content.activityName}}</div>
    </van-card>
  </div>
</template>
<script>
import Vue from "vue";
import { Card, Tag, Button } from "vant";
Vue.use(Card)
  .use(Tag)
  .use(Button);
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  background-color: white;
}
.title-size {
  font-size: 16px;
  font-weight: 500;
}
.btn {
  background-color: #1989fa;
  color: white;
  width: 130px;
  height: 30px;
  margin-left: 5px;
  text-align: center;
}
.icon-s {
  margin: 0;
  margin-right: 3px;
}
.tags-info {
  width: 100%;
  display: inline-flex;
  align-items: center;
}
.txtAddress {
  color: #ff8c00;
}
.txtPeopleNum {
  color: #1989fa;
}
.van-card__thumb{
  width: 150px;
  height: 150px;
  position: relative;
  flex: none;
  margin-right: 12px;
}
</style>