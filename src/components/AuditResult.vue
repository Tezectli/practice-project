/*用户查看审核结果的组件*/
<template>
  <div>
    <van-notice-bar left-icon="warning-o" :scrollable="false">
      点击右上角的图片可以预览审核的图片
    </van-notice-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell-group>
        <van-cell v-for="item in list" :key="item.studentId">
          <van-row>
            <van-col span="22">
              <svg class="color-icon" aria-hidden="true">
                <use xlink:href="#zhsj-icon-xuesheng" />
              </svg>
              <span>{{item.studentName}}</span>
            </van-col>
            <van-col span="2">
              <van-icon
                name="photo"
                size="24px"
                @click="showPicture(item.resourceURL)"
                class="pic"
              />
            </van-col>
          </van-row>
          <van-row>
            <van-field
              readonly
              autosize
              label="审核内容:"
              :value="item.content"
            />
          </van-row>
          <van-row>
            <van-field
              v-if="item.checked === 1"
              readonly
              autosize
              label="审核状态:"
              value="已审核"
            >
              <van-icon slot="right-icon" name="success" color="#4caf50" />
            </van-field>
            <van-field
              v-else
              readonly
              autosize
              label="审核状态:"
              value="未审核"
            >
              <van-icon slot="right-icon" name="cross" color="red" />
            </van-field>
          </van-row>
          <van-row>
            <van-field
              v-if="item.passed === 1"
              readonly
              autosize
              label="审核结果:"
              value="审核通过"
            >
              <van-icon slot="right-icon" name="success" color="#4caf50" />
            </van-field>
            <van-field
              v-else
              readonly
              autosize
              label="审核状态:"
              value="审核未通过"
            >
              <van-icon slot="right-icon" name="cross" color="red" />
            </van-field>
          </van-row>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
  import { List, Row, Col, Cell, CellGroup, Icon, ImagePreview, Toast, NoticeBar } from 'vant';
  import Vue from 'vue'
  Vue.use(List)
      .use(Row)
      .use(Col)
      .use(Cell)
      .use(CellGroup)
      .use(Icon)
      .use(ImagePreview)
      .use(Toast)
      .use(NoticeBar);
  export default {
    name: "AuditResult",
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
      week(){
        this.classId && this.getAuditResult()
      },
      classId(){
        this.week && this.getAuditResult()
      }
    },
    created () {
      this.getAuditResult()
    },
    methods: {
      // 获取已经审核的结果
      async getAuditResult () {
        try {
          let res = await this.$api.evaluationAudit.getAuditResult(this.classId, this.week)
          this.list = res.data;
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
        } catch (e) {
          // eslint-disable-next-line
          console.log("​catch -> e", e);
        }
      },
      showPicture (url) {
        if (url !== 'URL') {
          ImagePreview([`zhsj.bnuz.edu.cn/ComprehensiveSys/${url}`])
        } else {
          Toast('暂无上传图片')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.color-icon {
  font-size: 10px;
}
.van-icon .van-icon-cross {
  color: red;
}
.van-icon .van-icon-success {
  color: #4caf50;
}
</style>
