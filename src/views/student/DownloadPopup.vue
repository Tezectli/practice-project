<template>
  <div class="container">
    <van-popup v-model="show" close-on-click-overlay="false" class="popup" position="top">
      <img style="background-color:#333333;width:100%;height:100%" src="@/assets/img/tip.png" />
    </van-popup>
  </div>
</template>

<script>
import { isOnWechat } from "@/common/other";
import axios from "axios";
import Vue from "vue";
import { Popup,Toast } from "vant";

Vue.use(Popup);
export default {
  name: "DownloadPopup",
  data() {
    return {
      show: false,
      baseUrl: "https://zhsj.bnuz.edu.cn/ComprehensiveSys/teacher/isDownload/false?"
    };
  },
  created() {
    this.isPopup();
  },
  methods: {
    isPopup() {
      if (isOnWechat()) {
        this.show = true;
      } else {
        this.show = false;
        this.downloadFile(this.$route.query.path, this.$route.query.fileName);
      }
    },
    downloadFile(path, fileName) {
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
        .catch(error => {
          if (error.response.status) {
            Toast.fail("该资源链接不存在");
          } else {
            Toast.fail("无法下载该资源");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 300px;
  height: 200px;
}
.popup {
  border: none;
  height: 300px;
  width: 100%;
}
</style>
