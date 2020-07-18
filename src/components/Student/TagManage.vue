// 2020/4/19 邦 广告标签管理页
<template>
  <div>
    <van-nav-bar title="标签管理" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" size="18" @click="onClickRight" />
      </template>
    </van-nav-bar>
    <van-tabs :ellipsis="false" swipe-threshold="2" color="#1ab394" v-model="active">
      <van-tab v-for="(item,index) of currencyItem" :key="index" :title="item" :name="index">
        <div class="container">
          <van-row
            class="info"
            type="flex"
            justify="space-between"
            v-for="(item,index) in tagList"
            :key="index"
          >
            <van-col span="17" class="tagInfo">
              <div style="font-size:17px;font-weight:600">{{item}}</div>
              <div style="font-size:12px;color:#666666">
                <span>22人关注-</span>
                <span>22篇文章</span>
              </div>
            </van-col>
            <van-col span="7" class="btn">
              <van-button
                icon="success"
                type="primary"
                loading-text="请稍后"
                size="small"
                @click="addTag($event)"
              >已关注</van-button>
            </van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
    <van-popup v-model="showPopup" position="bottom" get-container="#app" class="popup" @close="close">
      <van-search v-model="value" show-action placeholder="请输入您感兴趣的标签" @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <van-row
        class="info"
        type="flex"
        justify="space-between"
        v-for="(item,index) in tagList"
        :key="index"
      >
        <van-col span="17" class="tagInfo">
          <div style="font-size:17px;font-weight:600">{{item}}</div>
          <div style="font-size:12px;color:#666666">
            <span>22人关注-</span>
            <span>22篇文章</span>
          </div>
        </van-col>
        <van-col span="7" class="btn">
          <van-button
            icon="success"
            type="primary"
            loading-text="请稍后"
            size="small"
            @click="addTag($event)"
          >已关注</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, NavBar, Card, Col, Row, Button, Popup, Search } from "vant";

Vue.use(Tab)
  .use(Tabs)
  .use(NavBar)
  .use(Card)
  .use(Col)
  .use(Row)
  .use(Button)
  .use(Popup)
  .use(Search);
export default {
  name: "TagManage",
  model: {
    prop: "mes",
    event: "change"
  },
  props: {
    mes: Number
  },
  data() {
    return {
      currencyItem: ["已关注的兴趣标签", "所有兴趣标签"],
      myTag: ["11", "11", "11", "11", "11", "11", "11"],
      allTag: [
        "前端框架",
        "前端框架",
        "前端框架",
        "前端框架",
        "前端框架",
        "前端框架",
        "前端框架",
        "测试",
        "测试",
        "测试",
        "测试",
        "测试",
        "测试",
        "底部"
      ],
      tagList: [],
      active: 0,
      load: false,
      showPopup: false,
      value: ""
    };
  },
  components: {},
  mounted() {
    this.tagList = this.myTag;
  },
  methods: {
    onClickLeft() {
      this.$emit("change", 1);
    },
    onClickRight() {
      this.showPopup = true;
    },
    addTag() {
      this.load = true;
    },
    onSearch() {
      // eslint-disable-next-line
      console.log(this.value);
    },
    close(){
      this.value = ""
    }
  },
  watch: {
    active() {
      if (this.active === 0) {
        this.tagList = this.myTag;
      } else {
        this.tagList = this.allTag;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: white;
  height: 600px;
}
.info {
  background-color: white;
  height: 40px;
  padding: 5px;
}
.info:not(:first-child) {
  border-top: 0.5px solid #d0d0d0;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tagInfo {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.popup {
  height: 250px;
}
</style>