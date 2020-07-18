/* 请假申请病假/事假子组件（教师个人中心请假申请） */
<template>
  <div style="width:100%;height:600px;margin-top:10px">
    <!-- 申请原因picker -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="comment-o"
      :value="valreason"
      placeholder="申请原因"
      @click="showPopupReason"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showReason" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-picker
          :columns="reasondata"
          show-toolbar
          @cancel="onPopupCancel"
          @confirm="onPopupConfirmReason"
        />
      </div>
    </van-popup>

    <!-- 选择开始日期 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="underway-o"
      :value="StartDate"
      placeholder="请选择请假开始日期"
      error-message="请选择请假开始日期"
      @click="showPopupStartDay"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showStartDate" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-datetime-picker
          v-model="currentStartDate"
          type="date"
          :min-date="start"
          @cancel="onPopupCancel"
          @confirm="onPopupConfirmDay"
        />
      </div>
    </van-popup>

    <!-- 选择结束日期 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="underway-o"
      :value="EndDate"
      placeholder="请选择请假结束日期"
      error-message="请选择请假结束日期"
      @click="showPopupEndDay"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showEndDate" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-datetime-picker
          v-model="currentEndDate"
          type="date"
          @cancel="onPopupCancel"
          @confirm="onPopupConfirmDay"
        />
      </div>
    </van-popup>
    <div style="font-size:12px;color:#7c7c7c;margin-bottom:5px">注意:请选择请假原因，结束时间必须在开始时间之后</div>
    <div style="text-align:center">
      <van-uploader v-model="fileList" max-count="1" />
    </div>
    <div style="text-align:center">
      <van-button type="primary" @click="applyForAdjustSchedule">确认提交</van-button>
    </div>
  </div>
</template>

<script>
import {
  Field,
  Popup,
  DatetimePicker,
  Button,
  Uploader,
  Icon,
  Toast
} from "vant";
import { leftPadZero } from "@/common/time";
import Vue from "vue";
Vue.use(Field)
  .use(Popup)
  .use(DatetimePicker)
  .use(Button)
  .use(Uploader)
  .use(Icon);
export default {
  name: "SickRequst",
  data() {
    return {
      showReason: false,
      showStartDate: false,
      showEndDate: false,
      valreason: "",
      reasondata: ["病假", "事假"],
      currentStartDate: new Date(),
      currentEndDate: new Date(),
      fileList: [],
      start:new Date()
    };
  },
  computed: {
    StartDate: function() {
      return leftPadZero(
        `${this.currentStartDate.getFullYear()}-${this.currentStartDate.getMonth() +
          1}-${this.currentStartDate.getDate()}`
      );
    },
    EndDate: function() {
      return leftPadZero(
        `${this.currentEndDate.getFullYear()}-${this.currentEndDate.getMonth() +
          1}-${this.currentEndDate.getDate()}`
      );
    }
  },
  methods: {
    showPopupReason() {
      this.showReason = true;
    },
    showPopupStartDay() {
      this.showStartDate = true;
    },
    showPopupEndDay() {
      this.showEndDate = true;
    },
    onPopupCancel() {
      this.showReason = false;
      this.showStartDate = false;
      this.showEndDate = false;
    },
    onPopupConfirmReason(value) {
      this.onPopupCancel();
      this.valreason = value;
    },
    onPopupConfirmDay() {
      this.onPopupCancel();
    },
    checkInfo() {
      if (this.valreason == "") return false;
      else return true;
    },
    checkDate() {
      if (this.currentEndDate < this.currentStartDate) return false;
      else return true;
    },
    checkFile() {
      if (!this.fileList[0]) return false;
      else return true;
    },
    async applyForAdjustSchedule() {
      if (this.checkInfo() && this.checkDate() && this.checkFile()) {
        let status;
        if (this.valreason === "病假") status = 4;
        else status = 5;
        let data = {
          status: status,
          leaveStartTime: this.StartDate,
          leaveEndTime: this.EndDate
        };
        let res = await this.$api.user.applyForAdjustSchedule(
          data,
          this.fileList[0]
        );
        if (res.data.code === 200) {
          this.fileList = [];
          Toast.success(res.data.msg);
        }
      } else {
        Toast.fail("输入格式不正确");
      }
    }
  }
};
</script>


<style lang="scss" scoped>
input-wrapper >>> .van-uploader__input-wrapper {
  width: 100%;
}
.area-wrapper {
  background: $white;
}
.mb-1 {
  margin-bottom: 10px;
}
</style>
