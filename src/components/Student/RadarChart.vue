<template>
  <div>
    <div class="chart-wrapper">
      <ve-radar
        :data="chartData"
        :legend-visible="false"
        :settings="chartSettings"
        :radar="radarOption"
      />
    </div>
    <van-grid :column-num="3">
      <van-grid-item v-for="item of gridItems" :key="item.icon">
        <div class="grid-score">
          <svg class="color-icon icon" aria-hidden="true">
            <use :xlink:href="item.icon"/>
          </svg>
          {{item.score}}
        </div>
        <span class="grid-desc">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import Vue from "vue";
import { Grid, GridItem } from "vant";
import VeRadar from "v-charts/lib/radar";
Vue.use(Grid).use(GridItem);
Vue.component(VeRadar.name, VeRadar);
export default {
  name: "RadarChart",
  props: {
    classId: {
      type: String,
      required: true
    },
    week: {
      type: Number,
      required:true
    }
  },
  data() {
    this.chartSettings = {
      lineStyle: {
        width: 0.1
      },
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
    return {
      // 表格
      chartData: {},
      score: []
    };
  },
  // 创建图
  created() {
    this.classId && this.week && this.initRadar();
  },
  computed: {
    // 监听维度数据，动态创建维度
    radarOption() {
      let chartArr = this.chartData.columns || [];
      //移除作为坐标轴的班级
      chartArr.shift();
      // 映射成需要的radarOption
      return {
        indicator: chartArr.map(item => ({ name: item, max: 100 }))
      };
    },
    // 监听维度数据，动态创建gridItem
    gridItems() {
      // 可使用的icon列表
      const iconArr = [
        "calligraphy",
        "crown",
        "notebook1",
        "Launch",
        "keyanxiangmu",
        "metal",
        "Businesssolutions"
      ];
      // 深拷贝图的数据对象
      let chartObj = this.chartData.rows ? this.chartData.rows[0] : {};
      // 对象中的键值对遍历
      let keyArr = Object.keys(chartObj) || [];
      let valArr = Object.values(chartObj) || [];
      keyArr.shift();
      valArr.shift();
      return keyArr.map((item, index) => ({
        name: item,
        score: valArr[index],
        icon: '#zhsj-icon-' + iconArr[index]
      }));
    }
  },
  methods: {
    // 获取雷达图数据
    async initRadar() {
      try {
        const res = await this.$api.chart.initRadar(this.classId,this.week);
        const data = {
          columns: ["班级"],
          rows: []
        };
        let obj = { classId: this.classId };
        for (let i of res.statisticsEntityList) {
          data.columns.push(i.name);
          obj[i.name] = i.num;
          this.score.push(i.num);
        }
        data.rows.push(obj);
        this.chartData = data;
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    }
  },
  watch: {
    classId() {
      this.week&&this.initRadar();
    },
    week(){
      this.classId&&this.initRadar();
    }
  }
};
</script>
<style lang="scss" scoped>
.icon {
  width: 25px;
  height: 25px;
}
.grid-score {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  // color:#39F3BB;
  color: #fff;
  margin-bottom: 10px;
  background-image: linear-gradient(
    -225deg,
    #dfffcd 0%,
    #90f9c4 48%,
    #39f3bb 100%
  );
}
.grid-desc {
  vertical-align: middle;
  font-size: 18px;
}
</style>
