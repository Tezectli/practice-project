<template>
  <div class="page">
    <van-nav-bar class="page-nav" title="学生详情" left-arrow @click-left="$router.back(-1);" fixed/>
    <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="comment"
      placeholder="studentCard"
      label="学号"
      :value = this.plans.studentCard
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="manager"
      placeholder="name"
      label="姓名"
      :value = this.plans.name
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="like"
      placeholder="sex"
      label="性别"
      :value = this.plans.sex
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="medel"
      placeholder="birthday"
      label="生日"
      :value = this.plans.birthday
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="location"
      placeholder="address"
      label="地址"
      :value = this.plans.address
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="phone"
      placeholder="familyPhone"
      label="家长电话"
      :value = this.plans.familyPhone
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="friends"
      placeholder="familyName"
      label="家长姓名"
      :value = this.plans.familyName
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="map-marked"
      placeholder="nation"
      label="国家"
      :value = this.plans.nation
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="coupon"
      placeholder="idcard"
      label="身份证"
      :value = this.plans.idcard
      class="mb-1"
    />
     <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="star"
      placeholder="gradeId"
      label="年级"
      :value =this.plans.gradeId
      class="mb-1"
    />
     
  </div>
</template>
<script>
import {
  NavBar,
  NoticeBar,
  Field
} from "vant";
import Vue from "vue";
Vue.use(NavBar)
  .use(NoticeBar)
  .use(Field)

export default {
  name: "studentInfo",
  data () {
      return{
        plans:[]
      }
  },
  methods :{
    // 学生详细信息接口
    async getStudentDetail() {
      //   this.loading = true;
      try {
        // 获取学生信息列表
        let res = await this.$api.user.getStudentDetail();
        this.plans = res;
        // 取消加载动画
        this.loading = false;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    }
  },
  mounted(){
      this.getStudentDetail()
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.page {
  @include page;
  background: $white;
  &-notice {
    margin-bottom: 16px;
  }
  &-content {
    height: 80%;
    &_loaded {
      width: 100%;
      height: 100%;
      background: $bg;
    }
  }
}
.mb-1 {
    margin-bottom: 10px;
  }
</style>