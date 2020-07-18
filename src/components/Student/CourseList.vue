/* 选课模块的流 -润 2019/12/5 重构 */
<template>
  <div class="courseList">
    <course-card v-for="course of limitList" :key="course.classId" :course="course" :gradeId="gradeId" />
  </div>
</template>
<script>
import Vue from "vue";
import CourseCard from "@/components/Student/CourseCard";
import dayjs from "dayjs";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "CourseList",
  components: {
    "course-card": CourseCard
  },
  //获取父组件传来的关键词
  props: {
    keyword: {
      required: false,
      type: String,
      default: ""
    },
    minPrice: {
      required: false,
      type: Number,
      default: 0
    },
    maxPrice: {
      required: false,
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    courseType: {
      required: true,
      type: Array
    },
    interestType: {
      required: true,
      type: Array
    },
    grade: {
      required: true,
      type: Array
    },
    time: {
      required: true,
      type: Array
    },
    date: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      list: [],
      show: false,
      msg: "",
      gradeId: 0
    };
  },
  computed: {
    limitList() {
      // 第一次都是全部的时候不做循环
      if (
        !this.interestType.length &&
        !this.courseType.length &&
        !this.grade.length &&
        !this.time.length &&
        !this.date.length
      ) {
        return this.list;
      }
      return this.list.filter(course => {
        let status = true;
        // 判断兴趣类型
        if (this.interestType.length) {
          status = this.interestType.includes(course.interestType);
        }
        // 判断课程类型
        if (this.courseType.length) {
          status = this.courseType.includes(course.courseType);
        }
        // 判断适合年龄段
        if (this.grade.length) {
          status = this.grade.some(grade => course.gradeList.includes(grade));
        }
        // 判断上课时间
        if (this.date.length) {
          status = this.date.some(date => {
            if (null == course.regularTimeDto) {
              return false;
            } else {
              // 0是周日
              return date == dayjs(course.regularTimeDto.courseStartDate).day()
                ? true
                : false;
            }
          });
        }
        // 判断上课时段
        if (this.time.length) {
          const timeMap = {
            "0": "06:00",
            "1": "13:00",
            "2": "18:00"
          };
          status = this.time.some(time => {
            if (null == course.regularTimeDto) {
              return false;
            } else {
              // 课程开始时间的dayjs对象,dayjs对象都需要补足日期，否则计算结果会跟预期的不一样
              const courseStart = dayjs(
                `2019-12-01 ${course.regularTimeDto.courseStartTime}`
              );
              // 当前循环中时段对应时间
              const timeStart = dayjs(`2019-12-01 ${timeMap[time]}`);
              // 下一个时段的开始时间，不存在就选晚上
              const nextTimeStart =
                typeof timeMap[Number(time) + 1] == undefined
                  ? dayjs(`2019-12-01 ${timeMap[2]}`)
                  : // 小心对应的key被加成'11'而不是2，所以需要转换
                    dayjs(`2019-12-01 ${timeMap[Number(time) + 1]}`);
              // 课程开始时间早于时段时间，不早下一时段时间都不属于范围内
              if (
                courseStart.isBefore(timeStart) ||
                courseStart.isAfter(nextTimeStart)
              ) {
                return false;
              } else {
                return true;
              }
            }
          });
        }
        return status;
      });
    }
  },
  methods: {
    //   获取对应的props列表
    async getCourseList() {
      try {
        let res = await this.$api.course.getCourseList(
          this.keyword,
          this.minPrice,
          this.maxPrice
        );
        this.list = res.data;
        !res.data.length && Toast("暂无相关课程");
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    },
    // 学生基本信息接口
    async getStudentInfo() {
      try {
        // 获取学生信息列表
        let res = await this.$api.user.getStudentInfo();
        this.gradeId = res.gradeId;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    }
  },
  created() {
    this.getStudentInfo();
    this.getCourseList();
  },
  watch: {
    //   监听对应props的变化，刷新列表
    keyword: function() {
      this.getCourseList();
    },
    minPrice: function(newMinPrice) {
      newMinPrice && this.getCourseList();
    },
    maxPrice: function(newMaxPrice) {
      newMaxPrice && this.getCourseList();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
