/* 请假申请代/调/调代课子组件（教师个人中心请假申请） */
<template>
  <div>
    <!-- 申请原因 -->
    <van-radio-group v-model="status">
      <van-cell-group title="请假原因">
        <van-row>
          <van-col span="8">
            <van-cell title="代课" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1"></van-radio>
            </van-cell>
          </van-col>
          <van-col span="8">
            <van-cell title="调课" clickable @click="radio = '2'">
              <van-radio slot="right-icon" name="2" />
            </van-cell>
          </van-col>
          <van-col span="8">
            <van-cell title="调代课" clickable @click="radio = '3'">
              <van-radio slot="right-icon" name="3" />
            </van-cell>
          </van-col>
        </van-row>
      </van-cell-group>
    </van-radio-group>
    <!-- 选择课程picker -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="orders-o"
      :value="valcourse"
      placeholder="选择课程"
      @click="showPopupCourse = true"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showCourse" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-picker
          :columns="schedulues"
          show-toolbar
          @confirm="onPopupConfirmCourse"
          @cancel="showCourse=false"
        />
      </div>
    </van-popup>

    <!-- 选择老师Picker -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="contact"
      :value="valteacher"
      placeholder="选择调/代/调代课老师"
      @click="showTeacher = true"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showTeacher" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-picker
          :columns="teachers"
          show-toolbar
          @confirm="onPopupConfirmTeacher"
          @cancel="showTeacher=false"
          ref="teacher"
        />
      </div>
    </van-popup>

    <!-- 选择教室 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="friends-o"
      :value="valclassroom"
      placeholder="选择新的教室"
      @click="showClass = true"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showClass" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-picker
          :columns="classrooms"
          show-toolbar
          @cancel="showClass = false"
          @confirm="onPopupConfirmClass"
        />
      </div>
    </van-popup>

    <!-- 选择日期 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="underway-o"
      :value="valday"
      placeholder="选择新的上课日期"
      @click="showDay = true"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showDay" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-datetime-picker
          v-model="currentDate"
          :min-date="currentDate"
          type="date"
          @confirm="showDay=false"
          @cancel="showDay=false"
        />
      </div>
    </van-popup>
    <!-- 选择开始时间 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="underway-o"
      :value="valStart"
      placeholder="选择开始时间"
      error-message="选择开始时间"
      @click="showStart = true"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showStart" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-datetime-picker
          v-model="valStart"
          type="time"
          @confirm="showStart=false"
          @cancel="showStart=false"
        />
      </div>
    </van-popup>

    <!-- 选择结束时间 -->
    <van-field
      readonly
      clickable
      right-icon="arrow-down"
      left-icon="underway-o"
      :value="valEnd"
      placeholder="选择结束时间"
      error-message="选择结束时间"
      @click="showEnd = true"
      class="mb-1"
    />
    <!-- 底部弹出层 -->
    <van-popup v-model="showEnd" position="bottom" get-container="#app">
      <div class="area-wrapper">
        <van-datetime-picker
          v-model="valEnd"
          type="time"
          @confirm="showEnd=false"
          @cancel="showEnd=false"
        />
      </div>
    </van-popup>
    <div style="text-align:center">
      <van-row type="flex" justify="center">
        <van-col span="16">
          <van-button type="primary" block round @click="applyForAdjustSchedule">确认提交</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Field,
  Popup,
  Picker,
  DatetimePicker,
  Button,
  Toast
} from "vant";
import { leftPadZero } from "@/common/time";
import Vue from "vue";
Vue.use(Field)
  .use(Popup)
  .use(Picker)
  .use(DatetimePicker)
  .use(Button)
  .use(Row)
  .use(Col)
  .use(Cell)
  .use(CellGroup)
  .use(Radio)
  .use(RadioGroup)
  .use(Toast);
export default {
  name: "ApplyRequst",
  data() {
    return {
      showReason: false,
      showCourse: false,
      showTeacher: false,
      showClass: false,
      showDay: false,
      showStart: false,
      showEnd: false,
      valreason: "",
      valcourse: "",
      valteacher: "",
      valclassroom: "",
      plans: [],
      data: [],
      currentDate: new Date(),
      valStart: "12:00",
      valEnd: "12:00",
      status: 1,
      newTeacherId:0,
      newClassroomId:0,
      scheduleId:0
    };
  },
  computed: {
    valday: function() {
      return leftPadZero(
        `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() +
          1}-${this.currentDate.getDate()}`
      );
    },
    classrooms() {
      let rooms = [];
      if (this.data.classrooms) {
        for (let classroom of this.data.classrooms) {
          rooms.push(`${classroom.classroomName}(${classroom.seatNumber}人)`);
        }
      }
      return rooms;
    },
    teachers() {
      let teachers = [];
      if (this.data.teachers) {
        for (let teacher of this.data.teachers) {
          teachers.push(`${teacher.teacherName}`);
        }
      }
      return teachers;
    },
    schedulues() {
      let schedulues = [];
      if (this.data.teachSchedules) {
        for (let schedulue of this.data.teachSchedules) {
          schedulues.push(schedulue.className);
        }
      }
      return schedulues;
    }
  },
  methods: {
    onPopupConfirmCourse(value,index) {
      this.showCourse = false;
      this.valcourse = value;
      this.scheduleId = index;
    },
    onPopupConfirmTeacher(value,index) {
      this.showTeacher = false;
      this.valteacher = value;
      this.newTeacherId = index
    },
    onPopupConfirmClass(value,index) {
      this.showClass = false;
      this.valclassroom = value;
      this.newClassroomId = index
    },
    // 获取请假的配置项
    async getAdjustScheduleOption() {
      try {
        const res = await this.$api.user.getAdjustScheduleOption();
        this.data = res.data[0];
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    async applyForAdjustSchedule() {
      let data = {
        "scheduleId": this.data.schedulues[this.scheduleId].scheduleId,
        "newCourseDate": this.valday,
        "newCourseStartTime": this.valStart,
        "newCourseEndTime": this.valEnd,
        "newClassroomId": this.data.classrooms[this.newClassroomId].classroomId,
        "newTeacherId": this.data.teachers[this.newTeacherId].teacherId,
        "status": this.status,
      };
      let res = await this.$api.user.applyForAdjustSchedule(
        data,
        this.fileList[0]
      );
      if (res.data.code === 200) {
        this.fileList = [];
        Toast.success(res.data.msg);
      }
    }
  },
  created() {
    this.getAdjustScheduleOption();
  }
};
</script>


<style lang="scss" scoped>
.area-wrapper {
  background: $white;
}
.mb-1 {
  margin-bottom: 10px;
}
</style>
