<template>
  <div>
    <van-button plain round class="btn-add" @click="show=true">
      <svg class="color-icon icon-s" aria-hidden="true">
        <use xlink:href="#zhsj-icon-dictation" />
      </svg>
    </van-button>
    <van-popup v-model="show" round position="center" class="activityModel">
      <van-cell>
        <template slot="title">
          <span class="custom-title">上传活动</span>
          <van-button type="primary" size="small" class="btn" @click="addActivityWall">发布</van-button>
        </template>
      </van-cell>
      <van-field type="textarea" v-model="content" placeholder="这一刻的想法..." rows="4" autosize />
      <van-row type="flex" justify="center" style="margin:10px 0;">
        <van-uploader v-model="fileList" multiple="true" :max-count="9" preview-size="100px" />
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import { Button, Icon, Popup, Cell, CellGroup, Field, Uploader } from "vant";
import Vue from "vue";
Vue.use(Button)
  .use(Icon)
  .use(Popup)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Uploader);
export default {
  data() {
    return {
      loading: true,
      show: false,
      fileList: [],
      content: ""
    };
  },
  methods: {
    async addActivityWall() {
      try {
        await this.$api.upload.addActivityWall(this.content, this.fileList);
        // 隐藏弹窗
        this.show = false;
        // 移除内容
        this.content=""
        this.fileList=[]
        // 通知父级刷新列表
        this.$emit("added")
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    }
  }
};
</script>
<style lang="scss"  scoped>
@import "@/scss/base.scss";
.btn-add {
  position: fixed;
  right: 15px;
  bottom: 65px;
  width: 50px;
  height: 50px;
  background-color: #ffeb3b;
  z-index: 10;
  border: none;
  text-align: start;
}
.activityModel {
  width: 90%;
  min-height: 40%;
}
.btn {
  position: relative;
  float: right;
  border-radius: 10%;
}
.icon-s {
  width: 40px;
  height: 35px;
}
</style>
