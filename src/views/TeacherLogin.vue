<template>
  <div class="container" :style="{backgroundColor:bgColor}">
    <van-row type="flex" justify="center">
      <h2 class="title">综合实践系统</h2>
    </van-row>
    <div class="card">
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="18">
          <div class="card-title">
            <van-icon name="user-o" />&nbsp;&nbsp;教师登录
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <van-cell-group title="地区" class="cell-group">
            <location-picker v-model="school" />
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <van-cell-group title="账户" class="cell-group">
            <van-field
              v-model="user.username"
              clearable
              placeholder="请输入用户名"
              left-icon="user-circle-o"
              error
              class="field"
            />
            <van-field
              v-model="user.password"
              type="password"
              placeholder="请输入密码"
              left-icon="edit"
              error
              class="field"
            />
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <van-row type="flex" justify="center" align="bottom" class="card-row btn-row">
            <van-button
              block
              round
              :loading="loading"
              loading-text="登录中"
              class="btn-login"
              type="primary"
              @click="teacherLogin"
            >登录</van-button>
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import store from "store";
import LocationPicker from "@/components/LocationPicker";
import { isOnWechat } from "@/common/other";
import {
  Row,
  Col,
  Icon,
  CellGroup,
  Cell,
  Button,
  Field,
} from "vant";
import Vue from "vue";
Vue.use(Row)
  .use(Col)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Field)

export default {
  name: "login",
  components: {
    "location-picker": LocationPicker
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        role: "teacher"
      },
      loading: false,
      school: "",
      showWechat: false,
    };
  },
  computed:{
    // 按身份切换背景颜色
    bgColor(){
      return '#78909c'
    }
  },
  methods: {
    // 教师登录
    async teacherLogin() {
      this.loading = true;
      try {
        // 尝试登录
        await this.$api.login.teacherLogin(
          this.user.username,
          this.user.password,
          this.school
        );
        // 取消加载动画
        this.loading = false;
        // 使用localstorage保存相关信息
        let base = require("js-base64").Base64;
        var encypass = base.encode(this.user.password);
        store.set("user", {
          username: this.user.username,
          role: this.user.role,
          password : encypass
        });
        this.$router.push("t/home");
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    // 选择角色
    selectRole(){
      this.showWechat = isOnWechat()
    },
    //填充信息
  Fill_Up(){
    var data = store.get("user");
            if(data!=null){
              let base = require("js-base64").Base64;  
              var decryptpass = base.decode(data.password);
              this.user.username = data.username;
              this.user.password = decryptpass;
            }
    }
  },
  created(){
      // 默认角色为传参设置
      this.selectRole()
  },
  destroyed(){
    // 注销事件防止泄漏，清除标记事件
    store.set("authorize", false)
  },
  mounted:function(){
    this.Fill_Up();
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
    align-self: flex-start;
  }
  .card {
    background: #f6f6f6;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #777;
    margin-top: 40px;
    padding: 15px;
    &-title {
      width: 100%;
      height: 100%;
      color: $primary;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 130%;
    }
    &-row {
      margin-top: 5px;
    }
  }
  .area-wrapper {
    background: $white;
  }
  .btn-login {
    background: $primary;
    font-weight: bold;
    font-size: 120%;
    border-radius: 10em;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .van-cell-group /deep/.van-cell-group__title {
    padding-top: 5px;
  }
 
}
</style>

