/*通知详情组件*/
<template>
  <div>
    <van-panel title="通知">
      <van-cell-group>
        <van-field
          type="textarea"
          v-model="content"
          placeholder="请输入通知内容"
          autosize
          @input="getInformInfo"
        >
        </van-field>
      </van-cell-group>
      <upload-file @uploaded="getUploadedInfo" />
    </van-panel>
  </div>
</template>

<script>
  import { Panel, Uploader, Field, CellGroup } from 'vant';
  import Vue from 'vue';
  import UploadFile from "./UploadFile";
  Vue.use(Panel).use(Uploader).use(Field).use(CellGroup);
  export default {
    name: "InformDetail",
    components: {UploadFile},
    data () {
      return {
        content: '',
        fileList: []
      }
    },
    methods: {
      getInformInfo() {
        try {
          this.$emit('informInfoChange',this.content)
        } catch (e) {
          // eslint-disable-next-line
          console.log("​catch -> e", e);
        }
      },
      getUploadedInfo (resourceId) {
        this.$emit('getUploadedInfo', resourceId)
      }
    }
  }
</script>

<style scoped>

</style>
