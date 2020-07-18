<template>
  <div>
    <course-picker v-model="course" class="mt-1"></course-picker>
    <type-picker v-model="postType"></type-picker>
    <van-cell-group>
      <van-field label="作品标题" v-model="postTitle" placeholder="请输入作品标题" />
      <van-field v-model="postContent" type="textarea" rows="5" autosize placeholder="请输入作品描述" />
      <upload-works @uploaded="getUploadWork" />
    </van-cell-group>
    <van-row type="flex" justify="center" style="margin:15px 0;">
      <van-col span="20">
        <van-button  type="primary" round size="large" class="mt-1" @click="postProduct">提交作品</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import CoursePicker from "./CoursePicker";
import Vue from "vue";
import { Field, CellGroup, Button, Toast,Row,Col } from "vant";
import TypePicker from "./TypePicker";
import UploadWorks from "./UploadWorks";

Vue.use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Toast)
  .use(Col)
  .use(Row);
export default {
  name: "SubmitWorks",
  components: { UploadWorks, TypePicker, CoursePicker },
  data() {
    return {
      course: {},
      postType: "",
      postTitle: "",
      postContent: "",
      topicId: "",
      file:{} 
    };

  },
  methods: {
    getUploadWork(file) {
      
      const map = {
        0 : 'form_post_yanxue',
        1 : 'form_post_shijian',
        2 : 'form_post_fuwu',
        3 : 'form_post_yishu'
      };
      this.topicId = map[this.course.type];
      this.file = file;
    },
    async postProduct() {
      try {
        if(this.postTitle.length === 0)
        {
          Toast.fail("你的标题为空,请重新输入");
        }
        else if(this.postContent.length === 0)
        {
          Toast.fail("你的作品描述为空,请重新输入");
        }
        else if(!this.file.file)
        {
          Toast.fail("你没有上传文件,请上传")
        }
        else 
        {
           await this.$api.submitWork.postProduct(
              this.course.key,
              this.postTitle,
              this.postContent,
              this.postType,
              this.topicId,
              this.file.file
            );
            Toast('作品上传成功')
            this.postTitle = "",
            this.postContent = "",
            this.postType = "",
            this.topicId = "",
            this.file = {}
        }
      } 
      catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
};
</script>

<style scoped>
.mt-1 {
  margin-top: 10px;
}
</style>