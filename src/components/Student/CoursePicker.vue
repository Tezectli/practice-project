<template>
  <div>
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="notes-o"
      :value="val"
      :placeholder="title"
      @click="showPopup"
    />
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
  name: "CoursePicker",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type: Object,
      required:true,
    }
  },
  data() {
    return {
      title: "选择班级",
      show: false, // 弹出层的flag
      data: [],
      val: ''
    };
  },
  created () {
    this.getMyCourse()
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
      this.$emit("update", value);
      this.$emit("change");
    },
    async getMyCourse () {
      try {
        const res = await this.$api.submitWork.getMyCourse();
        this.data = res.data.map(item => {
          return {
            key: item.classId,
            text: item.className,
            type: item.courseType
          }
        });
        // 默认选第一个班
        this.$emit("update",this.data[0]);
        this.$emit('change');
        this.val = this.data[0].text
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.area-wrapper {
  background: $white;
}
</style>