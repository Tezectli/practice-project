// 日期选择器 -润 2019/12/01
<template>
  <div>
    <van-cell-group>
      <van-field v-model="text" readonly @click="show = true" left-icon="calender-o" />
    </van-cell-group>
    <van-popup v-model="show" position="bottom" get-container="#app">
      <van-datetime-picker v-model="day" type="date" :min-date="min" @confirm="dateConfirm"/>
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import { Popup, DatetimePicker, Field, CellGroup } from "vant";
import dayjs from "dayjs";
Vue.use(Popup)
  .use(DatetimePicker)
  .use(Field)
  .use(CellGroup);
export default {
  name: "DatePicker",
  props: {
    date: {
      required: true,
    },
    // 最小可选日期,此处默认为2018-1-1
    minDate: {
      required: false,
      type: String,
      default: '2018-01-01'
    }
  },
  model: {
    prop: "date",
    event: "change"
  },
  data() {
    return {
      day: dayjs(this.date).toDate(),
      show: false,
      text: this.date
    };
  },
  computed: {
    min() {
      return dayjs(this.minDate).toDate();
    }
  },
  methods: {
    dateConfirm(value) {
      const vals = dayjs(value).format("YYYY-MM-DD");
      this.text = vals;
      this.show = false;
      this.$emit("change", vals);
    }
  }
};
</script>