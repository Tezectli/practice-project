/*用于课程内容的组件*/
<template>
  <div class="course">
    <van-cell-group class="mt-1">
      <van-cell class="course-description">
        <van-row>
          <van-tag type="success" size="large" color="#1ab394">课程简介</van-tag>
        </van-row>
        <van-row class="mt-1">
          <van-icon class="course-description-icon" name="orders-o" size="14" />
          <span class="course-description-title">课程任务</span>
        </van-row>
        <van-row>
          <van-field v-model="task" type="textarea" rows="3" autosize clearable />
        </van-row>
        <van-row>
          <van-icon name="star-o" size="14" />
          <span class="course-description-title">课程目标</span>
        </van-row>
        <van-row>
          <van-field v-model="target" type="textarea" rows="3" autosize clearable />
        </van-row>
        <van-row>
          <van-icon name="todo-list-o" size="14" />
          <span class="course-description-title">课程准备</span>
        </van-row>
        <van-row>
          <van-field v-model="prepare" type="textarea" rows="3" autosize clearable />
        </van-row>
      </van-cell>
      <van-cell class="course-grade">
        <van-tag type="success" size="large" color="#1ab394">年 级</van-tag>
        <span class="course-message">{{course.grade}}年级</span>
      </van-cell>
      <van-cell class="course-name">
        <van-tag type="success" size="large" color="#1ab394">课 程 名</van-tag>
        <span class="course-message">{{course.courseName}}</span>
      </van-cell>
      <van-cell class="course-type">
        <van-tag type="success" size="large" color="#1ab394">课 程 类 型</van-tag>
        <span class="course-message">{{course.courseType}}</span>
      </van-cell>
      <van-cell class="course-number">
        <van-tag type="success" size="large" color="#1ab394">总 课 次</van-tag>
        <span class="course-message">{{course.courseNumber}}节</span>
      </van-cell>
      <van-cell class="course-interest">
        <van-tag type="success" size="large" color="#1ab394">兴 趣 类 型</van-tag>
        <span class="course-message">{{course.interestType}}</span>
      </van-cell>
      <van-cell class="course-plan">
        <van-tag type="success" size="large" color="#1ab394">教 案</van-tag>
        <van-collapse v-model="planNames" accordion>
          <van-collapse-item title="教案列表" name="1">
            <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">点击资源可立刻下载,向左滑动可以删除！</van-notice-bar>
            <van-cell-group>
              <van-swipe-cell v-for="(item, key) of course.teachPlan" :key="key">
                <van-cell :border="false">
                  <span slot="title" @click="downloadFile(item.resourceURL,item.nowFileName)">{{key + 1}}、{{item.nowFileName}}</span>
                </van-cell>
                <template slot="right">
                  <van-button
                    square
                    type="danger"
                    text="删除"
                    @click="deletePlanOrResource(item.planId, 1)"
                  />
                </template>
              </van-swipe-cell>
            </van-cell-group>
          </van-collapse-item>
        </van-collapse>
        <upload-teach-plan :classId="classId" class="mt-1" v-model="changePlan" />
      </van-cell>
      <van-cell class="course-resource">
        <van-tag type="success" size="large" color="#1ab394">教 学 资 源</van-tag>
        <van-collapse v-model="resourceNames" accordion>
          <van-collapse-item title="教案资源列表" name="1">
            <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">点击资源可立刻下载,向左滑动可以删除！</van-notice-bar>
            <van-cell-group>
              <van-swipe-cell v-for="(item, key) of course.teachResource" :key="key">
                <van-cell :border="false">
                  <span slot="title" @click="downloadFile(item.resourceURL,item.nowFileName)">{{key + 1}}、{{item.nowFileName}}</span>
                </van-cell>
                <template slot="right">
                  <van-button
                    square
                    type="danger"
                    text="删除"
                    @click="deletePlanOrResource(item.resourceId, 2)"
                  />
                </template>
              </van-swipe-cell>
            </van-cell-group>
          </van-collapse-item>
        </van-collapse>
        <van-radio-group v-model="isShare" class="mt-1">
          <van-radio name="1" style="position: absolute;" checked-color="#78909c">共享</van-radio>
          <van-radio
            name="0"
            style="position:absolute;margin-left:100px;"
            checked-color="#78909c"
          >不共享</van-radio>
        </van-radio-group>
        <upload-teach-resource
          style="margin-top:50px"
          :classId="classId"
          :isShare="isShare"
          v-model="changeResource"
        />
      </van-cell>
      <van-cell class="course-explanation">
        <van-row>
          <van-tag type="success" size="large" color="#1ab394">课 程 说 明</van-tag>
        </van-row>
        <van-row>
          <van-field v-model="describe" type="textarea" rows="3" autosize clearable />
        </van-row>
      </van-cell>
    </van-cell-group>
    <van-row type="flex" justify="center" class="mt-1 mb-5">
      <van-col span="20">
        <van-button
          type="primary"
          round
          size="large"
          color="#78909c"
          @click="submitSubjectContent"
        >保存</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {
  Row,
  CellGroup,
  Col,
  Field,
  Cell,
  Tag,
  Button,
  Toast,
  Radio,
  RadioGroup,
  Icon,
  SwipeCell,
  Collapse,
  CollapseItem,
  NoticeBar,
} from "vant";
import Vue from "vue";
import axios from 'axios';
import UploadTeachPlan from "./UploadTeachPlan";
import UploadTeachResource from "./UploadTeachResource";
import { isOnWechat } from "@/common/other";
Vue.use(Row)
  .use(Col)
  .use(Field)
  .use(Cell)
  .use(Tag)
  .use(CellGroup)
  .use(Button)
  .use(Toast)
  .use(Radio)
  .use(RadioGroup)
  .use(Icon)
  .use(SwipeCell)
  .use(Collapse)
  .use(CollapseItem)
  .use(NoticeBar);
