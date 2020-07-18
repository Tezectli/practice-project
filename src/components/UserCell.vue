/* 用于个人中心的导航组件 */
<template>
  <div>
    <van-cell-group>
      <van-cell is-link size="large" @click="changePassWord()">
        <template slot="title">
          <van-icon size="16px" class-prefix="zhsj-icon" name="unlock" />
          <span class="cell-title">修改密码</span>
        </template>
      </van-cell>
      <van-cell is-link size="large" @click="changeConnect()">
        <template slot="title">
          <van-icon size="16px" class-prefix="zhsj-icon" name="comment" @click="changeConnect()" />
          <span class="cell-title">意见反馈</span>
        </template>
      </van-cell>
      <van-cell is-link size="large" @click="changeAboutUs()">
        <template slot="title">
          <van-icon size="16px" class-prefix="zhsj-icon" name="info-circle" />
          <span class="cell-title">关于我们</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-dialog
      v-model="showAboutUs"
      title="关于我们"
      show-cancel-button
      :beforeClose="beforeCloseAboutUs"
    >
      <div style="text-align: center;margin-top:20px;margin-bottom:20px">
        <img src="../assets/img/schoolLogo.jpg" width="160px" height="160px" />
      </div>
    </van-dialog>
    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      :beforeClose="beforeClose"
      style="width:380px;height:300px"
    >
      <!-- <van-field type="password" placeholder="旧密码" left-icon="edit" v-model="oldPassword"/>
    <van-field type="password" placeholder="新密码" left-icon="edit" v-model="newPassword"/>
      <van-field type="password" placeholder="确认密码" left-icon="edit" v-model="confrimPassword"/>-->

      <van-cell-group>
        <van-field v-model="oldPassword" required clearable label="原登陆密码：" placeholder="请输入旧密码" />

        <van-field
          v-model="newPassword"
          type="password"
          label="新登陆密码："
          placeholder="请输入新密码"
          required
        />
        <van-field
          v-model="confrimPassword"
          type="password"
          label="确认新密码："
          placeholder="请确认新密码"
          required
        />
      </van-cell-group>
      <van-icon name="bulb-o" style="margin-left:150px" />温馨提示
      <br />
      <span style="color:gray;font-size:12px;margin-left:10px">登陆密码区分大小写，长度为8-14位，必须为包含字母和数字的组合</span>
      <br />
      <br />
    </van-dialog>
    <van-dialog
      v-model="showConnect"
      title="意见反馈"
      show-cancel-button
      :beforeClose="beforeCloseConnect"
    >
      <div style="text-align: center;margin-top:20px;margin-bottom:20px">
        <van-field
          autosize
          size="large"
          placeholder="请输入留言"
          v-model="feedbackContent"
          type="textarea"
          rows="3"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Dialog, Field, Toast } from "vant";
import store from "store";
import Vue from "vue";
import { isOnWechat } from "@/common/other";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Dialog)
  .use(Field)
  .use(Toast);
export default {
  name: "UserCell",
  data() {
    return {
      showAboutUs: false,
      showPassword: false,
      showConnect: false,
      oldPassword: "",
      newPassword: "",
      confrimPassword: "",
      feedbackContent: ""
    };
  },
  methods: {
    changeAboutUs() {
      this.showAboutUs = true;
    },
    changePassWord() {
      this.showPassword = true;
    },
    changeConnect() {
      this.showConnect = true;
    },
    // 修改密码接口
    async modifyTeacherPassword(oldPassword, newPassword) {
      try {
        //提交
        await this.$api.login.modifyTeacherPassword(oldPassword, newPassword);
        if (isOnWechat()) {
          this.$router.push("/tLogin");
        } else {
          this.$router.push("/");
        }
        Toast.success("成功修改密码");
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 学生意见反馈
    async addStudentFeedback(content) {
      try {
        //提交
        let res = await this.$api.user.addStudentFeedback(content);
        Toast.success(res.detail);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 教师意见反馈
    async addTeacherFeedback(content) {
      try {
        //提交
        let res = await this.$api.user.addTeacherFeedback(content);
        Toast.success(res.detail);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    beforeCloseConnect(action, done) {
      if (action === "cancel") {
        //取消按钮
        this.feedbackContent = "";
        done();
      } else if (action === "confirm") {
        //确定按钮
        this.feedback(this.feedbackContent);
        done();
        this.feedbackContent = "";
      }
    },
    beforeCloseAboutUs(action, done) {
      if (action === "cancel") {
        //取消按钮
        done();
      } else if (action === "confirm") {
        //确定按钮
        done();
      }
    },
    beforeClose(action, done) {
      if (action === "cancel") {
        //取消按钮
        (this.oldPassword = ""),
          (this.newPassword = ""),
          (this.confrimPassword = ""),
          done();
      } else if (action === "confirm") {
        //确定按钮
        if (this.newPassword == "") {
          Toast.fail("密码不能为空");
        } else if (this.oldPassword == this.newPassword) {
          Toast.fail("密码不能与原来一致");
        } else if (this.newPassword != this.confrimPassword) {
          Toast.fail("新密码不一致");
        } else {
          this.modifyTeacherPassword(this.oldPassword, this.newPassword);
        }
        done();
      }
    },
    feedback(content) {
      let user = store.get("user");
      let role = user.role;
      if (this.feedbackContent.length > 150) {
        Toast.fail("反馈字数超出限制");
      } else {
        if (role == "student") {
          this.addStudentFeedback(content);
        } else {
          this.addTeacherFeedback(content);
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell-title {
  font-weight: 500;
  padding-left: 10px;
}
</style>
