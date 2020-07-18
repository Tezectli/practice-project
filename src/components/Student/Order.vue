/* 选课模块-订单卡片 黄焕新 */
<template>
  <div class="order">
    <div class="not_order" v-show="dataList.length == 0">
      <svg class="color-icon" aria-hidden="true" style="font-size: 55px">
        <use xlink:href="#zhsj-icon-order"></use>
      </svg>
      <div style="color:#929191;padding:12px">您还没有相关的订单</div>
      <van-button size="small" type="info" @click="$router.replace('/s/selectCourse')">前往选课</van-button>
    </div>
    <van-card
      v-for="item of dataList"
      :title="item.className"
      :key="item.orderId"
      :price="[item.totalfee > 0 ? item.totalfee: '免费']"
    >
      <div slot="tags">
        <van-tag mark type="primary">创建时间：{{item.date}}</van-tag>
        <div class="btn_box">
          <van-button
            size="small"
            type="warning"
            @click="getClassInfo(item.classId, item.orderId)"
          >课程详情</van-button>
          <van-button
            size="small"
            type="info"
            v-if="orderType == 'NOT_PAID'"
            @click="payOrder(item.orderId,item.totalfee,'zhsj.bnuz.edu.cn/s/myOrder')"
          >确认订单</van-button>
        </div>
      </div>
    </van-card>
    <van-dialog
      closeable
      round
      :show-confirm-button="false"
      :close-on-click-overlay="true"
      position="bottom"
      :style="{ height: '54%', overflow: 'auto' }"
    >
      <order-popup :claMsg="claMsg" @update="getOrderList"/>
    </van-dialog>
    <!-- 课程详情弹窗 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">
      <div
        class="van-ellipsis"
        style="text-align: center;font-size: 5vw;font-weight: bold;padding: 10vw;background: #f4f7ff"
      >{{claMsg.className}}</div>
      <van-tabs v-model="activeName" color="#3366ff" line-height="3px" sticky>
        <van-tab title="课程简介">
          <div class="msg_board">
            <div class="msg_box">
              <div style="font-size:14px">
                <van-icon name="newspaper-o"/>&nbsp;类型：
                <van-tag plain type="primary" size="large">{{courseType[claMsg.courseType]}}</van-tag>&nbsp;
                <van-tag plain type="warning" size="large">{{interestType[claMsg.interestType]}}</van-tag>
              </div>
              <div style="font-size:14px;margin-top:3px">
                <van-icon name="manager-o"/>&nbsp;教师：
                <van-tag type="primary" size="large">{{claMsg.teacherName}}</van-tag>
              </div>
              <div style="font-size:14px;margin-top:3px">
                <van-icon name="balance-o"/>&nbsp;价格：
                <span>{{claMsg.coursePrice}}</span>
              </div>
              <div style="font-size:14px;margin-top:6px">
                <van-icon name="calender-o"/>&nbsp;缴费时间：
                <span>{{claMsg.payStartTime}}~{{claMsg.payEndTime}}</span>
              </div>
            </div>
            <div style="margin:20px 0 0 10px;">
              <div class="title">课程任务</div>
              <div class="box_other">
                <p style="color: #666;">{{claMsg.courseMission || '未知'}}</p>
              </div>
              <div class="title">课程目标</div>
              <div class="box_other">
                <p style="color: #666;">{{claMsg.courseTarget || '未知'}}</p>
              </div>
              <div class="title">课程描述</div>
              <div class="box_other">
                <p style="color: #666;">{{claMsg.courseExplanation || '未知'}}</p>
              </div>
              <div class="title">课程准备</div>
              <div class="box_other">
                <p style="color: #666;">{{claMsg.coursePrepare || '未知'}}</p>
              </div>
              <div style="height:50px"></div>
            </div>
          </div>
        </van-tab>
        <div style="height: 50px"></div>
      </van-tabs>
      <van-submit-bar
        :price="claMsg.coursePrice*100"
        button-text="确认订单"
        v-show="orderType == 'NOT_PAID'"
        @submit="payOrder(orderId,claMsg.coursePrice,'zhsj.bnuz.edu.cn/s/myOrder')"
      />
      <van-submit-bar
        button-text="前往课表"
        v-show="orderType == 'PAID'"
        @submit="$router.replace('/s/myCourse')"
      />
      <van-submit-bar
        button-text="前往选课"
        v-show="orderType == 'CANCELED'"
        @submit="$router.replace('/s/selectCourse')"
      />
    </van-popup>
  </div>
</template>
 
<script>
import Vue from "vue";
import store from "store";
import OrderPopup from "@/components/Student/OrderPopup";
import { Card, Button, Tag, Toast, Dialog, Popup } from "vant";
import { callWechatPay } from "@/common/payment";

Vue.use(Card)
  .use(Button)
  .use(Tag)
  .use(Toast)
  .use(Dialog)
  .use(Popup);
