/* 用于班级的选择器组件 -润
To use:  v-modal="classId（data里的一个stirng类型变量）
 @change="需要重新调用的接口方法"*/
<template>
  <div>
    <van-tabs :ellipsis="false" swipe-threshold="2" color="#78909c" @click="onPopupConfirm">
      <van-tab v-for="item of data" :key="item.key" :title="item.text" :name="item.key"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Icon, Field, Popup, Picker, Button, Row, Col,Tabs,Tab } from "vant";
import storage from "../common/storage";
import Vue from "vue";
Vue.use(Field)
  .use(Popup)
  .use(Icon)
  .use(Picker)
  .use(Button)
  .use(Row)
  .use(Col)
  .use(Tabs)
  .use(Tab)
export default {
  name: "TeachClassPicker",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    mode: {
      type: String,
      default: "single",
      validator: function(value) {
        return ["single", "all"].includes(value);
      }
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: "选择班级",
      show: false, // 弹出层的flag
      data: [],
      val: "",
      count: 0,
      activeIndex: Number.MIN_SAFE_INTEGER //记录当前所选项
    };
  },
  created() {
    this.getTeachClass();
  },
  methods: {
    // 确认弹窗
    onPopupConfirm(name) {
      // 触发广播
      this.$emit("update", name);
      this.$emit("change");
    },
    async getTeachClass() {
      try {
        let res = "";
        if (this.mode === "all") {
          let cacheVal = storage.get("allClass");
          res = cacheVal
            ? cacheVal.value
            : await this.$api.common.getAllClass();
        } else {
          let cacheVal = storage.get("teachClass");
          res = cacheVal
            ? cacheVal.value
            : await this.$api.common.getTeachClass();
        }
        this.count = res.count;
        this.data = res.data.map(item => {
          return {
            key: item.classId,
            text: item.className
          };
        });
        // 默认选第一个班
        this.$emit("update", this.data[0].key);
        // this.value = this.data[0].key
        this.activeIndex = 0;
        this.$emit("change");
        this.val = this.data[0].text;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.area-wrapper {
  background: $white;
}
.active {
  color: #1ab394;
}
</style>
