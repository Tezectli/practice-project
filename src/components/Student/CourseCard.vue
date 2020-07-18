<template>
  <div class="card">
    <!-- 显示的卡片本体 -->
    <van-card
      class="card-itself price num"
      :num="course.remain"
      :price="[course.coursePrice > 0 ? course.coursePrice: '免费']"
      :title="course.className"
      :thumb="imgUrl"
      :key="course.classId"
      @click="getClassInfo(course.classId)"
    >
      <div slot="tags" style="margin-bottom:5px;">
        <van-tag type="primary" round>{{courseType}}</van-tag>&nbsp;
        <van-tag type="primary" round>{{interestType}}</van-tag>
      </div>
      <div slot="tags">
        <span style="color:#888888">{{payTime}}</span>
      </div>
    </van-card>
    <!-- 详情弹窗 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">
      <div class="head-board">
        <van-image width="100%" height="50vw" :src="imgUrl"/>
        <div class="head-board__title van-ellipsis">
          {{course.className}}
          <span
            style="font-size:75%;text-align: end;"
          >/{{claMsg.teacherName || '未知'}}</span>
        </div>
      </div>
      <van-tabs v-model="activeName" color="#3366ff" line-height="3px" sticky>
        <van-tab title="课程简介">
          <div class="msg_board">
            <div class="msg_box">
              <div style="color:#818181;font-size:14px">
                <van-icon name="newspaper-o"/>&nbsp;类型：
                <van-tag plain type="primary" size="large">{{courseType}}</van-tag>&nbsp;
                <van-tag plain type="warning" size="large">{{interestType}}</van-tag>
              </div>
              <div>
                <div style="color:#818181;font-size:14px;margin-top:5px">
                  <van-icon name="wap-home-o"/>&nbsp;适用阶段：
                  <div class="box_other__holder" v-for="item of gradeList" :key="item">
                    <van-tag style="color:#256bf6;font-size:13px">{{item}}</van-tag>&nbsp;
                  </div>
                </div>
              </div>
            </div>
            <div style="margin:20px 0 0 10px;">
              <div class="title">课程任务</div>
              <div class="box_other">
                <p style="color: #666;">{{course.courseMission || '未知'}}</p>
              </div>
              <div class="title">课程目标</div>
              <div class="box_other">
                <p style="color: #666;">{{course.courseTarget || '未知'}}</p>
              </div>
              <div class="title">课程描述</div>
              <div class="box_other">
                <p style="color: #666;">{{course.courseExplanation || '未知'}}</p>
              </div>
              <div class="title">课程准备</div>
              <div class="box_other">
                <p style="color: #666;">{{course.coursePrepare || '未知'}}</p>
              </div>
              <div style="height:50px"></div>
            </div>
          </div>
        </van-tab>
        <van-tab title="时间" @click="onClick">
          <div class="msg_board" style="margin:10px">
            <div class="title">支付时间</div>
            <div class="box_other">
              <p style="color: #666;">{{payTime}}</p>
            </div>
            <div class="title">时间安排</div>
            <div class="titletime">第一学段</div>
            <div v-if="!course.regularTimeDto" class="courseSchedule">暂无第一学段安排</div>
            <div v-else-if="course.regularTimeDto" class="courseSchedule">
              <div
                class="time"
              >开班时间：{{course.regularTimeDto.courseStartDate}}~{{course.regularTimeDto.courseEndDate}}</div>
              <div class="time">
                上课时间：{{course.regularTimeDto.courseStartTime}}~{{course.regularTimeDto.courseEndTime}}
                <van-tag type="primary" size="medium">{{ weekList }}</van-tag>
              </div>
              <div class="time">教室：{{course.regularTimeDto.regularClassRoom}}</div>
            </div>
            <div class="titletime">第二学段</div>
            <div v-if="course.otherTimeDto.length==0" class="courseSchedule">暂无第二学段安排</div>
            <div v-else-if="course.otherTimeDto" class="courseSchedule">
              <div
                class="time"
              >开班时间：{{course.otherTimeDto[0].courseStartDate}}~{{course.otherTimeDto[0].courseEndDate}}</div>
              <div
                class="time"
              >上课时间：{{course.otherTimeDto[0].courseStartTime}}~{{course.otherTimeDto[0].courseEndTime}}</div>
              <div class="time">教室：{{course.otherTimeDto[0].otherClassRoom}}</div>
            </div>
          </div>
        </van-tab>
        <div style="height: 50px"></div>
      </van-tabs>
      <van-submit-bar
        :price="course.coursePrice*100"
        button-text="加入购物车"
        :disabled="!course.fitGradeId.includes(gradeId)"
        @submit="createPay"
        id="button"
      />
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Card,
  Button,
  Tag,
  Toast,
  Dialog,
  Popup,
  Lazyload,
  SubmitBar,
  Tab,
  Tabs,
  Collapse,
  CollapseItem,
  Image
} from "vant";
import {
  interestTypeMap,
  courseTypeMap,
  gradeMap,
  weekMap
} from "@/common/keyMap";
Vue.use(Card)
  .use(Button)
  .use(Tag)
  .use(Toast)
  .use(Dialog)
  .use(Popup)
  .use(SubmitBar)
  .use(Tab)
  .use(Tabs)
  .use(Collapse)
  .use(CollapseItem)
  .use(Image)
  .use(Lazyload);
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      required: true
    },
    gradeId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      show: false,
      activeNames: ["1"],
      claMsg: {}
    };
  },
  computed: {
    // 课程类型文字
    courseType() {
      return courseTypeMap[this.course.courseType];
    },
    // 兴趣类型文字
    interestType() {
      return interestTypeMap[this.course.interestType];
    },
    // 支付时间
    payTime() {
      return `${this.course.payStartTime}~${this.course.payEndTime}`;
    },
    // 图片
    imgUrl() {
      return `https://zhsj.bnuz.edu.cn/ComprehensiveSys/${
        this.course.courseImgUrl
      }`;
    },
    // 星期映射
    weekList() {
      return weekMap[this.course.regularTimeDto.week[0]];
    },
    // 适用年级映射
    gradeList() {
      let arr = this.course.fitGradeId.split(",");
      return arr.map(grade => gradeMap[grade]);
    }
  },
  methods: {
    // 创建课程订单
    async createPay() {
      try {
        await this.$api.pay.createOrder(
          this.course.classId,
          this.course.coursePrice
        );
        this.askForJump();
      } catch (e) {
        // Toast("请确认已经微信登录");
        // eslint-disable-next-line
        console.log(e);
      }
    },
    // 获取单个班级详细信息
    async getClassInfo(classId) {
      try {
        let res = await this.$api.course.getCourseMsg(classId);
        this.claMsg = res;
        this.show = true;
      } catch (e) {
        Toast("获取班级信息失败");
        // eslint-disable-next-line
        console.log(e);
      }
    },
    // 创建订单后询问是否跳转
    askForJump() {
      Dialog.confirm({
        title: "成功加入购物车",
        message: "是否立即前往确认?"
      }).then(() => {
        // on confirm
        this.$router.push("/s/myOrder");
      });
    }
  },
  created() {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 15px;
  &-itself {
    background: #fff;
  }
}
.van-card {
  &__title {
    font-size: 120%;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__bottom {
    margin-top: 10px;
    font-size: 120%;
  }
  &__content {
    margin-bottom: 10px;
  }
}
#courseTag {
  background: #256bf6;
  padding: 5px;
  color: #fff;
  font-size: 13px;
}
#interestTag {
  background: #256bf6;
  padding: 5px;
  color: #fff;
  font-size: 13px;
}
.title {
  color: #3366ff;
  font-weight: bold;
  padding-left: 2px;
  border-bottom: 1px solid #f3f2f2;
}
.msg_box {
  margin: 18px;
  padding: 6px;
  border: 1px solid #bababa;
  border-radius: 5px;
}
.time {
  margin: 3px 0;
}
.head-board {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 130%;
  font-weight: bold;
  &__title {
    width: 100%;
    position: absolute;
    top: 38vw;
    box-sizing: border-box;
    padding: 10px 0;
    background: rgba(#333, 0.7);
    color: #f3f2f2;
    overflow: hidden;
  }
}
.box_other__holder {
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
}
/deep/.van-tabs--card > .van-tabs__wrap {
  height: 44px;
}
.van-tag--default {
  background-color: white;
}
/deep/.van-tabs__nav--card .van-tab {
  background-color: #f3f2f2;
  line-height: 44px;
}
/deep/.van-tabs__nav--card {
  box-sizing: border-box;
  height: 44px;
  width: 100%;
  border-radius: 2px;
  border: 0;
  margin: 0px 0 0 0;
}
.content {
  font-size: 13px;
  color: #707070;
}
.van-submit-bar__price {
  color: black;
  font-weight: 500;
  font-size: 14px;
}
/deep/.van-submit-bar__button {
  width: 100px;
  height: 50px;
  font-weight: 500;
  line-height: 50px;
  border: 0;
  background: #1661f6;
  border-radius: 0;
}
.van-submit-bar__bar {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
  height: 50px;
  padding: 0;
  font-size: 14px;
}
.price /deep/ .van-card__price {
  color: black;
}
.num /deep/ .van-card__num {
  color: blue;
  margin-right: 170px;
}
.titletime {
  margin: 3% 2%;
  color: #9b9b9b;
  padding-left: 2px;
  font-weight: 0;
}
/deep/.van-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0 0 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  border: 1px solid #dadada;
  border-radius: 10px;
  margin-top: -10px;
}
.box_other {
  padding: 3px;
  background: #fff;
  margin: 0 auto;
}
.courseSchedule {
  padding: 3%;
  // background: #f0f2ff;
  border: 1px solid #dbe7ff;
  color: #727272;
  border-radius: 9px;
}
</style>
