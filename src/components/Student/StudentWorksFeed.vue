<template>
  <article class="feed" @click="show=true">
    <van-row gutter="10" type="flex" justify="space-around" class="feed-row">
      <van-col span="16" class="feed-row__left">
        <van-row>
          <van-col span="24">
            <span class="feed-title van-hairline--bottom">
              <van-tag type="success" plain size="medium">{{work.topic}}</van-tag>&nbsp;
              <van-tag plain size="medium">{{work.postType}}</van-tag>
              &nbsp;
              {{work.postTitle}}
            </span>
          </van-col>
          <van-col span="24">
            <div class="feed-content">{{work.postContent}}</div>
          </van-col>
          <van-col span="24">
            <div class="feed-bottom">
              <span class="feed-bottom__time">{{diffTime}}&nbsp;&nbsp;{{work.thumbUpNumbers}}赞</span>
            </div>
          </van-col>
        </van-row>
      </van-col>
      <van-col span="8" class="feed-row__right">
        <van-image v-if="displayType === 'img'" fit="cover" width="31vw" height="31vw" lazy-load :src="fileUrl"
          class="feed-row__right-img">
          <template v-slot:error>加载失败</template>
        </van-image>
        <video v-else-if="displayType === 'video'" width="31vw" height="31vw" :src="fileUrl" controls="controls"
          class="feed-row__right-img" />
        <audio v-else-if="displayType === 'audio'" :src="fileUrl" controls="controls" class="feed-row__right-img" />
        <van-image v-else fit="cover" width="31vw" height="31vw" lazy-load :src="fileUrl" class="feed-row__right-img">
          <template v-slot:error>暂无上传作品</template>
        </van-image>
        <van-tag mark type="danger" class="feed-row__right-tag" size="medium" v-show="work.commentLevel">
          {{work.commentLevel}}</van-tag>
      </van-col>
    </van-row>
    <van-popup v-model="show" get-container="#app" position="bottom">
      <van-cell-group>
        <van-field :value="work.commentLevel" label="等级" left-icon="gem-o" readonly />
        <van-field :value="teahcerSaid" label="老师评价" left-icon="contact" type="textarea" readonly />
      </van-cell-group>
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
  CellGroup,
  Cell,
  Field,
  Popup
} from "vant";
import Vue from "vue";
import { getDateDiff } from "@/common/time";
Vue.use(Row)
  .use(Col)
  .use(Image)
  .use(Lazyload)
  .use(Tag)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Popup);
export default {
  name: "StudentWorksFeed",
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      postTitle: this.work.postTitle,
      topic: this.work.topic,
      fileType: this.work.fileType,
      postContent: this.work.postContent,
      buildTime: this.work.buildTime,
      show: false
    };
  },
  computed: {
    fileUrl() {
      return `https://zhsj.bnuz.edu.cn/ComprehensiveSys/${this.work.fileUrl}`;
    },
    diffTime() {
      return getDateDiff(this.work.buildTime);
    },
    displayType() {
      const map = {
        ".jpg": "img",
        ".png": "img",
        ".mp4": "video",
        ".mp3": "audio"
      };
      return map[this.fileType];
    },
    teahcerSaid() {
      return this.work.commentContent ? this.work.commentContent : "未评价";
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
    margin-left: 10px;
    margin-top: 10px;
    justify-content: flex-start;
    border-color: $primary;
    color: #676f77;
    &__author {
      margin-left: auto;
      margin-right: 3px;
      font-size: 12px;
      color: $grey-word;
    }
  }
  &-content {
    margin-left: 10px;
    margin-top: 10px;
    @extend .p;
  }
  &-bottom {
    margin-left: 5px;
    margin-top: 5px;
    font-size: 12px;
    color: $grey-word;
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
}
/*更改卡片标签颜色*/
/deep/.van-tag--success.van-tag--plain {
  color: #1989fa;
}
</style>