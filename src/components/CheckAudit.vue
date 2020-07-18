/*用于评价审核的组件*/
<template>
  <div>
    <van-notice-bar left-icon="warning-o" :scrollable="false">点击右上角的图片可以预览审核的图片</van-notice-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-cell-group>
        <van-cell v-for="item in checkList" :key="item.studentId">
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
          <van-field
            readonly
            autosize
            label="审核内容:"
            :value="item.content"
          />
          <van-row>
            <van-button
              round
              type="primary"
              icon="success"
              size="small"
              class="mr-1"
              @click="checkForAudit(
                pass,
                item.studentId,
                item.contentId,
                item.currencyId,
                item.subcurrencyId,
                item.submitTime
               )"
            ></van-button>
            <van-button
              round
              type="danger"
              icon="cross"
              size="small"
              @click="checkForAudit(
                refuse,
                item.studentId,
                item.contentId,
                item.currencyId,
                item.subcurrencyId,
                item.submitTime
               )"
            ></van-button>
          </van-row>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import {
  List,
  Row,
  Col,
  Cell,
  CellGroup,
  Icon,
  ImagePreview,
  Toast,
  Button,
  NoticeBar,
  Field
} from "vant";
import Vue from "vue";
Vue.use(List)
  .use(Row)
  .use(Col)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(ImagePreview)
  .use(Toast)
  .use(Button)
  .use(NoticeBar)
  .use(Field);
export default {
  name: "CheckAudit",
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
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pass: 1,
      refuse: 0,
      message: ""
    };
  },
  computed: {
    checkList() {
      return this.list.filter(item => {return !item.checked})
    }
  },
  watch: {
    week(){
      this.classId&&this.getAuditResult()
    },
    classId(){
      this.week&&this.getAuditResult()
    }
  },
  created() {
    this.classId && this.week && this.getAuditResult();
  },
  methods: {
    // 获取未审核的内容
    async getAuditResult() {
      try {
        let res = await this.$api.evaluationAudit.getAuditResult(
          this.classId,
          this.week
        );
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
    // 审批未审核的内容
    async checkForAudit(
      passed,
      studentId,
      contentId,
      currencyId,
      subcurrencyId,
      submitTime
    ) {
      try {
        await this.$api.evaluationAudit.checkForAudit(
          passed,
          studentId,
          contentId,
          currencyId,
          subcurrencyId,
          submitTime
        );
        Toast("审核成功");
        this.getAuditResult();
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 显示需要审核的图片
    showPicture(url) {
      if (url !== "URL") {
        ImagePreview([`zhsj.bnuz.edu.cn/ComprehensiveSys/${url}`]);
      } else {
        Toast("暂无上传图片");
      }
    }
  }
};
</script>

<style scoped>
.color-icon {
  font-size: 10px;
}
.mr-1 {
  margin-right: 5px;
}
</style>
