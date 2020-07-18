<template>
  <div>
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="friends-o"
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
  name: "FriendPicker",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type: String,
      required:true,
    }
  },
  data() {
    return {
      title: "选择同伴",
      show: false, // 弹出层的flag
      data: [],
      val: ''
    }
  },
  created () {
    this.getFriendList()
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
    // 获取同伴
    async getFriendList () {
      try {
        let res = await this.$api.evaluation.getFriendList();
        this.data = res.data.map(item => {
          return {
            key: item.studentId,
            text: item.studentName
          };
        });
        // 默认选第一个
        this.$emit("update",this.data[0].key);
        this.$emit('change');
        this.val = this.data[0].text
      } catch (e) {
        // eslint-disable-next-line
        console.error("​catch -> e", e);
      }
    }
  }
}
</script>

<style scoped>

</style>