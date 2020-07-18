<template>
  <div class="feed">
    <van-row type="flex" justify="space-around" class="feed-row">
      <van-col span="24">
        <div class="feed-title ">
          <span class="title__user">{{content.userName}}</span>
          <van-icon name="delete" class="title__btn-delete" @click="deleteActivity(content.time)" />
        </div>
        <van-col span="24">
          <div class="feed-content">
            <p class="p-setting">{{content.content}}</p>
          </div>
        </van-col>
        <van-col span="24" v-show="hasImg">
          <van-grid :column-num="3" :border="false" class="grid-padding">
            <van-grid-item v-for="(value,index) in img" :key="index" @click="showImg(index)">
              <van-image width="115%" height="125%" fit="cover" :src="value" />
            </van-grid-item>
          </van-grid>
        </van-col>
        <van-col span="24">
          <div class="feed-time">
            <span class="feed-bottom__time">{{Time}}</span>
          </div>
        </van-col>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Row, Col, ImagePreview, Image } from "vant";
import { getDateDiff } from "@/common/time";
import Vue from "vue";
Vue.use(Row)
  .use(Col)
  .use(ImagePreview)
  .use(Image);
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
      index: 0,
      time: ""
    };
  },
  computed: {
    Time() {
      return getDateDiff(this.content.time);
    },
    img() {
      const urlList = this.content.urlList;
      //判断图片是否为空
      if (urlList.length > 0 && urlList[0] != "") {
        return this.content.urlList.map(item => {
          return `https://zhsj.bnuz.edu.cn/ComprehensiveSys/${item}`;
        });
      } else {
        return [];
      }
    },
    hasImg() {
      const urlList = this.content.urlList;
      // 判断活动墙是否有图
      if (urlList.length > 0 && urlList[0] != "") {
        return true;
      }
      return false;
    }
  },
  methods: {
    async deleteActivity(time) {
      try {
        await this.$api.activity.deleteActivityWall(time);
        this.$emit("refresh");
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    showImg(index) {
      ImagePreview({
        images: this.img,
        startPosition: index
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.feed {
  //   min-height: 60px;
  width: 95%;
  background: $white;
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
  &-row {
    width: 100%;
    height: 100%;
  }
  &-title{
    display: inline-flex;
    width: 100%;
    margin: 0;
    font-weight: 500;
    line-height: 2;
    justify-content: center;
    align-items: center;
    background: $bg;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    .title__user{
      margin-left: 5px;
    }
    .title__btn-delete{
      width: 18px;
      height: 18px;
      margin-left: auto;
      margin-right: 5px;
    }
  }
  &-content {
    margin-right: 5px;
    margin-left: 5px;
  }
  &-time {
    height: 35px;
    font-size: 14px;
    color: $grey-word;
    padding: 5px;
    margin-left: 5px;
  }
}
.w {
  background-color: red;
  margin: 5px;
}
.grid-padding {
  margin: 5px;
}
.p-setting {
  font-size: 15px;
  margin: 8px;
  font-weight: 330;
}
</style>