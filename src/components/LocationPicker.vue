/* 用于登录的地区选择器组件 -润 
To use v-model="schoolId"*/
<template>
  <div>
    <!-- 输入框 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      label="机构"
      :value="input"
      placeholder="选择机构"
      @click="showPopup"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="show" position="bottom">
      <div class="area-wrapper">
        <van-picker
          ref="locationPicker"
          :loading="loading"
          :columns="dataArr"
          title="选择机构"
          @change="change"
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
  name: "LocationPicker",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false, // 弹出层的flag
      loading: false, //picker的loading
      dataArr: [],
      province: "",
      city: "",
      school: "",
      schoolData: []
    };
  },
  computed: {
    input() {
      return `${this.province}/${this.city}/${this.school}`;
    }
  },
  created() {
    this.getProvince();
  },
  methods: {
    // 开关加载状态
    toggle() {
      this.loading = !this.loading;
    },
    change(picker, values) {
      if (values[0] != this.province) {
        this.getCity(values[0]);
        this.province = values[0];
      } else if (values[1] != this.city) {
        this.province = values[0];
        this.city = values[1];
        this.getSchool(values[0], values[1]);
      }else if(values[2] != this.school){
        this.province = values[0];
        this.city = values[1];
        this.school = values[2];
      }
    },
    // 获取省份数据
    async getProvince() {
      this.toggle();
      const { data } = await this.$api.login.getProvince();
      if (!this.province) {
        this.dataArr.push({
          values: data,
          defaultIndex: 12 //12是广东
        });
      }
      // 记录当前省份来比对change，默认广东因为其他没数据
      this.province = data[12];
      this.getCity(this.province);
      this.toggle();
      // this.$refs.locationPicker.setColumnValues(0,data);
    },
    // 获取城市数据
    async getCity(province) {
      this.toggle();
      const { data } = await this.$api.login.getCity(province);
      // 第一次就用push来生成第二列
      if (!this.city) {
        this.dataArr.push({
          values: data,
          defaultIndex: 16 //16是珠海
        });
        this.city = data[16]
        // 重新调用就调用实例来改值
      } else {
        this.$refs.locationPicker.setColumnValues(1, data);
      }
      this.getSchool(this.province, this.city);
      this.toggle();
    },
    // 获取学校数据
    async getSchool(province, city) {
      this.toggle();
      let { data } = await this.$api.login.getSchool(province, city);
      this.schoolData = data;
      data = data.map(school => school.orgName);
      // 第一次就用push来生成第三列
      if (!this.school) {
        this.dataArr.push({
          values: data,
          defaultIndex: 0
        });
        this.school = data[0]
        // 重新调用就调用实例来改值
      } else {
         this.$refs.locationPicker.setColumnValues(2, data);
      }
      this.toggle();
    },
    // 显示弹窗
    showPopup() {
      // 使用父组件的接口
      this.$emit("handle");
      // 显示
      this.show = true;
    },
    // 取消(不选择)
    onPopupCancel() {
      this.show = false;
    },
    // 确认弹窗
    onPopupConfirm() {
      this.onPopupCancel();
    }
  },
  // 监听学校变化，将school传回父组件
  watch:{
    school:function(newVal){
      const data = this.schoolData
      const index =  data.findIndex(item=>item.orgName == newVal)
      this.$emit("update",data[index].orgId + '')
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
