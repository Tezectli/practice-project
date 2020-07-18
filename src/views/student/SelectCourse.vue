// 网上选课页面 -润 2019/12/6重构
<template>
  <div>
    <van-sticky>
      <!-- 顶部栏 -->
      <nav-bar title="选课"/>
      <van-row type="flex">
        <van-col span="20" class="col">
          <!-- 课程关键字搜索框 -->
          <form action="/">
            <van-search placeholder="搜索课程" shape="round" v-model="keyword"/>
          </form>
        </van-col>
        <van-col span="4" class="col">
          <!-- 筛选器按钮 -->
          <div class="btn-order">
            <div @click="showFilter=true" style="font-weight: 550;color: #0c48fd">
              <van-icon name="filter-o"/>筛选
            </div>
          </div>
        </van-col>
      </van-row>
    </van-sticky>
    <!-- 筛选器弹窗 -->
    <van-popup
      v-model="showFilter"
      position="right"
      :style="{ height: '100%',width: '80%'}"
      ref="filter"
    >
      <van-cell-group title="价格区间（含）">
        <van-row type="flex">
          <van-col span="11">
            <!-- 最低价格 -->
            <van-field
              v-model="minPrice"
              placeholder="最低"
              left-icon="balance-o"
              @input="minPrice=minPrice.replace(/[^\d]/g,'')"
            />
          </van-col>
          <van-col span="2">
            <span class="spline">-</span>
          </van-col>
          <van-col span="11">
            <!-- 最高价格 -->
            <van-field
              v-model="maxPrice"
              placeholder="最高"
              @input="maxPrice=maxPrice.replace(/[^\d]/g,'')"
            />
          </van-col>
        </van-row>
      </van-cell-group>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="课程类型" name="courseType">
          <!-- 目标课程类型 -->
          <van-checkbox-group v-model="courseType">
            <van-cell-group>
              <van-row>
                <van-col span="8" v-for="(item, index) in courseTypeOption" :key="item">
                  <van-cell
                    clickable
                    :title="item.text"
                    @click="toggle('checkboxesCourseType',index)"
                  >
                    <van-checkbox
                      :name="item.value"
                      ref="checkboxesCourseType"
                      slot="right-icon"
                      icon-size="15"
                      checked-color="#1ab394"
                    />
                  </van-cell>
                </van-col>
              </van-row>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
        <van-collapse-item title="兴趣类型" name="interestType" v-show="showInterestType">
          <!-- 目标兴趣类型 -->
          <van-checkbox-group v-model="interestType">
            <van-cell-group>
              <van-row>
                <van-col span="12" v-for="(item, index) in interestTypeOption" :key="item">
                  <van-cell
                    clickable
                    :title="item.text"
                    @click="toggle('checkboxesInterestType',index)"
                  >
                    <van-checkbox
                      :name="item.value"
                      ref="checkboxesInterestType"
                      slot="right-icon"
                      icon-size="15"
                      checked-color="#1ab394"
                    />
                  </van-cell>
                </van-col>
              </van-row>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
        <van-collapse-item title="适合年龄段" name="grade">
          <!-- 目标年龄段 -->
          <van-checkbox-group v-model="grade">
            <van-cell-group>
              <van-row>
                <van-col span="8" v-for="(item, index) in gradeOption" :key="item">
                  <van-cell clickable :title="item.text" @click="toggle('checkboxesGrade',index)">
                    <van-checkbox
                      :name="item.value"
                      ref="checkboxesGrade"
                      slot="right-icon"
                      icon-size="15"
                      checked-color="#1ab394"
                    />
                  </van-cell>
                </van-col>
              </van-row>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
        <van-collapse-item title="上课时段" name="time">
          <!-- 上课时间段 -->
          <van-checkbox-group v-model="time">
            <van-cell-group>
              <van-row>
                <van-col span="8" v-for="(item, index) in timeOption" :key="item">
                  <van-cell clickable :title="item.text" @click="toggle('checkboxesTime',index)">
                    <van-checkbox
                      :name="item.value"
                      ref="checkboxesTime"
                      slot="right-icon"
                      icon-size="15"
                      checked-color="#1ab394"
                    />
                  </van-cell>
                </van-col>
              </van-row>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
        <van-collapse-item title="上课时间" name="date">
          <!-- 上课时间段 -->
          <van-checkbox-group v-model="date">
            <van-cell-group>
              <van-row>
                <van-col span="8" v-for="(item, index) in dateOption" :key="item">
                  <van-cell clickable :title="item.text" @click="toggle('checkboxesDate',index)">
                    <van-checkbox
                      :name="item.value"
                      ref="checkboxesDate"
                      slot="right-icon"
                      icon-size="15"
                      checked-color="#1ab394"
                    />
                  </van-cell>
                </van-col>
              </van-row>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
      </van-collapse>
      <div class="btnBox">
        <button class="filter_btn" id="refreshBtn" @click="reset">重置</button>
        <button class="filter_btn" id="submitBtn" @click="showFilter=false">确定</button>
      </div>
    </van-popup>
    <!-- 课程列表 -->
    <course-list
      :keyword="keyword"
      :courseType="courseType"
      :interestType="actualInterestType"
      :grade="grade"
      :time="time"
      :date="date"
      :minPrice="minPrice"
      :maxPrice="maxPrice"
    />
    <div id="loading">
      <van-loading type="spinner" color="#1989fa" size="28" vertical>正在加载选课列表...</van-loading>
    </div>
    <div style="height:30px"></div>
  </div>
