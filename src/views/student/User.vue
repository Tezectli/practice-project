/* 学生个人中心 -润 2019/9/3 */
/* 用户中心 -润 */
/* 学生个人中心 -诗婷 2020/10/16重构 */
<template>
  <!-- <transition name="van-slide-left"> -->
  <div class="user">
    <div class="user-info">
      <nav-bar title="个人中心" style="z-index: 1;background: #8a2be200;width: 100%;border: none; color:white" />
      <div class="user-info__background">
        <img src="@/assets/img/user-background.png" class="titlepic">
      </div>
      <div class="user-info__inner">
        <avatar src="../assets/img/avatar.png" :size="58"
          style="margin:20px 20px 0px 20px;border:#d2d2d2 solid 2px;border-radius:7px">
        </avatar>
        <span style="font-weight:800;margin-top:20px;position:absolute;">{{username}}</span>
        <span style="font-size:12px;margin-top:48px;position:absolute;color: #999999;">这个人很懒，什么都没有写</span>
        <div class="user-info__card">
          <div style="width:100%">
            <info-cell />
          </div>
        </div>
      </div>
    </div>
    <stu-grid class="user-grid" />
    <user-cell class="user-griddown" />
  </div>
  <!-- </transition> -->
</template>
<script>
import StuGrid from "@/components/Student/StuGrid";
import UserCell from "@/components/Student/StudentUserCell";
import Avatar from "@/components/Avatar";
import InfoCell from "@/components/Student/InfoCell";
import NavBar from "@/components/NavBar";
import store from "store";
// import {Row,Col} from 'vant'
import { Tag, Button, Icon, Row, Col } from "vant";
import Vue from "vue";
Vue.use(Tag)
  .use(Button)
  .use(Icon)
  .use(Row)
  .use(Col);
export default {
  components: {
    "stu-grid": StuGrid,
    "user-cell": UserCell,
    avatar: Avatar,
    "info-cell": InfoCell,
    "nav-bar": NavBar
  },
  data() {
    return {
      username: store.get("user").username,
      identity: store.get("user").role
    };
  },
  computed: {},
  methods: {
    async clearLogin() {
      await this.$api.login.studentLogout();
      localStorage.removeItem("user");
      localStorage.removeItem("authorize");
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.user {
  @include page;
  align-items: center;
  justify-content: center;
  &-info {
    width: 100%;
    height: 200px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-color: white;
    &__background {
      position: fixed;
      width: 100%;
      height: 160px;
      background: #1989fa;
      color: $white;
      &-title {
        padding-left: 10%;
        font-size: 180%;
        color: $primary;
        font-size: bold;
      }
    }
    &__inner {
      // display: flex;
      width: 90%;
      background: #ffffff;
      z-index: 2;
      margin-top: 25px;
      border-radius: 7px;
      flex-direction: row;
      box-shadow: #f3f3f3 1px 1px 5px;
    }
    &__card {
      width: 98%;
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      // margin-top: 15px;
      margin: 6px auto;
      // background: $white;
      // border-radius: 20px;
      // box-shadow: 0 5px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      &-wrap {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 6px 0;
      }
      &__btn-group {
        width: 100%;
        margin-top: 5px;
        display: inline-flex;
        align-items: flex-end;
        justify-content: flex-end;
        &__btn {
          margin-right: 5px;
          background: $white;
        }
      }
      &__title {
        margin: 10px;
        margin-left: 20px;
        color: $primary;
        &__tag {
          padding: 3px;
          font-size: 80%;
        }
      }
    }
  }
  &-grid {
    // margin-bottom: 10px;
    width: 90%;
    margin: 45px auto 16px auto;
    background: rgb(255, 255, 255);
    border-radius: 7px !important;
    box-shadow: #f3f3f3 1px 1px 5px;
  }
  &-griddown {
    width: 90%;
    margin: 20px auto;
    background: rgb(255, 255, 255);
    border-radius: 7px !important;
    box-shadow: #f3f3f3 1px 1px 5px;
  }
}
/deep/.card-cell__num[data-v-5fe9f258] {
  font-size: 14px;
  font-weight: bold;
  color: #096cba;
}
/deep/.card-cell__name[data-v-5fe9f258] {
  font-size: 14px;
  color: #b6b5b5;
  /* border-right: brown solid; */
}
/*改变个人中心导航栏样式*/
/deep/.van-nav-bar .van-nav-bar__title[data-v-4295d220] {
  font-weight: bold;
  color: white;
}
/deep/.van-nav-bar .van-icon {
  color: #ffffff;
  vertical-align: middle;
}
/deep/.van-nav-bar .van-nav-bar__text[data-v-4295d220] {
  font-weight: bold;
  color: white;
}
/*单独去除导航栏下边框*/
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0px;
}

/*界面切换动画*/
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   will-change: transform;
//   transition: all 300ms;
//   position: absolute;
// }

// .slide-right-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }

// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }

// .slide-left-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }

// .slide-left-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }

.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-enter-active {
  transition: transform 0.3s;
}
.slide-left-enter-to {
  transform: translateX(0);
}
.slide-left-leave {
  transform: translateX(0);
}
.slide-left-leave-active {
  transition: transform 0.3s;
}
.slide-left-leave-to {
  transform: translateX(0);
}
</style>
