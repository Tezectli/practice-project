//2020/4/10 邦 学生端课程表组件
<template>
  <div class="container">
    <div class="head" @click="showPicker=true">
      <div class="head-week">
        第{{week}}周
        <van-icon class="head-week__icon" name="arrow-down" />
      </div>
      <div class="head-period">{{otherInfo.academicName}}第{{otherInfo.termId}}学期</div>
    </div>
    <van-popup v-model="showPicker" position="bottom" get-container="#app">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        :default-index="week-1"
      />
    </van-popup>
    <div class="class-table">
      <div class="table-wrapper">
        <div class="tabel-container">
          <table>
            <thead>
              <tr>
                <th>{{`${month}月`}}</th>
                <th
                  v-for="(weekNum, weekIndex) in classTableData.courses.length"
                  :key="weekIndex"
                >{{'周' + $options.filters.digitalToChinese(weekIndex+1, 'week')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">
                <td>
                  <p>{{'第' + $options.filters.digitalToChinese(lessonIndex+1) + "节"}}</p>
                  <p class="period">{{ lesson.startTime }}</p>
                  <p class="period">~</p>
                  <p class="period">{{ lesson.endTime }}</p>
                </td>
                <td
                  v-for="(course, courseIndex) in classTableData.courses"
                  :key="courseIndex"
                  :style="$options.filters.radomColor(classTableData.courses[courseIndex][lessonIndex],courseIndex+lessonIndex)"
                >
                  {{classTableData.courses[courseIndex][lessonIndex].courseName || '-'}}
                  <br />
                  <br />
                  <span>{{classTableData.courses[courseIndex][lessonIndex].classroomName}}</span>
                  <br />
                  <br />
                  <span>{{classTableData.courses[courseIndex][lessonIndex].teacherName}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div style="height:50px"></div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Vue from "vue";
import { Cell, CellGroup, Row, Col, Icon, Picker, Popup } from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Row)
  .use(Col)
  .use(Icon)
  .use(Picker)
  .use(Popup);
export default {
  name: "TimeTable",
  data() {
    const defaultCourses = [new Array(7).fill(new Array(8).fill(""))];
    return {
      classTableData: {
        lessons: [
          //   "08:00-09:00",
          //   "09:00-10:00",
          //   "10:00-11:00",
          //   "11:00-12:00",
          //   "13:00-14:00",
          //   "14:00-15:00",
          //   "15:00-16:00",
          //   "16:00-17:00"
        ],
        courses: [].concat(defaultCourses)
      },
      schedule: [],
      map: new Map(),
      week: 0,
      month: "",
      showPicker: false,
      columns: [],
      value: "",
      otherInfo: []
    };
  },
  props: {
    role: {
      type: String,
      required: true
    }
  },
  methods: {
    //获取课程表信息
    async getTeachScheduleByWeek(week) {
      let res;
      if (!week) {
        res = await this.$api.course.getTeachScheduleByWeek();
      } else {
        res = await this.$api.course.getTeachScheduleByWeek(week);
      }
      this.formatData(res);
    },
    //教师课程表
    async getTeacherTimeTable(week) {
      try {
        let res;
        if (!week) {
          res = await this.$api.course.getTeacherTimeTable();
        } else {
          res = await this.$api.course.getTeacherTimeTable(week);
        }
        this.formatData(res);
      } catch (e) {
        // eslint-disable-next-line
        console.log("catch -> e", e);
      }
    },
    //获取周次
    async getWeekInfo() {
      try {
        let res = await this.$api.course.getWeekInfo();
        this.week = res.data[0].currentWeek;
        this.otherInfo = res.data[0];
        for (let i = 1; i <= res.data[0].allWeeks; i++) {
          this.columns.push(i);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("catch -> e", e);
      }
    },
    //课程映射
    classMap(courseTimeId) {
      let course = [...courseTimeId];
      let arr = [];
      course.forEach(item => {
        let key = item + "";
        let i = this.map.get(key);
        arr.push(i);
      });
      return arr;
    },
    formatData(res) {
      try {
        this.data = res;
        this.classTableData.lessons = res.standard;
        for (let i in res.standard) {
          let key = res.standard[i].courseTimeId + "";
          let value = i;
          this.map.set(key, value);
        }
        this.schedule = res.schedule;
        let course = this.classTableData.courses;
        for (let element of this.schedule) {
          let temp = {
            classroomName: element.classroomName,
            courseDate: element.courseDate,
            courseName: element.courseName,
            scheduleId: element.scheduleId,
            status: element.status,
            teacherName: element.teacherName
          };
          let arr = this.classMap(element.courseTimeId);
          for (let i in arr) {
            let index = parseInt(arr[i]);
            course[element.weekDay-1][index] = temp;
          }
        }
        this.classTableData.courses = course;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    onConfirm(value) {
      this.week = value;
      this.showPicker = false;
    }
  },
  filters: {
    //数字转换中文
    digitalToChinese(num, identifier) {
      const character = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ];
      return identifier === "week" && (num === 0 || num === 7)
        ? "日"
        : character[num];
    },
    radomColor(s, index) {
      if (!s) return s;
      const color = [
        "rgba(165,42,42,0.6)",
        "rgba(255,140,0,0.6)",
        "rgba(210,105,30,0.6)",
        "rgba(0,128,0,0.6)",
        "rgba(0,128,128,0.6)",
        "rgba(70,130,180,0.6)",
        "rgba(138,43,226,0.6)",
        "rgba(199,21,133,0.6)",
        "rgba(199,21,133,0.6)",
        "rgba(139,0,139,0.6)"
      ];
      let radomindex = (index * Math.floor(Math.random() * 10)) % 10;
      return { "background-color": color[radomindex] };
    }
  },
  mounted() {
    this.getWeekInfo();
    this.month = dayjs().month() + 1;
  },
  watch: {
    week() {
      this.classTableData.courses = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
      ];
      if (this.role === "student") {
        this.getTeachScheduleByWeek(this.week);
      } else {
        this.getTeacherTimeTable(this.week);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: white;
  height: 667px;
  width: 100%;
  // margin-top: 20px;
}
.head {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 0;
  background: #fafafa;
  box-shadow: 0px 1px 6px 0px rgba(81, 109, 245, 0.2);
  &-week {
    font-size: 16px;
    color: #333;
    margin-bottom: 6px;
    text-align: center;
    &__icon {
      margin-left: 6px;
      color: #aaa;
    }
  }
  &-period {
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }
}
.class-table {
  .table-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .tabel-container {
    table {
      table-layout: fixed;
      width: 100%;
      border-collapse: collapse;
      border: 0px solid #999;
      thead {
        background-color: white;
        th {
          color: #333;
          line-height: 17px;
          font-weight: normal;
          height: 30px;
          font-weight: 900;
        }
      }
      tbody {
        background-color: white;
        border-collapse: collapse;
        td {
          line-height: 12px;
          padding: 0;
          border-radius: 5px 5px 5px 5px;
          color: white;
        }
      }
      th,
      td {
        width: 30px;
        font-size: 12px;
        text-align: center;
        padding: 0;
      }

      tr td:first-child {
        color: #333;
        background-color: white;
        font-weight: 600;
        .period {
          font-size: 8px;
        }
      }
    }
  }
}
</style>