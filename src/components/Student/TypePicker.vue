<template>
  <div>
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="award-o"
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
  name: "TypePicker",
  model: {
      prop: "value",
      event: "update"
  },
  props: {
      value: {
          type: String,
          required: true,
      }
  },
  data() {
      return {
          title: "选择主题",
          show: false, // 弹出层的flag
          data: [
            {
              key: "form_post_works",
              text: '作品'
            },
            {
              key: "form_post_application",
              text: '作品应用',
            },
            {
              key: "form_post_other",
              text: '其他'
            }
          ],
          val: ''
      };
  },
  created () {
    this.getTopicId()
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
      this.$emit("update", value.key);
      this.$emit("change");
    },
    async getTopicId () {
      // 默认选第一个
      this.$emit("update",this.data[0].key);
      this.$emit('change');
      this.val = this.data[0].text
    }
  }
}
</script>

<style scoped>

</style>