/* 图片文件上传组件
To use :classId='classId',@upload="uploaded"
(这个事件会在图片成功上传服务器后触发，包含三个回调参数,第一个是resourceId,第二个是资源链接,第三个是当前文件的名字)
 */
<template>
  <div style="width:100%">
    <van-row type="flex" justify="center">
      <van-col span="18" class="uploader-col">
         <van-uploader v-model="fileList" :max-count="1" upload-text="点击上传" :after-read="afterRead" />
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Uploader } from "vant";
import Vue from "vue";
Vue.use(Uploader);
export default {
  name: "UploadFile",
  props: {
    classId: {
      type: String
      // required:true,
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    // 上传成功后的回调
    afterRead(file) {
      try {
        this.upload(file);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    //上传图片接口
    async upload(file) {
      let res = await this.$api.upload.uploadPictures(file, this.classId);
      const { resourceId, resourceURL, nowFileName } = res.data.data.data[0];
      this.$emit("uploaded", resourceId, resourceURL, nowFileName);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.uploader-col{
  @include m-auto;
}
</style>
