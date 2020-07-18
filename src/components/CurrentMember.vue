/* 当前考勤组件 */
<template>
  <div>
    <time-picker :classId="classId" v-model="time" class="mb-1" @change="getStudentsAttendance" />
    <ve-histogram
      :data="chartData"
      height="40vw"
      :grid="grid"
      :data-empty="dataEmpty"
      class="empty"
      :settings="chartSettings"
    ></ve-histogram>
    <van-panel title="缺席人员：" class="panel">
      <van-row>
        <van-col span="6" v-for="(item,key) of member.absentStudent" :key="key">
          <van-cell>
            <div class="tag-wrapper">
              <van-tag plain type="danger">{{item.studentName}}</van-tag>
            </div>
          </van-cell>
        </van-col>
      </van-row>
    </van-panel>
  </div>
</template>

<script>
import TimePicker from "@/components/TimePicker";
import {
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Image,
  Panel,
  Tag,
  Row,
  Col
} from "vant";
import Vue from "vue";
import histogram from "v-charts/lib/histogram.common";
Vue.component(histogram.name, histogram);

Vue.use(Cell)
  .use(CellGroup)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(Panel)
  .use(Tag)
  .use(Row)
  .use(Col);
export default {
  name: "CurrentMember",
  components: {
    "time-picker": TimePicker
  },
  data() {
    this.grid = {
      top: "20%",
      left: "4%",
      right: "4%",
      bottom: "1%",
      backgroundColor: "#fff"
    };
    this.chartSettings = {
      //   axisSite: { right: ["到勤率"] },
      itemStyle: {
        barWidth: 10
      }
    };
    this.radius = ["50%", "50%"];
    return {
      time: "",
      member: [],
      chartData: {
        columns: [],
        rows: []
      },
      dataEmpty: false
    };
  },
  props: {
    classId: {
      type: String,
      required: true
    }
  },
  methods: {
    async getStudentsAttendance(date, time) {
      try {
        this.member = [];
        const res = await this.$api.attendance.getStudentsAttendance(
          this.classId,
          date,
          time
        );
        this.member = res.data[0];
        if (res.data.length) {
          this.chartData = {
            columns: ["标题", "应到", "实到", "缺席"],
            rows: [
              {
                标题: "考勤数据",
                应到: this.member.shoulStudentdNumber,
                实到: this.member.actualStudentNumber,
                缺席: this.member.absentStudentNumber
              }
            ]
          };
          this.dataEmpty = false;
        } else {
          this.dataEmpty = true;
          this.chartData = {
            columns: [],
            rows: []
          };
        }
      } catch (e) {
        this.dataEmpty = true;
        this.chartData = {
          columns: [],
          rows: []
        };
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
.mb-1 {
  margin-bottom: 10px;
}
.grid-title {
  font-size: 85%;
  font-weight: 600;
  margin-top: 5px;
}
.panel {
  height: 350px;
  .tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
.tag-wrapper {
  width: 100%;
  @include m-auto;
  display: inline-flex;
  text-align: center;
}
.empty /deep/ .v-charts-data-empty {
  margin-top: -100px;
  margin-left: 40%;
}
</style>
