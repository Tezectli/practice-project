// 学生单个作品展示组件，可点赞 - 润 2019/12/3
// 对参数进行约束避免渲染bug -邦 2020/3/23
<template>
  <div class="card">
    <div class="card-header">
      <van-image width="100%" fit="contain" :src="url" lazy-load radius="10px" style="margint-top:5px">
        <template v-slot:error>加载失败</template>
      </van-image>
    </div>
    <div class="card-title">
      <div style="margin-right:6px">{{work.postTitle}}</div>
      <van-tag plain type="primary">{{work.workType==null? ' ':work.workType}}</van-tag>
    </div>
    <div class="card-content">{{work.postContent==null? ' ':work.postContent}}</div>
    <div class="card-info">
      <span class="card-info__left">
        <van-button class="info-left__btn" plain round size="mini" @click="postLike">
          <van-icon class-prefix="zhsj-icon" :name="icon" size="18" color="red" />
          <span style="font-size:15px;margin-left:2px">{{like}}</span>
        </van-button>
      </span>
      <span class="card-info__right">{{work.studentName==null? '佚名':work.studentName}}&nbsp;{{diffTime}}</span>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Image, Lazyload, Button, Icon, Tag } from "vant";
import { getDateDiff } from "@/common/time";
Vue.use(Image)
  .use(Lazyload)
  .use(Tag)
  .use(Button)
  .use(Icon);
export default {
  name: "WorkCard",
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      like: this.work.thumbUpNumbers,
      likeStatus: this.work.thumb
    };
  },
  computed: {
    //   返回格式类似“三天前”的时间
    diffTime() {
      if (this.work.buildTime != null) {
        return getDateDiff(this.work.buildTime);
      } else {
        return getDateDiff("2019-10-31 15:52:44");
      }
    },
    // 改变按钮icon实心空心
    icon() {
      return this.likeStatus ? "like-fill" : "like";
    },
    url() {
      if (this.work.fileUrl == null) {
        return "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584945377317&di=7cdef76bb1e1297acaff477885cf4128&imgtype=0&src=http%3A%2F%2Fimg.ccutu.com%2Fupload%2Fimages%2F2017-6%2Fp00076873.png";
      } else {
        return "https://zhsj.bnuz.edu.cn/ComprehensiveSys/" + this.work.fileUrl;
      }
    }
  },
  methods: {
    // 点赞
    async postLike() {
      this.changeLikeStatus();
      try {
        await this.$api.works.postLike(this.work.classId, this.work.postId);
      } catch (e) {
        this.changeLikeStatus();
        // eslint-disable-next-line
        console.log(e);
      }
    },
    // 改变点赞状态影响样式
    changeLikeStatus() {
      this.likeStatus ? this.like-- : this.like++;
      this.likeStatus = !this.likeStatus;
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 7px;
  background: #fff;
  box-shadow: 2px 2px 7px rgb(236, 236, 236);
  border-radius: 0px;
  &-header {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 40px;
  }
  &-title {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 8px;
    padding-top: 3px;
    margin: 5px 0;
    font-weight: bold;
    font-size: 14px;
    color: #777;
  }
  &-content {
    padding-left: 8px;
    color: #999999;
    font-size: 12px;
    line-height: 25px;
  }
  &-info {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 8px;
    padding-left: 8px;
    color: #d4d4d4;
    height: 35px;
    margin-bottom: 4px;
    &__right {
      font-size: 12px;
    }
  }
}
</style>