/* 用于学生在课班级的选择器组件 -润
To use:  v-modal="classId（data里的一个stirng类型变量）
 @change="需要重新调用的接口方法"*/
<template>
  <div>
    <van-tabs :ellipsis="false" swipe-threshold="2" type="line" @click="onPopupConfirm" title-inactive-color="black"
      title-active-color="black" class="container active spanborder" color="#1989FA">
      <van-tab v-for="item of data" :key="item.key" :title="item.text" :name="item.key"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Icon, Field, Popup, Picker, Button, Row, Col, Tab, Tabs } from "vant";
import Vue from "vue";
import storage from "../../common/storage";
Vue.use(Field)
  .use(Popup)
  .use(Icon)
  .use(Picker)
  .use(Button)
  .use(Row)
  .use(Col)
  .use(Tab)
  .use(Tabs);
export default {
  name: "ClassPicker",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: "single",
      validator: function(value) {
        return ["single", "all"].includes(value);
      }
    }
  },
  data() {
    return {
      title: "选择班级",
      show: false, // 弹出层的flag
      data: [],
      val: "",
      count: 0,
      width: 0,
      activeIndex: Number.MIN_SAFE_INTEGER //记录当前所选项
    };
  },
  created() {
    this.getClass();
  },
  methods: {
    // 确认弹窗
    onPopupConfirm(name, title) {
      // this.onPopupCancel();
      this.val = title;
      // 触发广播
      this.$emit("update", name);
      this.$emit("change");
    },
    confirmButton(item, index) {
      this.activeIndex = index;
      this.$emit("update", item.key);
      this.$emit("change");
    },
    async getClass() {
      try {
        let cacheVal = storage.get("studentClasses"); // 从缓存中获取数据
        const res = cacheVal
          ? cacheVal.value
          : await this.$api.common.getStudentClass(); //只有没有数据时发起请求
        this.count = res.count; //记录班级总数
        this.data = res.data.map(item => {
          //映射数据成为组件支持的格式
          return {
            key: item.classId, //以id为键
            text: item.className //以班名为值
          };
        });
        // all模式加一个全部的选项
        if (this.mode == "all") {
          this.data.unshift({ key: "", text: "全部" });
        }
        // 默认选第一个班
        this.$emit("update", this.data[0].key);
        this.$emit("change");
        this.val = this.data[0].text; //将显示改为第一个班
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component `o     `nly -->
<style lang="scss" scoped>
.area-wrapper {
  background: $white;
}
.active {
  color: #1ab394;
}
.tab-btn {
  font-size: 13px;
  width: 100%;
}

.container /deep/ .van-tabs__nav--card {
  border: none;
  margin: 0;
}
.active /deep/ .van-tabs__nav--card .van-tab.van-tab--active {
  background-color: rgb(56, 114, 229);
}
.spanborder /deep/.van-tabs__nav--card .van-tab {
  border: none;
}
/*2020-10-14 更改tab间空隙*/
/deep/.van-tab {
  position: relative;
  // -webkit-box-flex: 1;
  // -webkit-flex: 1;
  // flex: 1;
  box-sizing: border-box;
  min-width: 0;
  padding: 0 10px;
  color: #7d7e80;
  font-size: 14px;
  // line-height: 44px;
  text-align: center;
  cursor: pointer;
}
</style>
