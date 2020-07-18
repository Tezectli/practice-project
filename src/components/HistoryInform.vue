<template>
  <div>
    <van-notice-bar left-icon="warning-o" :scrollable="false">
      点击右上角的图片可以查看上传的图片
    </van-notice-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell-group>
        <van-cell v-for="(item, index) in list" :key="index">
          <van-row>
            <van-col span="22">
              <van-row>
                <svg class="color-icon" aria-hidden="true">
                  <use xlink:href="#zhsj-icon-xuesheng" />
                </svg>
                {{item.studentName}}
              </van-row>
              <van-row class="notice">通知：{{item.noticeContent}}</van-row>
            </van-col>
            <van-col span="2">
              <van-icon
                name="photo"
                size="24px"
                @click="showPicture(item.resourceURL)"
              />
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
  import { List, Row, Col, Cell, CellGroup, ImagePreview, Toast, NoticeBar } from 'vant';
  import baseUrl from '@/services/baseUrl'
  import Vue from 'vue'
  Vue.use(List)
      .use(Col)
      .use(Cell)
      .use(CellGroup)
      .use(Row)
      .use(ImagePreview)
      .use(Toast)
      .use(NoticeBar);
  export default {
    name: "HistoryInform",
    data () {
      return {
        list: [],
        loading: false,
        finished: false
      }
    },
    props: {
      week: {
        type: Number,
        require: true
      },
      classId: {
        type: String,
        require: true
      }
    },
    watch: {
      week: {
        handler () {
          if (this.classId !== '') {
            this.getHistoryNotice()
          }
        }
      },
      classId: {
        handler () {
          if (this.classId !== '') {
            this.getHistoryNotice()
          }
        }
      }
    },
    created () {
      if (this.classId !== '') {
        this.getHistoryNotice()
      }
    },
    methods: {
      async getHistoryNotice () {
        try {
          let res = await this.$api.inform.getHistoryNotice(this.classId, this.week);
          this.list = res.data.map(item => {
            return {
              studentName: item.studentName,
              noticeContent: item.noticeContent,
              resourceURL: item.resourceURL
            }
          });
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
        } catch (e) {
          // eslint-disable-next-line
          console.log("​catch -> e", e);
        }
      },
      showPicture (url) {
        if (url !== null) {
          ImagePreview([baseUrl + url])
        } else {
          Toast('暂无上传图片')
        }
      }
    }
  }
</script>

<style scoped>
.color-icon {
  font-size: 12px;
}
.notice {
  color: #777777;
}
</style>
