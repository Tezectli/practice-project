<template>
  <div style="width:100%">
    <van-row>
      <van-row type="flex" justify="center">
        <van-col span="18" class="uploader-col">
          <van-uploader
            v-model="fileList"
            :max-count="1"
            upload-text="点击上传"
            :after-read="afterRead"
          />
        </van-col>
      </van-row>
    </van-row>
  </div>
</template>

<script>
import { Uploader, Row, Col } from 'vant';
import Vue from 'vue';
Vue.use(Uploader).use(Row).use(Col);
export default {
  name: "UploadWorks",
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    afterRead (file) {
      this.$emit('uploaded', file)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.uploader-col{
  @include m-auto;
}
</style>