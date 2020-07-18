/* 用于单个学生的选择器组件 -润
To use:  v-modal="studentId（data里的一个String类型变量）
 @change="需要重新调用的接口方法"
 mode="all"||"single" 选填，可选值为'single',mode=‘single'会禁用选择器中的所有学生选项（v-model返回一个'')
 */
<template>
  <div>
    <!-- 输入框 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="user-o"
      :value="val"
      :placeholder="title"
      @click="showPopup"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="show" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-picker
          :columns="data"
          show-toolbar
          :title="title"
          @cancel="onPopupCancel"
          @confirm="onPopupConfirm"
        />
      </div>
    </van-popup>
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
  name: "StudentPicker",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    // v-model 绑定的值，周数
    value: {
      type: String,
      required: true
    },
    classId: {
      type: String,
      required: true
    },
    // 模式，默认不包含所有周次这个选项。
    mode: {
      default: "all",
      type: String,
      validator: function(value) {
        return ["single", "all"].includes(value);
      }
    }
  },
  data() {
    return {
      title: "选择学生",
      show: false, // 弹出层的flag
      data: [
        {
          text: "", //显示的字
          key: "" //对应的索引
        }
      ],
      val: ""
    };
  },
  methods: {
    // 显示弹窗
    showPopup() {
      // 显示
      this.show = true;
    },
    // 取消(不选择)
    onPopupCancel() {
      this.show = false;
    },
    // 确认弹窗
    onPopupConfirm(value) {
      this.onPopupCancel();
      this.val = value.text;
      // 触发广播
      this.value = value.key
      // this.$emit("update", value.key);
      this.$emit("update",this.value);
    },
    // 获取学生
    async getStudent() {
      try {
        let res = await this.$api.common.getClassStudent(this.classId);
        this.data = res.data.map(item => {
          return {
            key: item.studentId,
            text: item.studentName
          };
        });
        
        // 如果不是单例模式，在开头增加所有学生选项
        if (this.mode != "single") {
          this.data.unshift({
            key: "",
            text: "所有学生"
          });
        }
        this.val = this.data[0].text;
        this.$emit("update", this.data[0].key);

        this.$emit("change");
      } catch (e) {
        // eslint-disable-next-line
        console.error("​catch -> e", e);
      }
    }
  },
  watch: {
    classId() {
      this.classId && this.getStudent();
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
