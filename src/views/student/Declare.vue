<template>
  <div>
    <van-tabs
      type="card"
      style="margin:0 0 0 -17px"
      color="#3366ff"
      title-active-color="white"
      title-inactive-color="black"
      @change="changeTabs"
    >
      <van-tab title="在线申报" style="margin-left:17px">
        <class-picker v-model="classId"></class-picker>
        <van-tabs
          :ellipsis="false"
          swipe-threshold="2"
          color="#1ab394"
          @click="onConfirm"
          v-model="active"
        >
          <van-tab v-for="(item,index) of currencyItem" :key="index" :title="item.text" :name="index"></van-tab>
        </van-tabs>
        <!-- <currency-picker class="mt-1" v-model="currency"></currency-picker> -->
        <van-cell-group>
          <van-row>
            <van-col offset="1" span="12">
              评分
              <van-rate v-model="score" size="24" />
            </van-col>
          </van-row>
          <van-field
            v-model="content"
            type="textarea"
            rows="5"
            autosize
            placeholder="请输入20字以内的申报内容"
          />
        </van-cell-group>
        <van-row type="flex" justify="center" style="margin:15px 0;">
          <van-col span="16">
            <van-button
              type="primary"
              round
              size="large"
              color="#3366ff"
              class="mt-1"
              @click="submitCustomDeclare"
            >提交申报</van-button>
          </van-col>
        </van-row>
      </van-tab>

      <van-tab title="历史申报" class="mb-6">
        <week-picker v-model="week"></week-picker>
        <history-declare-grid v-for="(item, key) of historyDeclare" :key="key" :declare="item" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, Row, Col, Button, Field, CellGroup, Rate } from "vant";
import ClassPicker from "../../components/Student/ClassPicker";
// import CurrencyPicker from "../../components/Student/CurrencyPicker";
import HistoryDeclareGrid from "../../components/Student/HistoryDeclareGrid";
import WeekPicker from "../../components/Student/WeekPicker";

Vue.use(Tab)
  .use(Tabs)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Field)
  .use(CellGroup)
  .use(Rate);
export default {
  name: "Declare",
  components: {
    WeekPicker,
    HistoryDeclareGrid,
    // CurrencyPicker,
    ClassPicker
  },

  data() {
    return {
      active: 0,
      historyDeclare: [],
      classId: "",
      currency: {},
      content: "",
      score: 0,
      week: 0,
      currencyItem:[]
    };
  },
  watch: {
    week() {
      this.getMyDeclare();
    },
  },
  methods: {
    onClick() {
      this.background("#3366ff");
    },
    async getMyDeclare() {
      let res = await this.$api.declare.getMyDeclare(this.week);
      // 接口还没完成
      this.historyDeclare = res.data.map(item => {
        return {
          classId: item.classId,
          content: item.content,
          contentId: item.contentId,
          submitTime: item.submitTime
        };
      });
    },
    async submitCustomDeclare() {
      let declareEvalue = {
        classId: this.classId,
        content: this.content,
        contentId: -1,
        currencyId: this.currency.key,
        score: this.score,
        subcurrencyId: this.currency.subcurrencyId,
        yn: 1
      };
      await this.$api.declare.customDeclare(declareEvalue,this.classId);
      this.content = ""
      this.score = 0
    },
    async getCurrencyType () {
      try {
        let res = await this.$api.evaluation.initCurrencyType()
        this.currencyItem = res.data.map(item => {
          return {
            key: item.currencyId,
            text: item.subcurrencyName,
            subcurrencyId: item.subcurrencyId
          }
        });
      }  catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    onConfirm(index){
      this.currency = this.currencyItem[index]
    }
  },
  mounted(){
    this.getCurrencyType()
  }
};
</script>

<style lang="scss" scoped>
.mt-1 {
  margin-top: 10px;
}
.mb-6 {
  margin-bottom: 60px;
  margin-left: 17px;
}
/deep/ .van-tabs--card > .van-tabs__wrap {
  height: 45px;
  line-height: 20px;
}
/deep/ .van-tabs__nav--card {
  height: 44px;
  width: 400px;
  border-radius: 2px;
  border: 0.5px solid white !important;
}
/deep/.van-tabs__nav--card .van-tab.van-tab--active {
  color: #fff;
  line-height: 44px;
}
/deep/.van-tabs__nav--card .van-tab.van-tab {
  color: black;
  line-height: 44px;
}
</style>