export default {
  name: "CourseContent",
  components: { UploadTeachResource, UploadTeachPlan },
  data() {
    return {
      task: "",
      target: "",
      prepare: "",
      describe: "",
      list: [],
      course: {},
      showTeachPlan: false,
      showTeachResource: false,
      isShare: 0,
      baseUrl: "https://zhsj.bnuz.edu.cn/ComprehensiveSys/teacher/isDownload/false?",
      planNames: ["1"],
      resourceNames: ["1"],
      changeResource: false,
      changePlan: false
    };
  },
  props: {
    classId: {
      type: String,
      require: true
    }
  },
  watch: {
    classId: {
      handler() {
        if (this.classId !== "") {
          this.getSubjectContent();
        }
      }
    },
    changeResource: function() {
      this.getSubjectContent();
      this.changeResource = false;
    },
    changePlan: function() {
      this.getSubjectContent();
      this.changePlan = false;
    }
  },
  created() {
    if (this.classId !== "") {
      this.getSubjectContent();
    }
  },
  methods: {
    async getSubjectContent() {
      try {
        let res = await this.$api.course.getSubjectContent(this.classId);
        this.list = res.data.map(item => {
          return {
            grade: item.fitGradeId,
            courseName: item.courseName,
            courseType: item.courseTypeName,
            studentNumber: item.studentNumber,
            courseNumber: item.courseNumber,
            interestType: item.interestTypeName,
            coursePrepare: item.coursePrepare,
            courseTarget: item.courseTarget,
            courseMission: item.courseMission,
            courseExplanation: item.courseExplanation,
            teachPlan: item.teachPlan,
            teachResource: item.teachResource
          };
        });
        this.course = {
          grade: this.list[0].grade,
          courseName: this.list[0].courseName,
          courseType: this.list[0].courseType,
          courseNumber: this.list[0].courseNumber,
          interestType: this.list[0].interestType,
          coursePrepare: this.list[0].coursePrepare,
          courseTarget: this.list[0].courseTarget,
          courseMission: this.list[0].courseMission,
          courseExplanation: this.list[0].courseExplanation,
          teachPlan: this.list[0].teachPlan,
          teachResource: this.list[0].teachResource
        };
        this.task = this.course.courseMission;
        this.target = this.course.courseTarget;
        this.prepare = this.course.coursePrepare;
        this.describe = this.course.courseExplanation;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        this.loading = false;
      }
    },
    async submitSubjectContent() {
      try {
        await this.$api.course.submitSubjectContent(
          this.classId,
          this.task,
          this.target,
          this.prepare,
          this.describe
        );
        Toast("修改成功");
        this.prepare = "";
        this.task = "";
        this.target = "";
        this.describe = "";
        this.isShare = 0;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    async deletePlanOrResource(id, type) {
      try {
        await this.$api.course.deletePlanOrResource(id, type);
        Toast("删除成功！");
        this.getSubjectContent();
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    downloadFile(path, fileName) {
      if (isOnWechat()) {
        this.$router.push({
          path: "/s/downloadPopup/",
          query: { path: path, fileName: fileName }
        });
      } else {
        const isSupport = "download" in document.createElement("a");
        if (isSupport) {
          axios({
            url: this.baseUrl+"nowFileName="+fileName+"&resourceURL="+path,
            method: "GET",
          })
            .then(() => {
              let src = this.baseUrl+"nowFileName="+fileName+"&resourceURL="+path;
              let iframe = document.createElement('iframe');
              iframe.style.display = 'none';
              // eslint-disable-next-line
              iframe.src = "javascript: '<script>location.href=\"" + src + "\"<\/script>'";
              document.getElementsByTagName('body')[0].appendChild(iframe);
            })
            .catch(error => {
              if (error.response.status) {
                Toast.fail("该资源链接不存在");
              } else {
                Toast.fail("无法下载该资源");
              }
            });
        }else{
          Toast.fail("当前浏览器不支持该下载")
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.course {
  &-description {
    &-icon {
      display: inline-block;
      vertical-align: middle;
    }
    &-title {
      font-size: 12px;
      color: #777777;
      margin-left: 5px;
    }
  }
  &-message {
    margin-left: 15px;
  }
  &-plan {
    a {
      color: #777777;
    }
  }
  &-resource {
    a {
      color: #777777;
    }
  }
}
.mt-1 {
  margin-top: 10px;
}
.mb-1 {
  margin-bottom: 10px;
}
.mb-5 {
  margin-bottom: 50px;
}
</style>
