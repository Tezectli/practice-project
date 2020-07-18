<template>
  <div>
    <van-field
      readonly
      clickable
      right-icon="arrow-down"

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
  name: "CurrencyPicker",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      title: "选择素养",
      show: false, // 弹出层的flag
      data: [],
      val: ''
    }
  },
  created () {
    this.getCurrencyType()
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
    async getCurrencyType () {
      try {
        let res = await this.$api.evaluation.initCurrencyType()
        this.data = res.data.map(item => {
          return {
            key: item.currencyId,
            text: item.currencyName,
            subcurrencyId: item.subcurrencyId
          }
        });
        // 默认选第一个
        this.$emit("update",this.data[0]);
        this.$emit('change');
        this.val = this.data[0].text
      }  catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
}
</script>

<style scoped>

</style>