/* 考勤总览组件 */
<template>
  <div>
    <ve-line
    class="chart"
    height="64vw"
    :data="chartData"
    :settings="chartSettings"
    :grid="grid"
    :extend="extend"
    />
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item :title="`课次${item.classNumber}`"  v-for="(item,key) of data" :key="key">
        <van-cell title="应到人数" :value=item.shoulStudentdNumber  />
        <van-cell title="实到人数" :value=item.actualStudentNumber  />
        <van-cell title="缺席人数" :value=item.absentStudentNumber  />
        <van-cell title="缺席成员" >
          <van-row v-if="data.absentStudent">
            <van-col style="margin-right:3px" v-for="(item,index) of data.absentStudent" :key="index"><van-tag type="danger" size="medium">{{item}}</van-tag></van-col>
          </van-row>
          <span v-else>暂无缺席成员</span>
        </van-cell>
        <van-cell title="班级名" :value=item.className  />
        <van-cell title="课程日期" :value=item.arriveDate  />
        <van-cell title="课程开始时间" :value=item.courseStartTime  />
        <van-cell title="课程结束时间" :value=item.courseEndTime  />
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { Cell, CellGroup, Tag,Collapse, CollapseItem,Row, Col  } from "vant";
import Vue from "vue";
import VeLine from "v-charts/lib/line.common";
Vue.component(VeLine.name, VeLine);
Vue.use(Cell)
  .use(CellGroup)
  .use(Tag)
  .use(Collapse)
  .use(CollapseItem)
  .use(Row)
  .use(Col)
export default {
  name: "TotalMember",
  data() {
    this.grid = {
      top: "20%",
      left: "4%",
      right: "4%",
      bottom: "1%",
      backgroundColor: "#fff"
    };
    this.chartSettings = {
      area: true,
      xAxisType: "category",
      //   axisSite: { right: ["到勤率"] },
      yAxisType: ["percent"],
      areaStyle: {
        opacity: 0.85,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#DFFFCD" // 0% 处的颜色
            },
            {
              offset: 0.48,
              color: "#90F9C4"
            },
            {
              offset: 1,
              color: "#39F3BB" // 100% 处的颜色
            }
            // background-image: linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%);
          ],
          global: false // 缺省为 false
        }
      }
    };
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    };
    return {
      data: [],
      classNumber: "",
      shoulStudentdNumber: "",
      actualStudentNumber: "",
      activeNames:"1"
    };
  },
  props: {
    classId: {
      type: String,
      required: true
    }
  },
  computed: {
    chartData() {
      // const len = this.data.length
      return {
        columns: ["课次", "到勤率"],
        // 太多了显示很难看，这里截取最近的十次课作为展示
        rows: this.data
          // .slice(len > 10 ? -10 : len * -1)
          .slice(0,5)
          .map(item => {
            return {
              // 转中文键名省去静态设置labelMap
              //   此时使用空格阻止插件将其识别为数字
              课次: ` ${item.classNumber}`,
              到勤率: parseFloat(
                item.actualStudentNumber / item.shoulStudentdNumber
              ).toFixed(2)
            };
          })
      };
    }
  },
  methods: {
    async getAttendanceByClassId() {
      try {
        const res = await this.$api.attendance.getAttendanceByClassId(
          this.classId
        );
        this.data = res.data;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  },
  created() {
    this.getAttendanceByClassId();
  },
  watch: {
    classId: function() {
      this.getAttendanceByClassId();
      this.data = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.chart {
  margin-top: 10px;
  background: #fff;
}
</style>
