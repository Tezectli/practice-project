<template>
  <div>
    <van-tabs
      v-model="tab"
      sticky
      color="#1989fa"
      class="mb-6"
    >
      <van-tab title="同伴评价">
        <friend-selector v-model="friendList" class="mb-1" />
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
              @click="submitFriendsEvaluation"
            >提交评价</van-button>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="自定义评价">
        <currency-picker v-model="currency" class="mb-1" />
        <friend-selector v-model="friendList" />
        <custom-evaluation v-model="customVal" />
        <van-row type="flex" justify="center" style="margin:15px 0;">
          <van-col span="16">
            <van-button
              type="info"
              round
              size="large"
              class="mt-1"
              @click="submitCustomEvaluation"
            >提交评价</van-button>
          </van-col>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import {Tab, Tabs, Row, Col, Button, Toast} from 'vant';
import EvaluationSelector from "../../components/Student/EvaluationSelector";
import FriendSelector from "../../components/Student/FriendSelector";
import CustomEvaluation from "../../components/Student/CustomEvaluation";
import CurrencyPicker from "../../components/Student/CurrencyPicker";

Vue.use(Tab)
    .use(Tabs)
    .use(Row)
    .use(Col)
    .use(Button)
    .use(Toast);
export default {
  name: "FriendsEvaluation",
  components: {
    CurrencyPicker,
    CustomEvaluation,
    FriendSelector,
    EvaluationSelector
  },
  data () {
    return {
      tab: '',
      target: 5,
      checkboxVal: [],
      friendList: [],
      currency: {},
      customVal: {
        content: "",
        score: 0
      },
      week: 0,
      historyEvaluation: [],
      friendId: "",
      time: 0
    }
  },
  created () {
    this.getCurrentWeek()
  },
  watch: {
    friendList: {
      handler () {
        if (this.friendList.length !== 0 && this.time < 1) {
          this.getHistoryFriendsEvaluate();
          // 为了避免选择同伴时渲染多次历史评价
          this.time++;
        }
      }
    }
  },
  methods: {
    // 提交模版评价
    async submitFriendsEvaluation () {
      try {
        if (this.checkboxVal.length === 0 || this.friendList.length === 0) {
          Toast("您还没选择评价内容或者小伙伴哦！")
        } else {
          let updateList = [];
          this.checkboxVal.forEach(item => {
            updateList.push(item.templateId)
          });
          await this.$api.evaluation.updateFriendContent(updateList, this.friendList);
          this.checkboxVal = []
          this.friendList = []
        }
      } catch (e) {
        // eslint-disable-next-line
        console.error("​catch -> e", e);
      }
    },
    // 自定义评价
    async submitCustomEvaluation () {
      try {
        if (this.customVal.content === "" || this.customVal.score === 0) {
          Toast("您还没输入评价内容或者评分哦！")
        } else if (this.friendList.length === 0) {
            Toast("您还没选择小伙伴哦")
        } else {
          let evaluateContent = {
            content: this.customVal.content,
            // contentId: -1,
            currencyId: this.currency.key,
            evaluationScore: this.customVal.score,
            subcurrencyId: this.currency.subcurrencyId
          };
          await this.$api.evaluation.customFriendEvalue(this.friendList, evaluateContent);
          this.customVal = {
            content: "",
            score: 0
          };
          this.friendList = []
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
    // 获取同伴历史评价
    async getHistoryFriendsEvaluate () {
      try {
        // 首屏渲染默认选中的同伴模版评价
        let res = await this.$api.evaluation.initFriendTemplate(this.friendList[0], this.week);
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
.mb-1 {
  margin-bottom: 10px;
}
</style>