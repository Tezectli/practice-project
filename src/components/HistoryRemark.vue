/* 历史评价内容页面 */
<template>
  <div class="page">
    <van-notice-bar class="page-notice" left-icon="info-o">单元格向左滑动进行下载,删除哦。</van-notice-bar>
    <van-skeleton :row="15" class="page-content" :loading="loading">
      <van-cell-group class="page-content__loaded">
        <van-swipe-cell v-for="(item,index) of plans" :key="index">
          <van-cell :border="false" :value="item.studentName">
            <template slot="title">
              <span class="van-ellipsis">{{item.content}}</span>&nbsp;
              <van-tag plain type="success" color="#78909c">{{item.score + "分"}}</van-tag>
            </template>
          </van-cell>
          <template slot="right">
            <van-button
              square
              type="danger"
              text="删除"
              v-if="!item.isCheck"
              @click="deleteEvaluation(item.studentId,item.contentId,item.evaluationTime)"
            >
              <van-icon name="close" size="30" />
            </van-button>
          </template>
        </van-swipe-cell>
      </van-cell-group>
    </van-skeleton>
    <div>
      <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
        <span style="text-align:center">
          <van-cell title="详细信息" />
        </span>
        <van-cell :value="detail.evaluationTime" icon="clock-o" />
        <van-cell :value="detail.score" icon="star-o" />
      </van-popup>
    </div>
  </div>
</template>
<script>
import {
  Icon,
  CellGroup,
  SwipeCell,
  Skeleton,
  NoticeBar,
  Button,
  Cell,
  Tag,
  Popup,
  ActionSheet,
  Dialog,
  Rate,
  Toast,
  Row,
  Col
} from "vant";
import Vue from "vue";
Vue.use(Icon)
  .use(CellGroup)
  .use(SwipeCell)
  .use(Cell)
  .use(Skeleton)
  .use(NoticeBar)
  .use(Button)
  .use(Tag)
  .use(Popup)
  .use(ActionSheet)
  .use(Dialog)
  .use(Rate)
  .use(Toast)
  .use(Col)
  .use(Row);
export default {
  name: "HistoryRemark",
  props:{
    classId:{
      type:String,
      required:true
    },
    week:{
      type:Number,
      required:true
    }
  },
  data() {
    return {
      loading: false,
      show: false,
      cellIndex: "",
      plans: [],
      detail: {
        evaluationTime: '',
        score: ''
      }
    };
  },
  computed:{
    weekClass(){
      return {classId:this.classId,week:this.week};
    }
  },
  methods: {
    async getHistoryEvaluation() {
      //   this.loading = true;
      try {
        // 获取历史评价列表
        let res = await this.$api.remark.getHistoryEvaluation(
          this.classId,
          this.week
        );
        this.plans = res.data;
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    async deleteEvaluation(studentId, contentId, evaluationTime) {
      try {
        // 删除历史评价列表
        await this.$api.remark.deleteEvaluation(
          studentId,
          contentId,
          evaluationTime
        );
        Toast.success('删除成功')
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    showInfo(index) {
      this.cellIndex = index;
      const detail = this.plans[this.cellIndex];
      this.detail = {
        evaluationTime: detail.evaluationTime,
        score: detail.score
      };
      this.show = true;
    }
  },
  created() {
    this.getHistoryEvaluation();
  },
  watch: {
    weekClass(){
       this.getHistoryEvaluation()
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.page {
  background: $white;
  &-notice {
    margin-bottom: 16px;
  }
  &-content {
    height: 80%;
    &_loaded {
      width: 100%;
      height: 100%;
      background: $bg;
    }
  }
}
</style>