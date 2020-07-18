<template>
  <article class="feed">
    <div @click="popupShow = true">
      <van-row
        gutter="10"
        type="flex"
        justify="space-around"
        class="feed-row"
        @click="popupShow = !popupShow"
      >
        <van-col span="16" class="feed-row__left">
          <van-row>
            <van-col span="24">
              <span class="feed-title van-hairline--bottom">
                <van-tag :type="topicTag" plain size="medium" color="#78909c">{{work.topicType || "其它"}}</van-tag>
                &nbsp;
                {{work.postTitle}}
                <span
                  class="feed-title__author"
                >{{work.studentName}}</span>
              </span>
            </van-col>
            <van-col span="24">
              <div class="feed-content">{{work.postContent}}</div>
            </van-col>
            <van-col span="24">
              <div class="feed-bottom">
                <span class="feed-bottom__time">{{diffTime}}</span>
                ·
                <span class="feed-bottom__course">{{work.className}}</span>
              </div>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="8" class="feed-row__right">
          <van-image
            fit="cover"
            width="31vw"
            height="31vw"
            lazy-load
            :src="img"
            class="feedfeed-row__right-img"
          />
          <van-tag
            mark
            type="danger"
            class="feed-row__right-tag"
            size="medium"
            v-if="level"
          >{{level}}</van-tag>
        </van-col>
      </van-row>
    </div>
    <van-popup v-model="popupShow" position="bottom" round class="feed-popup" get-container="body">
      <van-radio-group v-model="cacheLevel">
        <van-cell-group title="评分等级">
          <van-row>
            <van-col span="8">
              <van-cell title="优" clickable @click="cacheLevel = '优'">
                <van-radio slot="right-icon" name="优" checked-color="#78909c" />
              </van-cell>
            </van-col>
            <van-col span="8">
              <van-cell title="良" clickable @click="cacheLevel = '良'">
                <van-radio slot="right-icon" name="良" checked-color="#d7d7d7" />
              </van-cell>
            </van-col>
            <van-col span="8">
              <van-cell title="中" clickable @click="cacheLevel = '中'">
                <van-radio slot="right-icon" name="中" checked-color="red" />
              </van-cell>
            </van-col>
          </van-row>
        </van-cell-group>
      </van-radio-group>
      <van-field
        v-model="content"
        label="评语"
        type="textarea"
        placeholder="请输入评语"
        rows="1"
        autosize
      />
      <van-row type="flex" justify="center" style="margin:15px 0;">
        <van-col span="16">
          <van-button type="primary" block round :loading="postLoading" @click="evaluateStudentWorks">评价</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </article>
</template>
<script>
import {
  Row,
  Col,
  Image,
  Lazyload,
  Tag,
  RadioGroup,
  Radio,
  CellGroup,
  Cell,
  Field
} from "vant";
import Vue from "vue";
// import baseUrl from "@/services/baseUrl";
import { getDateDiff } from "@/common/time";
Vue.use(Row)
  .use(Col)
  .use(Image)
  .use(Lazyload)
  .use(Tag)
  .use(RadioGroup)
  .use(Radio)
  .use(Cell)
  .use(CellGroup)
  .use(Field);
export default {
  name: "WorksFeed",
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      popupShow: false,
      level:this.work.commentLevel,
      content: this.work.commentContent,
      postLoading:false,
      cacheLevel:this.work.commentLevel
    };
  },
  computed: {
    diffTime() {
      return getDateDiff(this.work.buildTime);
    },
    img() {
      return `https://zhsj.bnuz.edu.cn/ComprehensiveSys/${this.work.fileUrl}`;
    },
    topicTag() {
      const topicType = { yanxue: "研学", shijian: "实践" };
      let tag = "primary";
      if (this.work.topicType == topicType.yanxue) {
        tag = "success";
      }
      return tag;
    }
  },
  methods:{
    async evaluateStudentWorks(){
      this.postLoading = true
      try {
        await this.$api.works.evaluateStudentWorks(this.work.postId,this.cacheLevel,this.content,this.work.studentId)
      } catch (error) {
        // eslint-disable-next-line
        console.error("​catch -> e", error);
      }
      this.level = this.cacheLevel
      this.postLoading = false
      this.popupShow = false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.feed {
  height: 140px;
  width: 95%;
  background: $white;
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
  //   @extend .overlay
  &-row {
    width: 100%;
    height: 100%;
    &__right {
      @include m-auto;
      position: relative;
      &-img {
        width: 100px;
        height: 100px;
      }
      &-tag {
        position: absolute;
        right: 90px;
        top: 15px;
      }
    }
  }
  &-title {
    @include m-auto;
    width: 100%;
    height: 100%;
    font-weight: 550;
    font-size: 110%;
    margin-left: 5px;
    margin-top: 5px;
    justify-content: flex-start;
    border-color: $primary;
    color: $primary;
    &__author {
      margin-left: auto;
      margin-right: 3px;
      font-size: 12px;
      color: $grey-word;
    }
  }
  &-content {
    margin-left: 5px;
    margin-top: 5px;
    @extend .p;
  }
  &-bottom {
    margin-left: 5px;
    margin-top: 5px;
    font-size: 12px;
    color: $grey-word;
    //   &__time{
    //     font-size: 12px;
    //     color: $grey-word;
    //   }
    //   &__course{
    //     font-size: 12px;
    //     color: $grey-word;
    //   }
  }
  // &-popup {
  //   height: 150px;
  // }
}
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: $black;
  opacity: 0.1;
  z-index: 300;
  overflow: hidden;
}
</style>
