/* 学生端教师资源 -邦 */
<template>
  <div class="container">
    <van-cell class="course-resource">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="课程资源列表" name="1">
          <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">{{this.notice}}</van-notice-bar>
          <van-cell-group>
            <van-swipe-cell v-for="(item,index) in teachRes" :key="item.resourceId">
              <van-cell :border="false">
                <span
                  slot="title"
                  @click="downloadFile(`${item.resourceURL}`,item.nowFileName)"
                >{{index+1+`. `}}{{item.nowFileName}}</span>
              </van-cell>
            </van-swipe-cell>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
    </van-cell>
  </div>
</template>

<script>
import { isOnWechat } from "@/common/other";
import axios from "axios";
import Vue from "vue";
import {
  CellGroup,
  Cell,
  Button,
  SwipeCell,
  Collapse,
  CollapseItem,
  NoticeBar,
  Toast
} from "vant";
Vue.use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(SwipeCell)
  .use(Collapse)
  .use(CollapseItem)
  .use(NoticeBar);
export default {
  name: "TeachResource",
  data() {
    return {
      teachRes: [],
      baseUrl: "https://zhsj.bnuz.edu.cn/ComprehensiveSys",
      activeNames: ["1"],
      notice: "暂无课程资源"
    };
  },
  mounted() {
    this.getTeachResource();
  },
  methods: {
    async getTeachResource() {
      let res = await this.$api.course.getTeachResource();
      this.teachRes = res.data;
      if (this.teachRes.length == 0) {
        this.notice = "暂无课程资源";
      } else {
        this.notice = "点击资源可以立刻下载噢！";
      }
    },
    downloadFile(path, fileName) {
      if (isOnWechat()) {
        this.$router.push({
          path: '/s/downloadPopup/',
          query: { path: path, fileName: fileName}
        });
      } else {
        const isSupport = "download" in document.createElement("a");
        if (isSupport) {
          axios({
            url: this.baseUrl+"nowFileName="+fileName+"&resourceURL="+path,
            method: "GET",
          }).then(() => {
              let src = this.baseUrl+"nowFileName="+fileName+"&resourceURL="+path;
              let iframe = document.createElement('iframe');
              iframe.style.display = 'none';
              // eslint-disable-next-line
              iframe.src = "javascript: '<script>location.href=\"" + src + "\"<\/script>'";
              document.getElementsByTagName('body')[0].appendChild(iframe);
          })
          .catch(error =>{
            if(error.response.status){
              Toast.fail("该资源链接不存在")
            }
            else{
              Toast.fail("无法下载该资源")
            }
          });
        }
        else{
          Toast.fail("当前浏览器不支持该下载")
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 667px;
  background-color: white;
}
</style>