export default {
  name: "Order",
  components: {
    "order-popup": OrderPopup
  },
  data() {
    this.typeMap = {
      NOT_PAID: {
        code: [0],
        text: "未支付"
      },
      PAID: {
        code: [1, 6],
        text: "已确认"
      },
      CANCELED: {
        code: [2],
        text: "已取消"
      }
    };
    return {
      imgUrl: "",
      orderList: [],
      show: false,
      claMsg: {},
      orderId: "",
      isOtherClass: false,
      keyword: "",
      courseType: ["研学", "实践", "服务", "兴趣"],
      interestType: [
        "非兴趣",
        "科学益智类",
        "书法绘画类",
        "舞蹈体育类",
        "音乐艺术类",
        "综合语言类"
      ]
    };
  },
  props: {
    // 订单类型
    orderType: {
      type: String,
      required: true,
      validator: function(value) {
        return ["NOT_PAID", "PAID", "CANCELED"].includes(value);
      }
    }
  },
  computed: {
    // 类型转状态
    orderTypeCode: function() {
      return this.typeMap[this.orderType].code;
    },
    // 符合条件的数据
    dataList: function() {
      let code = this.orderTypeCode;
      return this.orderList.filter(item => {
        return code.includes(item.payStatus);
        // return true
      });
    },
    // 禁用支付按钮
    btnStatus: function() {
      return !(this.orderType === "NOT_PAID");
    }
  },
  methods: {
    // 获取单个班级详细信息
    async getClassInfo(classId, orderId) {
      try {
        let res = await this.$api.course.getCourseMsg(classId);
        this.claMsg = res;
        // eslint-disable-next-line
        // console.log(this.claMsg);
        this.orderId = orderId;
        this.show = true;
      } catch (e) {
        Toast("获取班级信息失败");
        // eslint-disable-next-line
        console.log(e);
      }
    },
    // 获取订单列表
    async getOrderList() {
      try {
        this.show = false;
        let res = await this.$api.pay.getOrders();
        !res.data.length && Toast("暂无相关订单");
        this.orderList = res.data;
      } catch (e) {
        Toast("获取订单列表失败");
        // eslint-disable-next-line
        console.log(e);
      }
    },
    payOrder(orderId, fee, returnUrl) {
      Dialog.confirm({
        title: "确认",
        message: "是否要支付当前订单？"
      }).then(() => {
        if (fee > 0) {
          this.payForOrder(orderId, returnUrl);
        } else {
          this.payFree(orderId);
        }
      });
    },
    async payFree(orderId) {
      try {
        const user = store.get("user");
        await this.$api.pay.payFree(orderId, user.id);
        Dialog.confirm({
          title: "选课成功",
          message: "是否继续选课？"
        })
          .then(() => {
            this.$router.replace("/s/selectCourse");
          })
          .catch(() => {
            this.getOrderList();
          });
      } catch (e) {
        Toast("确认免费订单失败");
        // eslint-disable-next-line
        console.log(e);
      }
    },
    //支付订单
    async payForOrder(orderId, returnUrl) {
      try {
        let res = await this.$api.pay.payOrder(orderId, returnUrl);
        callWechatPay(res);
      } catch (e) {
        Toast("请确认您已微信登录");
        // eslint-disable-next-line
        console.log(e);
      }
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.btn_box {
  float: right;
}
.van-card {
  font-size: 14px;
  &__title {
    font-weight: bold;
    line-height: 16px;
    padding: 8px;
  }
  &__price {
    font-size: 16px;
  }
}
/deep/.van-submit-bar__button {
  width: 100px;
  height: 50px;
  font-weight: 500;
  border: 0;
  background: #1661f6;
  border-radius: 0;
}
.title {
  color: #3366ff;
  font-weight: bold;
  padding-left: 2px;
  border-bottom: 1px solid #f3f2f2;
}
.msg_box {
  margin: 12px;
  padding: 6px;
  border: 1px solid #bababa;
  border-radius: 5px;
}
.time {
  margin: 3px 0;
}
.box_other__holder {
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
}
/deep/.van-tabs--card > .van-tabs__wrap {
  height: 44px;
}
.van-tag--default {
  background-color: white;
}
.content {
  font-size: 13px;
  color: #707070;
}
.van-submit-bar__price {
  color: black;
  font-weight: 500;
  font-size: 14px;
}
.van-submit-bar__bar {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
  height: 50px;
  padding: 0;
  font-size: 14px;
}
.price /deep/ .van-card__price {
  color: black;
}
.num /deep/ .van-card__num {
  color: blue;
  margin-right: 170px;
}
.titletime {
  margin: 3% 2%;
  color: #9b9b9b;
  padding-left: 2px;
  font-weight: 0;
}
/deep/.van-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0 0 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  border: 1px solid #dadada;
  border-radius: 10px;
  margin-top: -10px;
}
.box_other {
  padding: 1px;
  background: #fff;
  margin: 0 auto;
}
.courseSchedule {
  padding: 3%;
  // background: #f0f2ff;
  border: 1px solid #dbe7ff;
  color: #727272;
  border-radius: 9px;
}
.not_order {
  margin-top: 38vw;
  text-align: center;
}
</style>