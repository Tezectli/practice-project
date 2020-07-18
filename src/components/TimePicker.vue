/* 用于具体日期时间的选择器组件 -润
To use:  v-modal="classId（data里的一个stirng类型变量）
 @change="需要重新调用的接口方法"*/
<template>
  <div>
    <div style="margin-bottom: 10px;">
    <!-- 输入框 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="notes-o"
      :value="day"
      placeholder="选择日期"
      @click="showPopupDay"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showDay" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            @cancel="onPopupCancel"
            @confirm="onPopupConfirmDay"
        />
      </div>
    </van-popup>
    </div>
    <!-- 输入框 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="clock-o"
      placeholder="选择时间"
      :value="timevalue"
      @click="showPopupTime"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showTime" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-picker :columns="columns"  show-toolbar @cancel="showTime=false" @confirm="confirm"/>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Icon, Field, Popup, Picker, DatetimePicker } from "vant";
import Vue from "vue";
import {leftPadZero} from "@/common/time";
Vue.use(Field)
  .use(Popup)
  .use(Icon)
  .use(Picker)
  .use(DatetimePicker);
export default {
  name: "TimePicker",
   model: {
    prop: "value",
    event: "update"
  },
  props: {
     value: {
      type: String,
      required: true
    },
    classId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showDay: false,
      showTime: false, // 弹出层的flag
      data: [],
      val: '',
      currentDate: new Date(),
      columns: [],
      timevalue:''
    };
  },

  computed:{
    day:function(){
      return leftPadZero(`${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`)
    },
  },
  methods: {
    // 显示弹窗
    showPopupDay() {
      // 显示
      this.showDay = true;
    },
    showPopupTime() {
      // 显示
      this.showTime = true;
    },
    // 取消(不选择)
    onPopupCancel() {
      this.showDay = false;
    },
    async getTeacherCourseTime() {
      try {
        const res = await this.$api.attendance.getTeacherCourseTime(this.classId,this.day);
        this.columns = res.data.map(item => item.courseStartTime)
        this.timevalue = this.columns[0]
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    // 确认弹窗
    onPopupConfirmDay() {
      this.onPopupCancel();
      this.getTeacherCourseTime();
    },
    confirm(values){
      this.showTime=false
      this.timevalue = values
    }
    //确认时间
    // confirmTime(value){
    //   this.showTime=false;
    //   this.timevalue=value;
    //   this.$emit("update",value)
    //   this.$emit("change",this.day,value)
    // }
  },
  watch:{
    // day:function(){
    //   this.$emit("update",this.timevalue)
    //   this.$emit("change",this.day,this.timevalue)
    // },
    timevalue:function(){
      this.$emit("update",this.timevalue)
      this.$emit("change",this.day,this.timevalue)
    },
    classId: function(newVal) {
      newVal&&this.getTeacherCourseTime();
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
