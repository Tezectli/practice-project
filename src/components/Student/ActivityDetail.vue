<template>
  <div class="page">
    <div class="head" :style="img"></div>
    <div class="box-out">
      <div class="box">
        <div class="actname">
          <span>{{activityName}}</span>
        </div>
        <ol class="ol-s">
          <li>
            <span class="info">
              <!-- <van-icon name="clock-o" size="15px" class="icon-s" /> -->
              开始时间:{{this.infoEntity.activityStartTime}}
            </span>
          </li>
          <li>
            <span class="info">
              <!-- <van-icon name="clock-o" size="15px" class="icon-s" /> -->
              结束时间:{{this.infoEntity.activityEndTime}}
            </span>
          </li>
          <li>
            <span class="info">
              <!-- <van-icon name="location-o" size="15px" class="icon-s" /> -->
              活动地点:{{this.infoEntity.activityAddress}}
            </span>
          </li>
          <li>
            <span class="info">参赛人数:{{this.infoEntity.contestantCount}}</span>
          </li>
          <li>
            <span class="info">教练数:{{this.infoEntity.coachCount}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="processes">活动简介</div>
    <van-cell :value="this.infoEntity.activityDescription" />
    <div class="processes">相关活动</div>
    <van-card
      class="processeslist van-hairline--bottom"
      v-for="processes of processesList"
      :key="processes.processId"
      :content="processes"
      :desc="processes.processType"
      color
      id="card"
    >
      <div slot="title" class="processes-title">{{processes.processDetail}}</div>
      <div slot="tags">
        <span class="tags-info">
          <van-tag plain type="primary">{{processes.ruleDetail}}</van-tag>
        </span>
      </div>
      <div slot="footer">
        <van-button
          size="small"
          color="rgb(255,255,255,0)"
          class="btnsign"
          :to="`/s/choiceTeam?processid=${processes.processId}`"
        >立即报名</van-button>
      </div>
    </van-card>
    <div class="bottom-text">没有更多了</div>
  </div>
</template>
<script>
import { Button, Swipe, SwipeItem, Divider, Cell } from "vant";
import Vue from "vue";
Vue.use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Divider)
  .use(Cell);
export default {
  name: "ActivityDetail",
  data() {
    return {
      id: this.$route.query.id,
      infoEntity: {},
      processesList: [],
      activityName: ""
    };
  },
  computed: {
    img() {
      return {
        backgroundImage: `url(https://zhsj.bnuz.edu.cn/ComprehensiveSys/${this.infoEntity.imageLong})`,
        backgroundSize: "cover"
      };
    }
  },
  methods: {
    //获取子活动详细信息
    async getActivityDetail() {
      try {
        let res = await this.$api.activity.getActivityDetail(this.id);
        this.infoEntity = res.activityInfoEntity;
        this.processesList = res.processesList;
        this.activityName = res.activityInfoEntity.activityName;
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  },
  created() {
    this.getActivityDetail();
  }
};
</script>
<style lang="scss"  scoped>
@import "@/scss/base.scss";
.page {
  background-color: rgb(245, 245, 245);
}
.head {
  width: 100%;
  height: 200px;
  background-size: cover;
}
.box-out {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.box {
  width: 90%;
  position: relative;
}
.box::before {
  content: attr(title);
  position: absolute;
  left: 20%;
  transform: translateX(-50%);
  -webkit-transform: translate(-50%, -50%);
  padding: 0 10px;
  background-color: #fff;
}
.ol-s {
  margin: 15px;
}
.bottom-text {
  width: 100%;
  height: 25px;
  color: #d4d4d4;
  font-size: 90%;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 50px;
}
.info {
  width: 100%;
  display: inline-flex;
  align-items: center;
  font-size: 10px;
}
.icon-s {
  margin: 0;
  margin-right: 3px;
}
.processes {
  font-size: 16px;
  margin-top: 10px;
  margin-left: 10px;
  color: black;
  font-weight: 600;
}
.processeslist {
  width: 86%;
  min-height: 20px;
  margin-left: 7%;
  background-color: white;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
}
.btn {
  background-color: #1ab385;
  color: white;
}
.processes-title {
  font-size: 16px;
}
.ol-s li {
  float: left;
  overflow: hidden;
  width: 50%;
}
.signbox {
  width: 100%;
  height: 45px;
  background-color: #fff;
}
.signposition {
  margin-left: 30%;
}
.btnsign {
  background-color: rgb(22, 97, 246);
  color: white;
  width: 140px;
  border-radius: 5px;
}
.actname {
  margin-top: 10px;
  font-size: 16px;
  color: black;
  font-weight: 600;
}
.van-cell {
  background-color: rgb(245, 245, 245);
  font-size: 14px;
  color: rgb(112, 112, 112);
}
.van-card__content {
  min-height: 60px;
}
#card {
  background: linear-gradient(to top, rgb(9, 67, 167), rgb(0, 146, 216));
  min-height: 95px;
}
.van-card__footer {
  margin-top: -60px;
}
.processes-title {
  color: #fff;
}
.van-card__desc {
  max-height: 20px;
  color: white;
}
.van-tag--primary.van-tag--plain {
  color: white;
}
.van-tag--plain {
  background-color: rgb(22, 97, 248);
  border: 0px;
}
.van-hairline--surround::after {
  border-width: 0px;
}
</style>