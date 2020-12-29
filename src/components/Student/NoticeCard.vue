// 课程通知卡片 -润 2019/12/8
<template>
  <article class="card">
    <div class="card-left">
      <van-image width="100%" height="100%" lazy-load :src="imgUrl" />
    </div>
    <div class="card-right">
      <div class="card-right__title">
        <span class="card-right__title-teacher van-ellipsis">{{notice.teacherName || '未知'}}</span>
        <span class="card-right__title-class van-ellipsis">/{{notice.className || '未知'}}</span>
      </div>
      <div class="card-right__content van-multi-ellipsis--l3">{{notice.noticeContent}}</div>
      <div class="card-right__time">{{diffTime}}</div>
    </div>
  </article>
</template>
<script>
import Vue from "vue";
import { Image, Lazyload } from "vant";
import { getDateDiff } from "@/common/time";
Vue.use(Image).use(Lazyload);
export default {
  name: "NoticeCard",
  props: {
    notice: {
      type: Object,
      required: true
    }
  },
  computed: {
    diffTime() {
      return getDateDiff(this.notice.noticeTime);
    },
    imgUrl() {
      return `https://zhsj.bnuz.edu.cn/ComprehensiveSys/${this.notice.resourceURL}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  width: 95%;
  height: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  margin-bottom: 10px;
  &-left {
    flex: 2;
    height: 100%;
    // background-color: rgb(175, 175, 175);
  }
  &-right {
    flex: 3;
    margin-left: 10px;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    &__title {
      flex: 1;
      font-size: 14px;
      font-weight: 550;
      color: #777;
      padding: 7px 0 0 7px;
      &-class {
        font-size: 14px;
      }
    }
    &__content {
      position: relative;
      flex: 3;
      padding: 0 7px 7px 7px;
      // margin: 10px;
      border-radius: 8px;
      // background: #1ab394;
      color: rgb(124, 124, 124);
      // font-weight: bold;
      font-size: 12px;
      margin-top: -9px;
      margin-bottom: 9px;
      // &::before {
      //   content: "";
      //   display: block;
      //   position: absolute;
      //   top: -9px;
      //   left: 10px;
      //   border-left: 12px solid transparent;
      //   border-right: 12px solid transparent;
      //   border-bottom: 12px solid #1ab394;
      // }
    }
    &__time {
      width: 90%;
      position: absolute;
      display: inline-flex;
      justify-content: flex-end;
      bottom: 15px;
      font-size: 12px;
      color: rgb(49, 49, 49);
    }
  }
  /deep/.van-image__error {
    display: block;
    width: 90%;
    height: 80%;
    margin: 10px 0 0 10px;
  }
  /deep/.van-image__img {
    display: block;
    width: 90%;
    height: 80%;
    margin: 10px 0 0 10px;
  }
  /deep/.van-image__loading {
    display: block;
    width: 90%;
    height: 80%;
    margin: 10px 0 0 10px;
  }
}
</style>