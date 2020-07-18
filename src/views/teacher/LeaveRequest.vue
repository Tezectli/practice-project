/* 教师个人中心请假申请 */
<template>
    <div class="page">
        <van-nav-bar title="请假申请" left-arrow @click-left="$router.back(-1);" class="mb-1"></van-nav-bar>
        <van-tabs  title-active-color="#1ab394" animated >
            <van-tab title="代/调/调代课申请">
                <apply-requst/>
            </van-tab>
            <van-tab title="病假/事假申请">
                <sick-requst/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import ApplyRequst from "@/components/ApplyRequst";
import SickRequst from "@/components/SickRequst";
import {
  NavBar,
  Tab, 
  Tabs,
} from "vant";
import Vue from "vue";
Vue.use(NavBar)
    .use(Tab)
    .use(Tabs);
export default {
    components:{
        "apply-requst":ApplyRequst,
        "sick-requst":SickRequst,
    }
}
</script>


<style lang="scss" scoped>
@import "@/scss/base.scss";
.page {
  @include page;
  .mb-1 {
    margin-bottom: 10px;
  }
}
</style>
