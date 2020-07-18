/* 用于周数的选择器组件 -润
To use:  v-modal="week（data里的一个number类型变量）
 @change="需要重新调用的接口方法"
 mode="single"||"all" 选填，可选值为'all',mode=‘all'可以为选择器增加一个所有周次的选项
 */
<template>
  <div>
    <van-tabs :ellipsis="false" swipe-threshold="2" color="#78909c" @click="onConfirm" v-model="active">
      <van-tab v-for="item of data" :key="item.key" :title="item.text" :name="item.key"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Icon, Field, Popup, Picker } from "vant";
import Vue from "vue";
Vue.use(Field)
  .use(Popup)
  .use(Icon)
  .use(Picker);
export default {
  name: "WeekPicker",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    // v-model 绑定的值，周数
    value: {
      type: Number,
      required: true
    },
    // 模式，默认不包含所有周次这个选项。
    mode: {
      default: "single",
      type: String,
      required:false,
      validator: function(value) {
        return ["single", "all"].includes(value);
      }
    }
  },
  data() {
    return {
      title: "选择教学周",
      show: false, // 弹出层的flag
      data: [],
      active:''
    };
  },
  created() {
    this.getWeekInfo();
  },
  methods: {
    // 选中周次
    onConfirm(value) {
      // 触发广播
      this.$emit("update", value);
      this.$emit("change");
    },
    async getWeekInfo() {
      try {
        //获取教学周
        const res = await this.$api.common.getWeekInfo();
        const currentWeek = res.data[0].currentWeek;
        // 清空
        this.data = [];
        // 如果不是单例模式，增加所有周次选项
        if (this.mode != "single") {
          this.data.push({
            text: "所有周次",
            key: -1
          });
        }
        // 循环填充
        for (let i = 1; i <= currentWeek; i++) {
          this.data.push({
            text: `第${i}周`,
            key: i
          });
        }
        //  默认选择最后一周（当前周)，如果是all模式默认选择所有周次
        if (this.mode == "all") {
          this.active =  this.data[0].key
          this.$emit("update", this.data[0].key);
        } else {
          this.active =  currentWeek
          this.$emit("update", currentWeek);
          // 把当前周翻到前面，避免用户认知偏差
          this.data = this.data.reverse()
        }
        this.$emit("change");
      } catch (e) {
        // eslint-disable-next-line
        console.error("​catch -> e", e);
      }
    }
  },
  watch: {
    mode: function(newVal,oldVal) {
      if (this.data.length) {
        if (newVal === "all" && oldVal === 'single') {
          this.data.unshift({ text: "所有周次", key: -1 });
        } else if (newVal === "single" && oldVal === 'all') {
          this.data.shift();
        }
        this.$emit("update", this.data[0].key);
        this.$emit("change");
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
</style>
