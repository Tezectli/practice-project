<template>
  <div>
    <van-notice-bar text="单元格向左滑动可进行操作" left-icon="volume-o" />
    <div>
      <!-- 这个是示例 -->
      <div class="info">
        <van-swipe-cell v-for="item of data" :key="item.id">
          <van-cell
            :border="false"
            :title="item.studentName"
            :value="item.sex"
          />
          <template slot="right">
            <van-button
              square
              type="primary"
              text="查看信息"
              @click="showInfoPopup(item.studentId,item.birthday,item.familyPhone,item.nation)"
            />
            <van-button square type="danger" text="删除" @click="deleteFriend(item.studentId)" />
          </template>
        </van-swipe-cell>
      </div>

      <van-popup
        v-model="showInfo"
        position="bottom"
        get-container="#app"
        :style="{ height: '30%' }"
      >
        <van-cell title="学号:" :value="studentId" />
        <van-cell title="生日:" :value="birthday" />
        <van-cell title="联系电话:" :value="familyPhone" />
        <van-cell title="民族:" :value="nation" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { IndexBar, IndexAnchor, SwipeCell, Dialog, Popup } from "vant";
import Vue from "vue";
Vue.use(IndexBar)
  .use(SwipeCell)
  .use(Dialog)
  .use(Popup)
  .use(IndexAnchor);
export default {
  name: "FriendAdded",
  data() {
    return {
      data: [],
      showInfo: false,
      headportrait:
        "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=bac4cb62df43ad4ba62e41c6ba393d92/0df431adcbef760928c1af5820dda3cc7dd99e2a.jpg",
      sex: "",
      birthday: "",
      familyPhone: "",
      nation: "",
      studentId: ""
    };
  },
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    //获取列表
    async getFriendList(classId) {
        const res = await this.$api.user.getFriendList(classId);
        this.data = res.data;
    },
    async deleteFriend(deleteId) {
        await this.$api.user.deleteFriend(deleteId);
        this.getFriendList(this.value);
    },
    showInfoPopup(studentId, birthday, familyPhone, nation) {
      this.showInfo = true;
      this.studentId = studentId;
      this.birthday = birthday;
      this.familyPhone = familyPhone;
      this.nation = nation;
    }
  },
  mounted() {
    this.value&&this.getFriendList(this.value);
  },
  watch:{
    value(){
      this.data = [];
      this.getFriendList(this.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.van-icon__image {
  width: 50px;
  height: 50px;
}
.van-button {
  height: 64px;
}
.info {
  margin-top: 10px;
}
.van-button--primary {
  color: #fff;
  background-color: rgb(168, 144, 144);
  border: 1px solid rgb(168, 144, 144);
}
.van-cell {
  line-height: 45px;
}
</style>