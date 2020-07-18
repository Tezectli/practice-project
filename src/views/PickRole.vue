<template>
  <div class="container">
    <van-row type="flex" justify="center">
      <h2 class="title">已绑定账号</h2>
    </van-row>
    <account-contact v-for="item of accounts" :key="item.studentId" :account="item" />
    <div class="contact">
      <van-button class="btn-add" icon="plus" block @click="toRegister">注册账号</van-button>
    </div>
    <transition name="van-slide-up">
      <div class="tips">
        <van-button round class="tips-btn" to="/sLogin">
          <van-icon class-prefix="zhsj-icon" name="arrowleft" size="30" color="#1ab394" />
        </van-button>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  Row,
  Col,
  Icon,
  CellGroup,
  Cell,
  Button,
  Field,
  RadioGroup,
  Radio,
  Toast
} from "vant";
import AccountContact from "@/components/AccountContact";
import Vue from "vue";
Vue.use(Row)
  .use(Col)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Field)
  .use(Radio)
  .use(Toast)
  .use(RadioGroup);

export default {
  name: "pickRole",
  components: {
    "account-contact": AccountContact
  },
  data() {
    return {
      accounts: []
    };
  },
  created() {
    this.getAccountInfo();
  },
  methods: {
    // 获取学生端微信列表
    async getAccountInfo() {
      try {
        let res = await this.$api.login.getAccountInfo();
        this.accounts = Object.freeze(res.data);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 前往注册页
    toRegister(){
      this.$router.push('/register')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";

.container {
  width: 375px;
  height: 667px;
  background-color: $primary;
  display: flex;
  align-items: center;
  flex-direction: column;
  .title {
    color: $white;
    text-align: center;
    font-size: 150%;
    margin: 10px 0;
  }
  .tips {
    position: fixed;
    bottom: 10vw;
    z-index: 100;
    margin-top: 10px;
  }
}
.contact {
  width: 90%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 1px #777;
  .btn-add {
    width: 90%;
    background: $gradient;
    color: #777;
    font-size: bold;
  }
}
</style>

