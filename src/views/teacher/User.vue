/* 用户中心 -润 */
<template>
  <div class="user">
    <div class="user-info">
      <div class="user-info__background">
        <!-- <h3 class="user-info__background-title">爱实践</h3> -->
      </div>
      <div class="user-info__card">
        <div class="user-info__card__btn-group">
          <van-button
            class="user-info__card__btn-group__btn"
            type="primary"
            size="mini"
            color="#78909c"
            plain
            round
            hairline
            @click="clearLogin"
          >
            <van-icon class-prefix="zhsj-icon" name="export" />
          </van-button>
        </div>
        <avatar class="user-info__card__avatar" src="../assets/img/avatar.png" :size="70" />
        <h4 class="user-info__card__title">
          {{username}}
          <van-tag class="user-info__card__title__tag" size="medium" plain round color="#78909c">老师</van-tag>
        </h4>
      </div>
    </div>
    <user-grid class="user-grid" />
    <user-cell style="margin-bottom:50px;" />
  </div>
</template>
<script>
import UserGrid from "@/components/UserGrid";
import UserCell from "@/components/UserCell";
import Avatar from "@/components/Avatar";
import store from "store";
// import {Row,Col} from 'vant'
import { Tag, Button, Icon } from "vant";
import Vue from "vue";
Vue.use(Tag)
  .use(Button)
  .use(Icon);

// Vue.use(Row).use(Col)
export default {
  components: {
    "user-grid": UserGrid,
    "user-cell": UserCell,
    avatar: Avatar
  },
  data() {
    return {
      username: store.get("user").username,
      identity: store.get("user").role
    };
  },
  methods: {
    async clearLogin() {
      try {
        await this.$api.login.teacherLogout();
        localStorage.removeItem("user");
        localStorage.removeItem("authorize");
        this.$router.push("/");
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/base.scss";
.user {
  @include page;
  &-info {
    width: 100%;
    height: 220px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__background {
      width: 100%;
      height: 144px;
      background: #78909c;
      color: $white;
      &-title {
        padding-left: 10%;
        font-size: 180%;
      }
    }
    &__card {
      width: 90%;
      height: 144px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: -77px;
      background: $white;
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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
        color: $primary;
        &__tag {
          padding: 3px;
          font-size: 80%;
        }
      }
    }
  }
  &-grid {
    margin-bottom: 20px;
  }
}
</style>
