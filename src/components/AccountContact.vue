// 用于pickrole界面的卡片组件。-润
<template>
  <div class="contact" @click="studentQuickLogin">
    <div class="contact-title">
      <div class="contact-title__school">{{account.schoolName}}</div>
      <div class="contact-title__grade">{{account.gradeId + 1}}年级{{account.userType}}</div>
    </div>
    <span class="name">{{account.name}}</span>
  </div>
</template>
<script>
import store from "store";
export default {
  props: {
    account: {
      type: Object,
      required: true
      // schoolName,gradeId,name,studentId,name
    }
  },
  methods: {
    //学生快速登录
    async studentQuickLogin() {
      try {
        let { orgId, studentId, name } = this.account;
        await this.$api.login.studentQuickLogin(orgId, studentId, name);
        store.set("user", {
          school: orgId,
          username: name,
          role: "student",
          id: studentId
        });
        this.$router.push("s/home");
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.contact {
  width: 90%;
  height: 15%;
  margin-bottom: 10px;
  background: #fff;
  border: none;
  border-bottom: 5px solid transparent;
  border-radius: 4px;
  box-shadow: 1px 1px 1px #777;
  border-image: 5
    repeating-linear-gradient(
      -45deg,
      red 0,
      red 1em,
      transparent 0,
      transparent 2em,
      #58a 0,
      #58a 3em,
      transparent 0,
      transparent 4em
    );
}
.name {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  font-size: 26px;
  font-weight: bold;
  color: #1ab394;
  text-align: center;
}
.contact-title {
  width: 100%;
  height: 22%;
  font-weight: bold;
  font-size: 90%;
  display: inline-flex;
  justify-content: space-between;
  color: #1ab394;
  &__school {
    margin-left: 4px;
    text-align: left;
  }
  &__grade {
    margin-right: 4px;
    text-align: right;
  }
}
</style>