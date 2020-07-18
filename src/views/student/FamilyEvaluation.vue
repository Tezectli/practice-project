<template>
  <div>
    <van-tabs v-model="tab" sticky color="#1989fa" class="mb-6">
      <van-tab title="家长评价">
        <evaluation-selector
          v-model="checkboxVal"
          :target="target"
          :historyEvaluation="historyEvaluation"
        />
        <van-row type="flex" justify="center" style="margin:15px 0;">
          <van-col span="16">
            <van-button 
              type="info"
              round
              size="large"
              class="mt-1"
              @click="submitEvaluation"
            >提交评价</van-button>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="自定义评价">
        <currency-picker v-model="currency" />
        <custom-evaluation v-model="customVal" />
        <van-row type="flex" justify="center" style="margin:15px 0;">
          <van-col span="16">
            <van-button
              type="info"
              round size="large"
              class="mt-1"
              @click="submitCustomEvaluate"
            >提交评价</van-button>
          </van-col>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs, Button, Toast } from 'vant';
import EvaluationSelector from "../../components/Student/EvaluationSelector";
import CurrencyPicker from "../../components/Student/CurrencyPicker";
import CustomEvaluation from "../../components/Student/CustomEvaluation";

Vue.use(Tab)
    .use(Tabs)
    .use(Button)
    .use(Toast);
export default {
  name: "FamilyEvaluation",
  components: {
    CustomEvaluation,
    CurrencyPicker,
    EvaluationSelector
  },
  data () {
    return {
      tab: '',
      checkboxVal: [],
      target: 4,
      currency: {},
      customVal: {
        content: "",
        score: 0,
        file: {}
      },
      week: 0,
      historyEvaluation: []
    }
  },
  created () {
    this.getCurrentWeek()
  },
  watch: {
    week: {
      handler () {
        this.getHistoryFamilyEvaluate()
      }
    }
  },
  methods: {
    // 提交模版评价
    async submitEvaluation () {
      try {
        if (this.checkboxVal.length === 0) {
            Toast("您还没选择任何评价内容哦！")
        } else {
          let updateList = [];
          this.checkboxVal.forEach(item => {
            updateList.push(item.templateId)
          });
          await this.$api.evaluation.updateContent(updateList, this.target);
          this.checkboxVal = []
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 获取当前周次
    async getCurrentWeek () {
      try {
        this.week = await this.$api.common.getCurrentWeek()
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 自定义评价
    async submitCustomEvaluate () {
      try {
        if (this.customVal.content === "" || this.customVal.score === 0|| !(this.customVal.file instanceof File)) {
          Toast("您尚未输入全部信息或者未上传资源！")
        } else {
          let evaluateContent = {
            content: this.customVal.content,
            // contentId: -1,
            currencyId: this.currency.key,
            evaluationScore: this.customVal.score,
            subcurrencyId: this.currency.subcurrencyId
          };
          await this.$api.evaluation.customEvaluate(evaluateContent, this.customVal.file ,this.target);
          this.customVal = {
            content: "",
            score: 0,
            file: {}
          };
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 获取家庭模版历史评价
    async getHistoryFamilyEvaluate () {
      try {
        let res = await this.$api.evaluation.initFamilyTemplate(this.week);
        this.historyEvaluation = res.data.map(item => {
          return {
            templateId: item.templateId
          }
        });
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mb-6 {
  margin-bottom: 60px;
}
</style>