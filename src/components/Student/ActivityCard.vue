<template>
  <div>
    <van-card class="card van-hairline--bottom" :desc="content.activityDescription||defaultDescription"
      :thumb="`https://zhsj.bnuz.edu.cn/ComprehensiveSys/${content.imageUrl}`">
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
        <span class="tags-info-btn">
          <van-button class="btn" round="flase" size="small" :to="`/s/activityintroduce?id=${content.activityId}`">立即加入
          </van-button>
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
  },
  data() {
    return {
      defaultDescription: "暂无简介"
    };
  }
};
</script>
<style lang="scss" scoped>
.card {
  background-color: white;
  margin: 14px 12px 12px 12px;
  box-shadow: #dddbdb 0px 1px 7px;
}
.title-size {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  margin-top: 1px;
}
.btn {
  background-color: #1989fa;
  color: white;
  width: 330px;
  height: 30px;
  margin-left: 5px;
  text-align: center;
  border-radius: 5px;
}
.icon-s {
  margin: 0;
  margin-right: 3px;
}
.tags-info {
  // width: 100%;
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  color: #7d7e80;
  margin-bottom: 7px;
}
.tags-info-btn {
  // width: 100%;
  display: inline-flex;
  align-items: center;
  // position: absolute;
  margin-left: -32.33333vw;
  margin-top: 6px;
}
.txtAddress {
  color: #ff8c00;
}
.txtPeopleNum {
  color: #1989fa;
}
.van-card__thumb {
  width: 150px;
  height: 150px;
  position: relative;
  flex: none;
  margin-right: 12px;
  border: none;
}
/deep/.card[data-v-3c11a8e3] {
  background-color: white;
  margin: 3.73333vw 3.2vw 3.2vw 3.2vw;
  // -webkit-box-shadow: #dddbdb 0px 1px 1.86667vw;
  // box-shadow: #dddbdb 0px 1px 1.86667vw;
  box-shadow: none;
}
/deep/.van-image__error {
  display: block;
  width: 68%;
  height: 68%;
}
/deep/.van-image__img {
  display: block;
  width: 68%;
  height: 68%;
}
/deep/.van-image__loading {
  display: block;
  width: 68%;
  height: 68%;
}
/deep/.van-card {
  position: relative;
  box-sizing: border-box;
  padding: 10px 0px;
  color: #323233;
  font-size: 12px;
  background-color: #fafafa;
}
/deep/.van-card__desc {
  max-height: 20px;
  color: #7d7e80;
  margin-bottom: 6px;
}
/deep/.van-card__content {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  min-height: 90px;
  margin-left: -35px;
}
</style>