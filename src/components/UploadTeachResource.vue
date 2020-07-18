/*用于上传教学资源的组件*/
<template>
  <div style="width:100%">
    <van-row>
      <van-row type="flex" justify="center">
        <van-col span="18" class="uploader-col">
          <van-uploader
            v-model="fileList"
            :max-count="5"
            :after-read="afterRead"
            :max-size="10485760"
            preview-image="true"
            :oversize="oversize"
            result-type="file"
            accept="image/*,video/*, .pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .zip, .rar"
          />
        </van-col>
      </van-row>
      <div style="text-align:center;width:100%">
        <van-button type="primary" @click="deleteFile" style="width:80px">上传</van-button>
      </div>
    </van-row>
    <div class="desc">支持格式：rar .zip .doc .docx .pdf .jpg .xls .mp4</div>
    <div class="desc">文件大小总和不超过10M</div>
  </div>
</template>

<script>
import { Uploader, Row, Col, Toast,Button } from "vant";
import Vue from "vue";
Vue.use(Uploader)
  .use(Row)
  .use(Col)
  .use(Button);
export default {
  name: "UploadTeachResource",
  data() {
    return {
      fileList: []
    };
  },
  model: {
    prop: "files",
    event: "change"
  },
  props: {
    classId: {
      type: String,
      required: true
    },
    isShare: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 上传成功后的回调
    afterRead(file) {
      try {
        this.uploadTeachResource(file);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    async uploadTeachResource(file) {
      try {
        await this.$api.upload.uploadTeachResource(
          file,
          this.classId,
          this.isShare
        );
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    oversize() {
      Toast.fail("上传文件超过限制");
    },
    deleteFile() {
      if (this.fileList.length > 0) {
        this.fileList = [];
        Toast.success("文件上传成功");
        this.$emit("change", true);
      } else {
        Toast.fail("您尚未上传资源");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.uploader-col {
  @include m-auto;
}
.desc {
  color: #bec6d5;
  font-size: 12px;
  line-height: 18px;
}
</style>
