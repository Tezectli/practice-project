<template>
  <div class="container" :style="{backgroundColor:bgColor}">
    <van-row type="flex" justify="center">
      <h2 class="title">综合实践系统</h2>
    </van-row>
    <div class="card">
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="18">
          <div class="card-title">
            <van-icon name="user-o" />&nbsp;&nbsp;用户登录
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
      <van-row type="flex" justify="center" class="card-row" v-if="!showWechat">
        <van-col span="22">
          <van-radio-group v-model="user.role">
            <van-cell-group title="角色" class="cell-group">
              <van-row>
                <van-col span="12">
                  <van-cell class="field" clickable @click="user.role = 'teacher'">
                    <svg class="color-icon" aria-hidden="true" slot="title">
                      <use xlink:href="#zhsj-icon-jishu" />
                    </svg>
                    <van-radio slot="right-icon" name="teacher" checked-color="#78909c" />
                  </van-cell>
                </van-col>
                <van-col span="12">
                  <van-cell class="field" clickable @click="user.role = 'student'">
                    <svg class="color-icon" aria-hidden="true" slot="title">
                      <use xlink:href="#zhsj-icon-xuesheng" />
                    </svg>
                    <van-radio slot="right-icon" name="student" checked-color="#1ab394" />
                  </van-cell>
                </van-col>
              </van-row>
            </van-cell-group>
          </van-radio-group>
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
              @click="login"
            >登录</van-button>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <transition name="van-slide-up">
      <div class="wechat-tips" v-if="showWechat">
        <van-button round class="wechat-tips__btn" to="pickRole">
          <van-icon class-prefix="zhsj-icon" name="wechat1" size="30" color="#1ab394" />
        </van-button>
        <span class="wechat-tips__text">微信登录</span>
      </div>
    </transition>
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
  RadioGroup,
  Radio,
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
  .use(Field)
  .use(Radio)
  .use(RadioGroup);

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
      return this.user.role ==='teacher'?'#78909c':'#1ab394'
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
        }else{
          Toast(res.data.detail)
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);

        this.loading = false;
      }
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
    // 登录，通过识别角色分配不同的登录接口
    login() {
      const role = this.user.role;
      if (role == "teacher") {
        this.teacherLogin();
      } else if (role == "student") {
        this.studentLogin();
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
    selectRole(){
      this.showWechat = isOnWechat()
      this.user.role = ['student','teacher'].includes(this.$route.query.role) ? this.$route.query.role:'teacher'
    }
  },
  beforeCreate() {
    if (isOnWechat()) {
      if (store.get("authorize")) {
        return;
      }
      store.set("authorize", true);
      window.location.replace(
        // "https://zhsj.bnuz.edu.cn/ComprehensiveSys/wechat/login/authorize"
        // "http://zhsj.natapp1.cc/ComprehensiveSys/wechat/login/authorize"
      );
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
  }
  .card {
    background: #f6f6f6;
    width: 320px;
    height: 440px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #777;
    margin-top: 40px;
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
  }
  .van-cell-group /deep/.van-cell-group__title {
    padding-top: 5px;
  }
  .wechat-tips {
    margin-top: 25px;
    height: 70px;
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__btn {
      background: $gradient;
    }
    &__text{
      margin-top: 5px;
      color: #f6f6f6;
    }
  }
}
</style>

