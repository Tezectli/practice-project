<template>
  <div>
    <nav-bar title="我的订单" />
    <van-tabs color="#0a26ee">
      <van-tab title="未支付" name="allOrder">
        <order orderType="NOT_PAID" />
      </van-tab>
      <van-tab title="已确认" name="sucOrder">
        <order orderType="PAID" />
      </van-tab>
      <van-tab title="已取消" name="cancelOrder">
        <order orderType="CANCELED" />
      </van-tab>
    </van-tabs>
    <div style="height:35px"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import Order from "@/components/Student/Order";
import NavBar from "@/components/NavBarColor";
Vue.use(Tab).use(Tabs);
export default {
  name: "myOrder",
  components: {
    order: Order,
    "nav-bar": NavBar
  },
  data() {
    return {
      keyword: "",
      list: []
    };
  },
  methods: {}
};
</script>
<style scoped>
order {
  margin-bottom: 20px;
}
</style>