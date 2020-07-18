<template>
  <div>
    <van-cell-group>
      <van-cell
        is-link
        v-for="(item,index) of data"
        :key="index"
        title-style="color:#78909c;font-size:15px"
        @click="showPopup(item.status,item)"
      >
        <div slot="title">
          <van-tag size="medium" type="success" plain v-if="item.kind">{{item.kind}}</van-tag>
          {{`${item.date} ${item.className}`}}
        </div>
        <van-tag size="medium" type="success" plain>{{item.time}}</van-tag>
      </van-cell>
    </van-cell-group>
    <van-popup
      v-model="showInfo"
      closeable
      close-icon="close"
      position="bottom"
      get-container="#app"
    >
      <van-cell-group>
        <van-cell title="课程名" :value="course.className" />
        <van-cell title="上课日期" :value="actualDate" />
        <van-cell title="上课地点" :value="place" />
        <div v-if="status == 1">
          <van-cell title="代课老师" :value="course.newTeacherName" />
        </div>
        <div v-if="status == 2">
          <van-cell title="新上课时间" :value="`${course.newCourseStartTime} ${newCourseEndTime}`" />
        </div>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, Icon,Tag, Popup } from "vant";
import { deleteSec, deleteYear } from "@/common/time";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Tag)
  .use(Popup);
export default {
  name: "TimeTable",
  data() {
    return {
      data: [],
      showInfo: false,
      status: 0,
      course: {}
    };
  },
  computed: {
    place() {
      if (this.status == 2 && this.course.newClassroomName) {
        return this.course.newClassroomName;
      }
      return this.course.classroomName;
    },
    actualDate() {
      if (this.status != 2) {
        return this.course.date;
      }
      return this.course.newCourseDate;
    }
  },
  methods: {
    async getTimeTable() {
      try {
        let res = await this.$api.course.getTimeTable();
        const statusMap = {
          "0": "",
          "1": "代",
          "2": "调"
        };
        this.data = res.data.map(course => {
          course.kind = statusMap[course.status];
          course.date = deleteYear(course.courseDate);
          course.time = `${deleteSec(course.courseStartTime)}~${deleteSec(
            course.courseEndTime
          )}`;
          return course;
        });
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    showPopup(status, item) {
      this.showInfo = true;
      this.status = status;
      this.course = item;
    }
  },
  mounted() {
    this.getTimeTable();
  }
};
</script>

<style lang="scss" scoped>
</style>