<template>
  <div class="popup" v-show="show">
    <div class="head-board">
      <div>{{claMsg.className}}</div>
    </div>
    <div class="msg_board">
      <div class="box">
        <div>班级名称：{{claMsg.className}}</div>
        <div>创建时间：{{claMsg.date}}</div>
        <div>学号：{{claMsg.studentId}}</div>
        <div>学生姓名：{{claMsg.studentName}}</div>
      </div>
    </div>
    <van-submit-bar
      :price="claMsg.totalfee*100"
      button-text="支付订单"
      @submit="payOrder(claMsg.orderId,claMsg.totalfee,'zhsj.bnuz.edu.cn/s/myOrder')"
    />
  </div>
</template>
<script>
import Vue from "vue";
import store from 'store'
import { SubmitBar, Tab, Tabs, Collapse, CollapseItem, Toast } from "vant";
import {callWechatPay} from "@/common/payment";
Vue.use(SubmitBar)
  .use(Tab)
  .use(Tabs)
  .use(Collapse)
  .use(CollapseItem)
  .use(Toast);

export default {
  name: "OrderPopup",
  data() {
    return {
      show: true,
      msg: "",
      courseType: ["研学", "实践", "服务", "兴趣"],
      interestType: [
        "非兴趣",
        "科学益智类",
        "书法绘画类",
        "舞蹈体育类",
        "音乐艺术类",
        "综合语言类"
      ],
      activeNames: ["1"]
    };
  },
  props: ["claMsg"],
  methods: {
    payOrder (orderId,fee,returnUrl) {
      if(fee > 0){
        this.payForOrder(orderId,returnUrl)
      }
      else{
        this.payFree(orderId)
      }
    },
    async payFree(orderId) {
      try{
        const user = store.get('user');
        await this.$api.pay.payFree(orderId,user.id);
        this.$emit("update");
      }catch (e) {
        Toast("请检查网络连通性");
        // eslint-disable-next-line
        console.log(e);
      }

    },
    //支付订单
    async payForOrder(orderId,returnUrl) {
      try {
        let res = await this.$api.pay.payOrder(orderId,returnUrl);
        callWechatPay(res)
        this.$emit("update")
      } catch (e) {
        Toast("请检查网络连通性");
        // eslint-disable-next-line
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h4 {
  color: #e8670b;
}
.head-board {
  height: 120px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574430905982&di=e757a4b73a8e42a284284ec626a373e0&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F12%2F40%2F5b7b525896d3f.jpg%2521%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue");
  color: #000;
}
.box div{
    padding: 15px;
    font-size: 14px;
    line-height: 10px;
}
.msg_board {
  width: 90%;
  margin: 0 auto;
}
.title {
  margin-bottom: 5px;
  color: #53a28d;
}
</style>