</template>

<script>
import Vue from "vue";
import NavBar from "@/components/NavBar";
import CourseList from "@/components/Student/CourseList";
import {
  Search,
  Toast,
  Sticky,
  Row,
  Col,
  Cell,
  Field,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapseItem,
  Loading
} from "vant";
import { setTimeout } from "timers";

Vue.use(Search)
  .use(Row)
  .use(Col)
  .use(Toast)
  .use(Sticky)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Cell)
  .use(Field)
  .use(CellGroup)
  .use(Collapse)
  .use(CollapseItem)
  .use(Loading);
export default {
  name: "SelectCourse",
  components: {
    "course-list": CourseList,
    "nav-bar": NavBar
  },
  data() {
    return {
      filter: null, //筛选器的ref实例
      keyword: "", // 搜索关键词
      minPrice: undefined, // 课程的目标最小价
      maxPrice: undefined, // 课程的目标最高价
      showFilter: false, // 筛选器弹窗的flag
      courseType: [], // 筛选器目标课程类型
      interestType: [], // 筛选器目标兴趣类型
      grade: [], // 年级
      time: [], // 上课时间段
      date: [], // 上课日期
      activeNames: ["courseType", "interestType"], // 折叠面板的展开项
      courseTypeOption: [
        { text: "研学", value: 0 },
        { text: "实践", value: 1 },
        { text: "服务", value: 2 },
        { text: "兴趣", value: 3 }
      ], // 课程的所有类型
      interestTypeOption: [
        // { text: "非兴趣", value: 0 },
        { text: "科学益智类", value: 1 },
        { text: "书法绘画类", value: 2 },
        { text: "舞蹈体育类", value: 3 },
        { text: "音乐艺术类", value: 4 },
        { text: "综合语言类", value: 5 }
      ], // 课程的所有兴趣类型
      gradeOption: [
        { text: "成人", value: "0" },
        { text: "一年级", value: "1" },
        { text: "二年级", value: "2" },
        { text: "三年级", value: "3" },
        { text: "四年级", value: "4" },
        { text: "五年级", value: "5" },
        { text: "六年级", value: "6" },
        { text: "七年级", value: "7" },
        { text: "八年级", value: "8" },
        { text: "九年级", value: "9" },
        { text: "小班", value: "10" },
        { text: "中班", value: "11" },
        { text: "大班", value: "12" }
      ], // 课程的所有年级段类型
      timeOption: [
        { text: "上午", value: "0" },
        { text: "下午", value: "1" },
        { text: "晚上", value: "2" }
      ], // 上课时间段
      dateOption: [
        { text: "周一", value: "1" },
        { text: "周二", value: "2" },
        { text: "周三", value: "3" },
        { text: "周四", value: "4" },
        { text: "周五", value: "5" },
        { text: "周六", value: "6" },
        { text: "周日", value: "0" }
      ] //上课日期周几
    };
  },
  computed: {
    // 因为兴趣类型是课程类型-兴趣的子类型，所以只在选择课程类型"兴趣"后才会出现对应的interestType
    actualInterestType() {
      // 此处通过确认是否选中了兴趣确认传入子组件的兴趣条件数据
      if (this.courseType.includes(3)) {
        return this.interestType;
      } else {
        return [];
      }
    },
    // 是否显示兴趣类型的筛选条件的flag
    showInterestType() {
      return this.courseType.includes(3);
    }
  },
  methods: {
    // 控制对应的checkbox实例状态
    toggle(ref, index) {
      this.$refs[ref][index].toggle();
    },
    reset(){
      this.courseType = []
      this.interestType = []
      this.grade = []
      this.time = []
      this.date = []
    } 
  },
  mounted() {
    this.filter = this.$refs.filter;
    setTimeout(function() {
      document.getElementById("loading").style.display = "none";
    }, 8000);
  }
};
</script>
<style lang="scss" scoped>
.btn-order {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.spline {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#loading {
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnBox {
  margin-top: 30px;
  margin-right: 16px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;
}
.filter_btn {
  padding: 6px 18px;
  border: none;
}
#refreshBtn {
  border-radius: 15px 0 0 15px;
}
#submitBtn {
  background: rgb(28, 131, 199);
  color: #fff;
  border-radius: 0 15px 15px 0;
}
</style>