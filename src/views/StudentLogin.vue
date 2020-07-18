<template>
  <div class="container">
    <van-row type="flex" justify="center">
      <h2 class="title">综合实践系统</h2>
    </van-row>
    <div class="card">
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="18">
          <div class="card-title">
            <van-icon name="user-o" />&nbsp;&nbsp;学生登录
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
              required
              error-message="学生初始密码为六个6"
            />
          </van-cell-group>
        </van-col>
      </van-row>
         <van-row>
            <div style="color:#1ab394;margin-left:15px;margin-top:2px" @click="toRegister">立即注册</div>
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
              @click="studentLogin"
            >登录</van-button>
          </van-row>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="10">
          <div class="wechat-tips" v-if="showWechat">
            <van-button round class="wechat-tips__btn" to="pickRole">
              <van-icon class-prefix="zhsj-icon" name="wechat1" size="30" color="#1ab394" />
            </van-button>
            <span class="wechat-tips__text">微信登录</span>
          </div>
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
  Dialog,
  Toast
} from "vant";
import Vue from "vue";
Vue.use(Row)
  .use(Col)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Field);

// 绑定状态码
const TYPE_BIND = 1;
const TYPE_UNBIND = 2;

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
        role: "student"
      },
      loading: false,
      school: "",
      showWechat: false
    };
  },
  methods: {
    // 学生登录
    async studentLogin() {
      this.loading = true;
      try {
        // 尝试登录
        let res = await this.$api.login.studentLogin(
          this.user.username,
          this.user.password,
          this.school
        );
        // 取消加载动画
        this.loading = false;
        if ([500, 200, 10].includes(res.data.code)) {
          // 使用localstorage保存相关信息
        let base = require("js-base64").Base64;
        var encypass = base.encode(this.user.password);
        
          store.set("user", {
            school: this.school,
            username: this.user.username,
            role: this.user.role,
            id: res.data.detail,
            password : encypass
          });
          // 如果在微信打开就询问绑不绑微信
          if (res.data.code === 10) {
            this.confirmWechat();
          } else {
            this.$router.push("s/home");
          }
        } else {
          Toast(res.data.detail);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    // 绑定微信
    async bindWechat(typeCode) {
      try {
        await this.$api.login.bindWechat(typeCode);
        this.$router.push("s/home");
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 询问学生微信是否绑定
    confirmWechat() {
      Dialog.confirm({
        title: "微信绑定",
        message: "你还未绑定微信，要绑定吗？"
      })
        .then(() => {
          // on confirm
          this.bindWechat(TYPE_BIND);
        })
        .catch(() => {
          // on cancel
          this.bindWechat(TYPE_UNBIND);
        });
    },
    // 选择角色
    selectRole() {
      this.showWechat = isOnWechat();
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
    },
    toRegister(){
      this.$router.push("/register");
    }
  },
  beforeCreate() {
    if (isOnWechat()) {
      if (store.get("authorize")) {
        return;
      }
      store.set("authorize", true);
      window.location.replace(
        "https://zhsj.bnuz.edu.cn/ComprehensiveSys/wechat/login/authorize"
        // "http://zhsj.natapp1.cc/ComprehensiveSys/wechat/login/authorize"
      );
    }
  },
  created() {
    // 默认角色为传参设置
    this.selectRole();
  },
  destroyed() {
    // 注销事件防止泄漏，清除标记事件
    store.set("authorize", false);
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
  .wechat-tips {
    margin-top: 15px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__btn {
      background: $gradient;
    }
    &__text {
      margin-top: 5px;
      color: #777;
    }
  }
}
</style>

