// 年级选择器组件 -润 2019/12/05
<template>
  <div>
    <!-- <van-field
      :value="text"
      readonly
      label="年级"
      placeholder="请选择年级"
      @click="show = true"
    />
    <van-popup
      v-model="show"
      position="bottom"
      get-container="#app"
    >
      <van-picker
        show-toolbar
        title="选择年级"
        :columns="cols"
        @cancel="show=false"
        @confirm="onConfirm"
      />
    </van-popup> -->
     <van-tabs :ellipsis="false" swipe-threshold="2" color="#1ab394" @click="onConfirm">
      <van-tab v-for="item of cols" :key="item" :title="item"/>
    </van-tabs>
  </div>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import { gradeMap } from "@/common/keyMap";

Vue.use(Tab).use(Tabs);
export default {
  name: "GradePicker",
  //   选中的年级对应id
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      show: false, // 弹窗
      cols: [], // 年级的对应文字
      colVals:[],// 年级对应的索引
      text:'',//选中年级的对应文字
    };
  },
  created() {
    //   获取一下年级的映射表，去掉全部的选项
    const cols = Object.values(gradeMap);
    cols.pop();
    // 成人
    const adult = cols.shift()
    cols.push(adult)
    this.cols = cols;
    this.text = cols[0];
    this.$emit('update',gradeMap[1]);
  },
  methods:{
    //   确认选中年级，文字和文字对应的索引
    onConfirm(val){
        this.text = val;
        this.$emit('update',val);
        this.show = false;
    }
  }
};
</script>